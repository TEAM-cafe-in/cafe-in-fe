/**
 * @createdBy 한수민
 * @description 카페 상세 댓글 컴포넌트
 */
import { useDispatch } from 'react-redux';
import Image from 'next/image';

import { Typography, useTheme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Comment } from '~/types/cafeInfo';
import Profile from '~/components/atom/profile';
import { setDepth2Content } from '~/store/reducers/depth2ContentSlice';
import chat from '../../../static/images/chat.png';
import heart from '../../../static/images/heart.png';
import {
  CommentContainer,
  CommentReactIcon,
  SingleCommentContent,
  SingleCommentTitle,
} from './cafeCommentLayout.styled';

interface CommentProps {
  comment: Comment;
  type: 'comment' | 're-comment' | 'top-comment';
}

const CafeSingleComment = ({ comment, type }: CommentProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const nameColor = theme.palette.grey[500];
  const timeColor = theme.palette.grey[300];
  const iconColor = theme.palette.grey[400];
  const borderColor = theme.palette.grey[100];
  const backgroundColor = theme.palette.grey[50];

  // 댓글 클릭했을 때 대댓글로 이동
  const handleCommentClick = () => {
    dispatch(setDepth2Content('re-comment'));
  };

  return (
    <CommentContainer
      color1={iconColor}
      color2={borderColor}
      color3={backgroundColor}
      type={type}
    >
      <Profile size="md" />
      <SingleCommentContent>
        <SingleCommentTitle type={type}>
          <Typography color={nameColor} variant="body1" mr="5px">
            {comment.memberName}
          </Typography>
          <Typography color={timeColor} variant="body2">
            {comment.createdTime}
          </Typography>
        </SingleCommentTitle>
        <Typography mb="5px" mt="5px">
          {comment.content}
        </Typography>
        <CommentReactIcon>
          {type !== 're-comment' && (
            <>
              <Image
                src={heart}
                height={15}
                style={{ cursor: 'pointer' }}
                alt=""
              />
              <Typography ml="5px" mr="15px">
                9
              </Typography>
            </>
          )}

          {type === 'comment' && (
            <>
              <Image
                src={chat}
                width={20}
                height={20}
                style={{ cursor: 'pointer' }}
                onClick={handleCommentClick}
                alt=""
              />
              <Typography ml="5px">2</Typography>
            </>
          )}
        </CommentReactIcon>
      </SingleCommentContent>
      <MoreVertIcon className="menu-icon" />
    </CommentContainer>
  );
};
export default CafeSingleComment;
