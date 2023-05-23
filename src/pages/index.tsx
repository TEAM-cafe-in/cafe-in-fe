import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <div>
      <Typography variant="h1">Cafe In</Typography>
      <Button variant="contained">
        <Typography variant="h4">Contained</Typography>
      </Button>
      <Button variant="outlined">
        <Typography variant="body1">Outlined</Typography>
      </Button>
    </div>
  );
}
