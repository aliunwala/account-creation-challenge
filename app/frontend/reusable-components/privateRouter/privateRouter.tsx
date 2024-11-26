import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTokenManager } from '../customHooks/useTokenManager';

type PrivateRouterProps = {
  children: JSX.Element;
};

export function PrivateRouter({ children }: PrivateRouterProps) {
  const location = useLocation();
  const { isLoading, isAuthorized } = useTokenManager();
  if (isLoading) {
    //Waiting on sever to Auth JWT token
    return <div>Please wait page is loading...</div>;
  } else if (!isAuthorized) {
    //Failed auth send user back to login/create account
    return <Navigate to="/create-account" state={{ from: location }} replace />;
  } else if (isAuthorized) {
    //Auth succeded
    return children;
  } else {
    // Should never reach here, send to create user flow.
    return <Navigate to="/create-account" state={{ from: location }} replace />;
  }
}
