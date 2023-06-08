/* eslint-disable react/button-has-type */
import { useCookies } from 'react-cookie';
import { store } from '~/store';

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);

  // const loginClickHandler = (): void => {
  //  router.push('/login');
  // };
  // const logoutClickHandler = (): void => {
  //  removeCookie('refreshToken');
  // };
  console.log(store.getState().user);
  console.log(store.getState().auth);
  return (
    <div>
      <h1>cafe in</h1>
    </div>
  );
}
