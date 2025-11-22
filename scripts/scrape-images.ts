import * as fs from 'fs';
import * as path from 'path';

interface Product {
  id: string;
  name: string;
  link: string;
  image?: string;
  [key: string]: any;
}

async function scrapeProductImage(productUrl: string): Promise<string | null> {
  try {
    console.log(`🔍 Fetching: ${productUrl}`);

    // Extract product ID from URL
    const productIdMatch = productUrl.match(/\/p-(\d+)\//);
    if (!productIdMatch) {
      console.log('❌ Could not extract product ID from URL');
      return null;
    }

    const productId = productIdMatch[1];
    console.log(`📦 Product ID: ${productId}`);

    // Try to fetch from Power API directly
    const apiUrl = `https://www.power.dk/api/v2/products/${productId}`;
    console.log(`🔍 Trying API: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      console.log(`❌ API request failed: ${response.status}`);
      return null;
    }

    const data = await response.json();

    // Look for image in the API response
    if (data.images && Array.isArray(data.images) && data.images.length > 0) {
      const imageUrl = data.images[0].url || data.images[0];
      console.log(`✅ Found image from API: ${imageUrl}`);
      return imageUrl;
    }

    if (data.image) {
      console.log(`✅ Found image from API: ${data.image}`);
      return data.image;
    }

    console.log('⚠️ No image found in API response');
    console.log('📄 API response keys:', Object.keys(data));
    return null;

  } catch (error) {
    console.error(`❌ Error scraping ${productUrl}:`, error);
    return null;
  }
}

async function updateProductImages(jsonFile: string) {
  console.log(`\n📦 Loading products from ${jsonFile}...\n`);

  const filePath = path.join(process.cwd(), jsonFile);
  const products: Product[] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  console.log(`Found ${products.length} products\n`);

  let updated = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`\n[${i + 1}/${products.length}] Processing: ${product.name}`);

    if (!product.link) {
      console.log('⚠️ No link found, skipping...');
      continue;
    }

    const imageUrl = await scrapeProductImage(product.link);

    if (imageUrl) {
      product.image = imageUrl;
      updated++;
      console.log(`✅ Updated image for: ${product.name}`);
    } else {
      console.log(`⚠️ Could not get image for: ${product.name}`);
    }

    // Add a small delay to be respectful
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Save updated JSON
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  console.log(`\n\n✨ Done! Updated ${updated}/${products.length} product images`);
  console.log(`💾 Saved to ${jsonFile}`);
}

// Run the script
const jsonFile = process.argv[2] || 'washing_machines.json';
updateProductImages(jsonFile).catch(console.error);
