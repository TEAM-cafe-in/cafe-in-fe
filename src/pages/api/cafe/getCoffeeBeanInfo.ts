/**
 * @createdBy 한수민
 * @description 카페 혼잡도 확인한 카페 정보 받아오는 api 함수
 */

import { CafeComment } from '~/types/cafeInfo';
import { customAxios } from '~/utils/customAxios';

const getCoffeeBeanInfo = async (cafeId: string) => {
  const response = await customAxios.get(`/api/cafe/${cafeId}`);
  return response.data as CafeComment;
};
export default getCoffeeBeanInfo;
