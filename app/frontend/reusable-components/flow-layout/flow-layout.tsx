import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../button/button';
interface Props {
  children: ReactNode;
}

export function FlowLayout({ children }: Props) {
  function handleLogout() {
    localStorage.removeItem('wealthFrontToken');
    // nav('/create-account');
  }
  return (
    <div className="h-full mt-5 max-w-[1000px] m-4">
      <div className="w-full text-right">
        <Link onClick={handleLogout} to="/create-account" reloadDocument>
          <Button colorText="rgb(72, 64, 187)" colorBG="white" border={true}>
            Logout
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
}
