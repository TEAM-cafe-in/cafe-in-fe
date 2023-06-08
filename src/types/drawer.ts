/**
 * @createdBy 김해지
 * @description Drawer 관련 타입 정의 모음
 */
import { ReactNode } from 'react';

export interface DrawerItem {
  name: string;
  text: string;
  children: ReactNode;
}
