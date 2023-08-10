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
  // 모달 높이
  height?: string;
  // 모달 가로
  width?: string;
}

const Modal = ({ open, children, onClose, height, width }: ModalProps) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <ModalContainer style={{ height, width }}>{children}</ModalContainer>
    </MuiModal>
  );
};

export default Modal;
Modal.defaultProps = {
  height: 'auto', // 기본 높이 값 설정
  width: 'auto',
};
