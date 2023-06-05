/**
 * @createdBy 김해지
 * @description Drawer 관련 타입 정의 모음
 */

import { StaticImageData } from 'next/image';

export interface DrawerItem {
  name: string;
  src: StaticImageData;
  text: string;
}
