import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export {checkPrice};

function checkPrice() {
  const url = `${BASE_URL}/api/test`;
  return axios.get(url).then(response => response.data);
}