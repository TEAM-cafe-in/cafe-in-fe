/**
 * @createdBy 한수민
 * @description 커피콩을 활용해서 카페 혼잡도 확인하는 api 함수
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CoffeeBean {
  token: string;
  cafeId: string;
}

const useCoffeeBean = async (body: CoffeeBean) => {
  const { token, cafeId } = body;
  try {
    const url = `http://52.78.196.20:8080/api/cafe/${cafeId}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
export default useCoffeeBean;

// 인자 only defined => lint error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useAddCoffeeBeanMutation = (body: CoffeeBean) => {
  const queryClient = useQueryClient();
  return useMutation(useCoffeeBean, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cafeList']);
      queryClient.invalidateQueries(['comment']);
    },
  });
};
