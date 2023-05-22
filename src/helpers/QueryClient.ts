import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    // onError : handleError => 공통 에러 처러 hook 만들기
    queries: {
      // staleTime을 변경하여 리엑트 쿼리에개 캐시된 데이터를 얼마나 자주 최신화 시켜줘야 하는지 알려줄 수 있다.(중복 호출 방지)
      // 쿼리 마다 다르게 시간을 지정 가능
      staleTime: 1000 * 20,
      retry: 0,
      // API가 실패하면 설정한 값만큼 재시도 하는 옵션
      suspense: true,
      useErrorBoundary: true,
    },
    // 예기치 못한 에러 케이스가 생길 수 있기에 queries와 mutations에 true 값으로 설정
    mutations: {
      useErrorBoundary: true,
    },
  },
});
export default queryClient;
