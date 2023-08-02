/**
 * @createdBy 한수민
 * @description 카페 정보 관련 타입 정의 모음
 */

import { TCafeCongestion } from './radio';

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

export interface CafeDetailInfo {
  address: string;
  averageCongestion: TCafeCongestion;
  cafeId: string;
  hasPlugCount: string;
  isCleanCount: string;
  latitude: string;
  local: 'SEONGSU' | 'HONGDAE' | 'YEONNAM';
  longitude: string;
  name: string;
  phoneNumber: string;
  status: string;
}
export interface Comment {
  commentId: string;
  memberName: string;
  createdTime: string;
  content: string;
  keywords: string[] | [];
}
export interface CafeComment {
  cafeInfoProjection: CafeDetailInfo;
  comments: Comment[] | [];
}
