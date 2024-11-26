import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export function useTokenManager() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  //Run once, every time on rerender
  useEffect(() => {
    async function checkToken() {
      setIsLoading(true);
      const wealthFrontToken = localStorage.getItem('wealthFrontToken');
      if (!wealthFrontToken) {
        setIsLoading(false);
        setIsAuthorized(false);
        return;
      }

      // get token expiry
      const expiry = jwtDecode(wealthFrontToken)['exp'];
      const epochMiliSec = Date.now();
      const epochSec = epochMiliSec / 1000;

      if (!expiry) {
        console.error('Token was not able to be decoded');
        setIsLoading(false);
        setIsAuthorized(false);
        return;
      } else if (epochSec > expiry) {
        // Token is expired
        console.error('Token is expired, try logging out and in again');
        setIsLoading(false);
        setIsAuthorized(false);
        return;
      }

      //   Token seems to be valid. lets check the sever to see if all is well.
      try {
        const resp = await fetch('/api/verify-token', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${wealthFrontToken}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await resp.json();

        if (resp.ok) {
          // Got a good reponse from the server
          if (data['allowed'] === true || data['allowed'] === 'true') {
            setIsAuthorized(true);
            setIsLoading(false);
            return;
          } else {
            setIsAuthorized(false);
            setIsLoading(false);
            return;
          }
        } else {
          console.error('Token Server Error: ' + data.error);
          setIsAuthorized(false);
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.error('Unknown token error: ' + e);
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    }
    checkToken();
  }, []);
  return { isLoading, isAuthorized };
}
