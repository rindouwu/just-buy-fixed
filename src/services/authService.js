import http from '@/api/http'

async function signup (data) {
  const response = await http.post('/signup', data);
  return response.data;
}
async function login (data) {
  const response = await http.post('/login', data);
  return response.data;
}
async function logout () {
  const response = await http.get('/logout');
  return response.data
}
export default { login, signup, logout }
