// @deno-types="npm:@types/node@20.11.0"

const POWER_API_BASE = 'https://www.power.dk/api/v2'
const TIMEOUT_MS = 5000

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

interface CategoryRequest {
  endpoint: 'category'
  url: string
}

type RequestBody = SearchRequest | ProductRequest | CategoryRequest

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
      
      return new Response(
        JSON.stringify({
          products: data.products || []
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

      return new Response(
        JSON.stringify({
          products: data
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      )
    }

    if (input.endpoint === 'category') {
      const urlMatch = input.url.match(/\/c\/(\d+)\//)      
      if (!urlMatch) {
        throw new Error('Invalid Power.dk category URL format')
      }

      const categoryId = urlMatch[1]
      const allProducts = []
      let from = 0
      const pageSize = 50
      let hasMore = true

      while (hasMore && from < 500) {
        const params = new URLSearchParams({
          categoryId: categoryId,
          size: pageSize.toString(),
          from: from.toString()
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
        const products = data.products || []

        if (products.length === 0) {
          hasMore = false
        } else {
          allProducts.push(...products)
          from += pageSize

          if (products.length < pageSize) {
            hasMore = false
          }
        }
      }

      return new Response(
        JSON.stringify({
          products: allProducts,
          total: allProducts.length
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
