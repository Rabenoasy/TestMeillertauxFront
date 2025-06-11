import axios from 'axios';
import { baseURL } from '../constants/constants';

export const httpClient = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' },
});
