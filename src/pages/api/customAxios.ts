/**
 * @createdBy 한수민
 * @description url 지정과 헤더에 access token을 넣어 customAxios 생성
 */

import axios from 'axios';
// import { useAccessTokenSelector } from '~/store/reducers/authSlice';

// const accessToken = useAccessTokenSelector();

export const customAxios = axios.create({
  baseURL: 'http://52.78.196.20:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// customAxios.defaults.headers.common.Authorization = accessToken
//  ? `Bearer ${accessToken}`
//  : null;
