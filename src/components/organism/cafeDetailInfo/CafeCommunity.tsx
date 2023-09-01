/**
 * @createBy 한수민
 * @description 카페 커뮤니티 컴포넌트
 */

import { useDispatch } from 'react-redux';

import { Typography, useTheme } from '@mui/material';

import { UnderlineButton } from '~/components/atom/buttons';
import { Comment } from '~/types/cafeInfo';
import { setNavigationContent } from '~/store/reducers/navigate';
import CafeCommunityComment from './CafeCommunityComment';
import { CafeCommunityContainer } from './cafeDetailInfo.styled';

interface CommunityProp {
  comment: Comment[] | [];
}
const CafeCommunity = ({ comment }: CommunityProp) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const grayColor = theme.palette.grey[100];

  const content = `${comment.length}개 댓글보기`;

  return (
    <>
      <CafeCommunityContainer color={grayColor}>
        <Typography variant="h4" mt="20px" mb="15px">
          커뮤니티
        </Typography>
        {comment.length === 0 ? (
          <Typography variant="body2" mb="10px">
            아직 댓글이 없습니다
          </Typography>
        ) : (
          <>
            <CafeCommunityComment content={comment[0].content} />
            {comment[1].content && (
              <CafeCommunityComment content={comment[1].content} />
            )}
            {comment[2].content && (
              <CafeCommunityComment content={comment[2].content} />
            )}
          </>
        )}
      </CafeCommunityContainer>
      {comment.length !== 0 ? (
        <UnderlineButton
          text={content}
          onClick={() => {
            dispatch(setNavigationContent('comment'));
          }}
        />
      ) : (
        <UnderlineButton
          text="댓글을 입력하세요"
          onClick={() => {
            dispatch(setNavigationContent('comment'));
          }}
        />
      )}
    </>
  );
};
export default CafeCommunity;
