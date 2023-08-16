/**
 * @createdBy 한수민
 * @description 카페 상세 댓글 삭제 모달
 */
import { Typography, useMediaQuery } from '@mui/material';

import { useAccessTokenSelector } from '~/store/reducers/authSlice';
import Modal from '~/components/atom/modal';
import { query } from '~/helpers/mobileQuery';
import { useDeleteCafeCommentMutation } from '~/pages/api/cafe/deleteCafeComment';
import { DeleteContainer, StyledBoxButton } from './cafeCommentLayout.styled';

interface DeleteModalProps {
  commentId: string;
  cafeId: string;
  deleteModal: boolean;
  closeDeleteModal: () => void;
}

const CommentDeleteModal = ({
  commentId,
  cafeId,
  deleteModal,
  closeDeleteModal,
}: DeleteModalProps) => {
  const token = useAccessTokenSelector();
  const isMobile = useMediaQuery(query, { noSsr: false });

  // 댓글 삭제하는 react query 문
  const { mutate: deleteMutate } = useDeleteCafeCommentMutation();

  const deleteCommentHandler = () => {
    deleteMutate({
      token,
      commentId,
      cafeId,
    });
  };

  return (
    <Modal
      open={deleteModal}
      onClose={closeDeleteModal}
      isBorder="8px"
      width={isMobile ? '260px' : '300px'}
    >
      <DeleteContainer>
        <Typography variant="h4" mt="80x" mb="10px">
          댓글을 삭제하시겠습니까?
        </Typography>
        <StyledBoxButton
          title="네"
          color="warning"
          padding="sm"
          onClick={() => deleteCommentHandler()}
        />
        <StyledBoxButton
          title="아니오"
          color="secondary"
          padding="sm"
          onClick={closeDeleteModal}
        />
      </DeleteContainer>
    </Modal>
  );
};
export default CommentDeleteModal;
