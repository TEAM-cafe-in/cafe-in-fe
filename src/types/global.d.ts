/**
 * @createdBy 한수민
 * @description 전역 개체의 프로퍼티 타입 Kakao 정의
 */
export {};

declare global {
  // window 안에 Kakao라는 객체가 있다고 미리 알려주는 것
  interface Window {
    Kakao: any;
  }
}
