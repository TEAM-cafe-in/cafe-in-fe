import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

const Post = () => {
  const handleClick = () => {};

  return (
    <List sx={{ pt: 0 }}>
      <ListItem sx={{ p: 0 }}>
        <ListItemButton sx={{ p: 2 }} onClick={handleClick}>
          <ListItemText>
            <Typography variant="h5">카페레이어드</Typography>
            <Typography variant="subtitle2">
              서울 마포구 성미산로 161-4
            </Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
    </List>
  );
};

export default Post;
