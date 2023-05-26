import { Grid } from '@mui/material';
import { useCallback } from 'react';

import { BoxButton, CapsuleButton } from '~/components/atom/buttons';

const Home = () => {
  const handleClick = useCallback(() => {}, []);

  return (
    <div>
      <h1>cafe in</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BoxButton
            title="버튼"
            color="primary"
            padding="xl"
            onClick={handleClick}
          />
          <BoxButton
            title="버튼"
            color="primary"
            padding="lg"
            onClick={handleClick}
          />
          <BoxButton
            title="버튼"
            color="primary"
            padding="md"
            onClick={handleClick}
          />
          <BoxButton
            title="버튼"
            color="primary"
            padding="sm"
            onClick={handleClick}
          />
        </Grid>
        <Grid item xs={12}>
          <BoxButton
            title="버튼"
            color="secondary"
            padding="xl"
            onClick={handleClick}
          />
          <BoxButton
            title="버튼"
            color="secondary"
            padding="lg"
            onClick={handleClick}
          />
          <BoxButton
            title="버튼"
            color="secondary"
            padding="md"
            onClick={handleClick}
          />
          <BoxButton
            title="버튼"
            color="secondary"
            padding="sm"
            disabled
            onClick={handleClick}
          />
        </Grid>
        <Grid item xs={12}>
          <BoxButton
            title="버튼"
            variant="outlined"
            padding="xl"
            disabled
            onClick={handleClick}
          />
          <BoxButton
            title="버튼"
            variant="outlined"
            padding="lg"
            onClick={handleClick}
          />
          <BoxButton
            title="버튼"
            variant="outlined"
            padding="md"
            onClick={handleClick}
          />
          <BoxButton
            title="버튼"
            variant="outlined"
            padding="sm"
            onClick={handleClick}
          />
        </Grid>
        <Grid item xs={12}>
          <CapsuleButton title="버튼" padding="xl" onClick={handleClick} />
          <CapsuleButton title="버튼" padding="lg" onClick={handleClick} />
          <CapsuleButton title="버튼" padding="md" onClick={handleClick} />
          <CapsuleButton title="버튼" padding="sm" onClick={handleClick} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
