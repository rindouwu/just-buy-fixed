import http from '@/api/http'

async function getCart() {
  const response = await http.get('/cart')
  return response.data;
}

async function addProductToCart(product_id) {
  const response = await http.post(`/cart/${product_id}`)
  return response.data;
}

async function deleteProductFromCart(id) {
  const response = await http.delete(`/cart/${id}`)
  return response.data;
}

export default { getCart, addProductToCart, deleteProductFromCart }
