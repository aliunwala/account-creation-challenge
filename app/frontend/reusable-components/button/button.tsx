import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface Props {
  type?: 'button' | 'submit';
  href?: string;
  children: ReactNode;
  customClassNames?: string;
  colorText?: string;
  colorBG?: string;
  border?: boolean;
  isDisabled?: boolean;
}

const classes = 'inline-block py-3 px-6 rounded-lg';

export function Button({ href, children, type, customClassNames, colorText, colorBG, border, isDisabled }: Props) {
  const myClassNames = twMerge(classes, customClassNames);
  const myColor = colorText ? colorText : 'white';
  const myBgColor = colorBG ? colorBG : '#4840ba';
  const myBorder = border ? `1px solid ${myColor}` : '';

  if (href) {
    return (
      <Link
        to={href}
        type={type}
        className={myClassNames}
        style={{ color: myColor, backgroundColor: myBgColor, border: myBorder }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={myClassNames}
      style={{ color: myColor, backgroundColor: myBgColor, border: myBorder }}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
