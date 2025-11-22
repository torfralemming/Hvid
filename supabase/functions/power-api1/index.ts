// @deno-types="npm:@types/node@20.11.0"

const POWER_API_BASE = 'https://www.power.dk/api/v2'
const TIMEOUT_MS = 5000 // 5 second timeout

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SearchRequest {
  endpoint: 'search'
  query: string
  pageSize?: number
}

interface ProductRequest {
  endpoint: 'products'
  ids: string[]
}

type RequestBody = SearchRequest | ProductRequest

interface PowerProduct {
  id: string
  name: string
  price: number
  images: Array<{ url: string }>
  specifications: Array<{ name: string; value: string }>
  shortDescription: string
  url: string
  brand?: { name: string }
}

function transformProduct(product: any): PowerProduct {
  return {
    id: product.id,
    name: product.title || product.name,
    price: product.price,
    images: product.images?.map((img: string | { url: string }) => 
      typeof img === 'string' ? { url: img } : img
    ) || [],
    specifications: product.specifications || [],
    shortDescription: product.shortDescription || product.description || '',
    url: product.url || product.link || '',
    brand: product.brand || { name: product.manufacturer || '' }
  }
}

async function fetchWithTimeout(url: string, options: RequestInit = {}) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error.name === 'AbortError') {
      throw new Error(`Request timed out after ${TIMEOUT_MS}ms`)
    }
    throw error
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204,
      headers: corsHeaders 
    })
  }

  try {
    const input: RequestBody = await req.json()

    if (input.endpoint === 'search') {
      const params = new URLSearchParams({
        q: input.query,
        size: (input.pageSize || 10).toString(),
        from: '0'
      })

      const response = await fetchWithTimeout(`${POWER_API_BASE}/productlists?${params}`, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      })
      
      if (!response.ok) {
        throw new Error(`Power API returned status ${response.status}`)
      }

      const data = await response.json()
      console.log('Search API Response:', data)
      
      const products = data.items || data.products || []
      return new Response(
        JSON.stringify({
          products: products.map(transformProduct)
        }),
        { 
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    if (input.endpoint === 'products') {
      const params = new URLSearchParams({
        ids: input.ids.join(',')
      })

      const response = await fetchWithTimeout(`${POWER_API_BASE}/products?${params}`, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      })
      
      if (!response.ok) {
        throw new Error(`Power API returned status ${response.status}`)
      }

      const data = await response.json()
      console.log('Products API Response:', data)
      
      return new Response(
        JSON.stringify({
          products: Array.isArray(data) ? data.map(transformProduct) : [transformProduct(data)]
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      )
    }

    throw new Error('Invalid endpoint specified')

  } catch (error) {
    console.error('Edge function error:', error)
    
    return new Response(
      JSON.stringify({
        error: error.message || 'An unexpected error occurred'
      }),
      {
        status: error.message?.includes('timed out') ? 504 : 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})