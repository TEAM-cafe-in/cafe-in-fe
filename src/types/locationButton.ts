/**
 * @createdBy 한수민
 * @description 홍대 연남 성수 버튼 타입 정의
 */

export enum Location {
  'hongdae' = 0, // 홍대
  'yeonnam' = 1, // 연남
  'seongsu' = 2, // 성수
}

export const locationArray: Location[] = [
  Location.hongdae,
  Location.yeonnam,
  Location.seongsu,
];

export interface Option {
  title: string;
  name: string;
  lat: number;
  lng: number;
}

export type LocationOption = {
  [key in Location]: Option;
};

export const locationOptions: LocationOption = {
  [Location.hongdae]: {
    title: '홍대',
    name: 'hongdae',
    lat: 37.557361,
    lng: 126.924633,
  },
  [Location.seongsu]: {
    title: '성수',
    name: 'seongsu',
    lat: 37.544665,
    lng: 127.057641,
  },
  [Location.yeonnam]: {
    title: '연남',
    name: 'yeonnam',
    lat: 37.560907,
    lng: 126.924619,
  },
};
