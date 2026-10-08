import http from '@/api/http'

async function getProducts() {
  const response = await http.get('/products');
  const products = response.data;
  return products.data;
}

export default getProducts
