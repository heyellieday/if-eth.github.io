import axios from 'axios';
import { auth } from './auth';

const makeBaseRequest = () => {
  return axios.create({
    baseURL: 'https://api.if-eth.com/',
    headers: {'Authorization': `Bearer ${auth.getAccessToken()}`}
  });
};

export const makeAuthenticatedRequest = (path) => {
  const baseRequest = makeBaseRequest();
  return baseRequest.get(path).then(response => (response.data));
};
