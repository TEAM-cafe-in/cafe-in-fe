import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';

const Recently = () => {
  const theme = useTheme();

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
            <Typography variant="subtitle2" color={theme.palette.grey[500]}>
              후기 999+
            </Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider />
    </List>
  );
};

export default Recently;
