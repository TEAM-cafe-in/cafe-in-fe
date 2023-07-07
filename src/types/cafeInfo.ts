export interface CafesInfo {
  cafeId: string;
  commentReviewCount: string;
  latitude: string;
  local: string;
  longitude: string;
  averageCongestion: '1' | '2' | '3' | '0';
  name: string;
  status: string;
  address: string;
  phoneNumber: string;
}
export interface CafeInfo {
  cafeCount: number;
  cafes: CafesInfo[];
}
