/**
 * @createBy 김해지
 * @description Modal 기본 틀
 */
import { ReactNode } from 'react';

import { Modal as MuiModal } from '@mui/material';

import { ModalContainer } from './modal.styled';

interface ModalProps {
  // open 여부
  open: boolean;
  // content 영역
  children: ReactNode;
  // 모달 닫기 함수
  onClose: () => void;
}

const Modal = ({ open, children, onClose }: ModalProps) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <ModalContainer>{children}</ModalContainer>
    </MuiModal>
  );
};

export default Modal;
