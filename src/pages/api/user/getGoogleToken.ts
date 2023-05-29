// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
import axios from 'axios';

const getGoogleToken = async (code: string) => {
  const body = {
    code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_KEY,
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY,
    redirect_uri: 'http://localhost:3000/google',
    grant_type: 'authorization_code',
  };
  try {
    const res = await axios.post('https://oauth2.googleapis.com/token', body);
    return res;
  } catch (e) {
    return e;
  }
};
export default getGoogleToken;
