import { useEffect } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';

export default function Logout() {
  const router = useRouter();

  useEffect(function() {
    nookies.set(null, 'USER_TOKEN', null, {
      path: '/'
    });
  
    router.push('/login');
  });

  return '';
}