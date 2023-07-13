export type TCafeCongestion = '1' | '2' | '3' | '0';

export interface CafesInfo {
  cafeId: string;
  commentReviewCount: string;
  latitude: string;
  local: string;
  longitude: string;
  averageCongestion: TCafeCongestion;
  name: string;
  status: string;
  address: string;
  phoneNumber: string;
}
export interface CafeInfo {
  cafeCount: number;
  cafes: CafesInfo[];
}
