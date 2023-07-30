/**
 * @createdBy 한수민
 * @description 카페 상세 댓글 컴포넌트
 */

import Image from 'next/image';

import { Typography, useTheme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Comment } from '~/types/cafeInfo';
import Profile from '~/components/atom/profile';
import chat from '../../../static/images/chat.png';
import heart from '../../../static/images/heart.png';
import {
  CommentContainer,
  CommentReactIcon,
  SingleCommentContent,
} from './cafeDetailComment.styled';

interface CommentProp {
  comment: Comment;
}

const CafeSingleComment = ({ comment }: CommentProp) => {
  const theme = useTheme();
  const nameColor = theme.palette.grey[500];
  const timeColor = theme.palette.grey[300];
  const iconColor = theme.palette.grey[400];
  const borderColor = theme.palette.grey[100];

  return (
    <CommentContainer color1={iconColor} color2={borderColor}>
      <Profile size="md" />
      <SingleCommentContent>
        <Typography color={nameColor} variant="body1">
          {comment.memberName}
        </Typography>
        <Typography color={timeColor} variant="body2">
          {comment.createdTime}
        </Typography>
        <Typography mb="5px" mt="5px">
          {comment.content}
        </Typography>
        <CommentReactIcon>
          <Image src={heart} height={15} style={{ cursor: 'pointer' }} alt="" />
          <Typography ml="5px" mr="15px">
            9
          </Typography>
          <Image src={chat} width={20} height={20} alt="" />
          <Typography ml="5px">2</Typography>
        </CommentReactIcon>
      </SingleCommentContent>
      <MoreVertIcon className="menu-icon" />
    </CommentContainer>
  );
};
export default CafeSingleComment;
