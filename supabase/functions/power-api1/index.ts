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
  id: string;
  title?: string;
  name: string;
  price: number;
  productImage?: {
    hash: string;
    url: string;
    width: number;
    height: number;
    format: string;
    basePath: string;
    variants: string[];
  };
  images?: Array<{ url: string }>;
  specifications?: Array<{ name: string; value: string }>;
  shortDescription?: string;
  description?: string;
  url?: string;
  link?: string;
  brand?: { name: string };
  categoryPath?: string[];
  type?: string;
  bulletPoints?: string[];
  productId?: string;
}

function determineProductType(product: any): string {
  // First check the category path if available
  if (product.categoryPath?.length > 0) {
    const categories = product.categoryPath.map((c: string) => c.toLowerCase());
    
    // Check for dishwasher first since it's more specific
    if (categories.some(c => c.includes('opvaskemaskine') || c.includes('opvask'))) {
      return 'dishwasher';
    }
    if (categories.some(c => c.includes('vaskemaskine'))) {
      return 'washing_machine';
    }
    if (categories.some(c => c.includes('ovn'))) {
      return 'oven';
    }
    if (categories.some(c => c.includes('køleskab'))) {
      return 'refrigerator';
    }
  }

  // Then check the product name and description
  const searchText = [
    product.title || product.name || '',
    product.shortDescription || product.description || '',
    product.specifications?.map((s: any) => `${s.name} ${s.value}`).join(' ') || ''
  ].join(' ').toLowerCase();

  // Check for dishwasher first
  if (searchText.includes('opvaskemaskine') || searchText.includes('opvask')) {
    return 'dishwasher';
  }
  if (searchText.includes('vaskemaskine')) {
    return 'washing_machine';
  }
  if (searchText.includes('ovn')) {
    return 'oven';
  }
  if (searchText.includes('koeleskab') || searchText.includes('køleskab')) {
    return 'refrigerator';
  }

  // URL-based fallback checks
  const url = (product.url || '').toLowerCase();
  if (url.includes('opvaskemaskine') || url.includes('opvask')) {
    return 'dishwasher';
  }
  if (url.includes('vaskemaskine')) {
    return 'washing_machine';
  }
  if (url.includes('ovn')) {
    return 'oven';
  }
  if (url.includes('koeleskab') || url.includes('køleskab')) {
    return 'refrigerator';
  }

  return 'unknown';
}

function extractBulletPoints(product: any): string[] {
  // First try to get bullet points directly
  if (product.bulletPoints?.length > 0) {
    return product.bulletPoints;
  }
  
  // Try to extract from sales arguments text
  if (product.salesArguments && typeof product.salesArguments === 'string') {
    const lines = product.salesArguments.split('\n').filter(Boolean);
    if (lines.length > 0) {
      return lines;
    }
  }
  
  return [];
}

function transformProduct(product: any): PowerProduct {
  // Extract the numeric product ID from the URL if available
  let productId = product.id;
  if (!productId && product.url) {
    const match = product.url.match(/\/p-(\d+)\/?/);
    if (match) {
      productId = match[1];
    }
  }

  // Extract bullet points
  const bulletPoints = extractBulletPoints(product);

  // Construct image URL using the specified format
let imageUrl = '';

if (
  product.productImage?.basePath &&
  product.productImage?.variants?.length > 0
) {
  const variant = product.productImage.variants.find(v =>
    typeof v.filename === 'string' &&
    v.filename.includes('1200x1200_w_g.jpg')
  );

  const filename = variant?.filename || product.productImage.variants[0]?.filename;
  const basePath = product.productImage.basePath;

  // DO NOT add "images/" or "products/" manually
  imageUrl = `https://media.power-cdn.net/${basePath}/${filename}`;
} else if (product.images?.[0]?.url) {
  imageUrl = product.images[0].url;
}
  
  return {
    id: productId || '',
    name: product.title || product.name,
    price: product.price,
    productImage: product.productImage,
    images: [{ url: imageUrl }],
    specifications: product.specifications || [],
    shortDescription: product.shortDescription || product.description || '',
    url: product.url || product.link || '',
    brand: product.brand || { name: '' },
    categoryPath: product.categoryPath || [],
    type: determineProductType(product),
    bulletPoints,
    productId: product.productId
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

Deno.serve(async (req: Request) => {
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