/**
 * @createBy 김해지
 * @description 토스트 메시지
 */
import { Alert, AlertColor, Snackbar } from '@mui/material';

interface ToastProps {
  // open 여부
  open: boolean;
  // toast message
  message: string;
  // toast message 색상
  color: AlertColor;
  // 팝업 닫기 함수
  onClose: () => void;
}

const Toast = ({ open, message, color, onClose }: ToastProps) => {
  return (
    <Snackbar
      open={open}
      // 표시되는 시간
      autoHideDuration={4000}
      // 표시되는 위치
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      message={message}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={color} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
