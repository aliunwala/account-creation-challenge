import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/root/root.tsx';
import { AccountSelection } from './routes/signup/account-selection/account-selection.tsx';
import { CreateUser } from './routes/signup/create-user/create-user.tsx';
import { Deposit } from './routes/signup/deposit/deposit.tsx';
import { JointAccess } from './routes/signup/joint-access/joint-access.tsx';
import { StockRestrictions } from './routes/signup/stock-restrictions/stock-restrictions.tsx';
import { CreateAccount } from './routes/account/create-account.tsx';
import { PrivateRouter } from './reusable-components/privateRouter/privateRouter.tsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRouter>
        <Root />
      </PrivateRouter>
    ),
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
  },
  {
    path: '/signup/account-selection',
    element: (
      <PrivateRouter>
        <AccountSelection />
      </PrivateRouter>
    ),
  },
  {
    path: '/signup/create-user',
    element: (
      <PrivateRouter>
        <CreateUser />
      </PrivateRouter>
    ),
  },
  {
    path: '/signup/joint-access',
    element: (
      <PrivateRouter>
        <JointAccess />
      </PrivateRouter>
    ),
  },
  {
    path: '/signup/stock-restrictions',
    element: (
      <PrivateRouter>
        <StockRestrictions />
      </PrivateRouter>
    ),
  },
  {
    path: '/signup/deposit',
    element: (
      <PrivateRouter>
        <Deposit />
      </PrivateRouter>
    ),
  },
]);

export function Router() {
  return (
    <main className="h-screen w-screen">
      <div className="h-full w-full max-w-[1200px] my-0 mx-auto">
        <RouterProvider router={router} />
      </div>
    </main>
  );
}
