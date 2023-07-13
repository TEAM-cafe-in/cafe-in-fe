/**
 * @createdBy 김해지
 * @description 회원 마이페이지 조회 API
 */

import { MyPageResponse } from '~/types/mypage';

const getMemberMyPage = async (token: string) => {
  try {
    const url = `http://52.78.196.20:8080/api/member/mypage`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    const data: MyPageResponse = await response.json();
    return data;
  } catch (error) {
    return new Error('예상치 못한 오류가 발생했습니다. 다시 시도해주세요.');
  }
};

export default getMemberMyPage;
