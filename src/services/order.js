import http from "@/api/http.js"

const getOrder = async () => {
  const response = await http.get('/order')
  return response.data
}
const postOrder = async () => {
  const response = await http.post('/order')
  return response.data
}

export default {
  getOrder,
  postOrder,
}
