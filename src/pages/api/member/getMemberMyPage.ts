/**
 * @createdBy 김해지
 * @description 회원 마이페이지 조회 API
 */

import { MyPageResponse } from '~/types/mypage';
import { customAxios } from '~/utils/customAxios';

const getMemberMyPage = async () => {
  const response = await customAxios.get('/api/member/mypage');
  return response.data as MyPageResponse;
};

export default getMemberMyPage;
