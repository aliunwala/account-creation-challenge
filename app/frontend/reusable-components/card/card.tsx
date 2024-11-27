import React, { ReactNode } from 'react';
import { Logo } from 'app/frontend/icons/logo';
interface Props {
  children: ReactNode;
  title: string;
  description?: string;
  useLogo?: boolean;
}

export function Card({ children, title, description, useLogo }: Props) {
  return (
    <section className="mt-6 min-w-[370px] max-w-[450px] p-10 shadow-card min-h-[400px] w-full rounded-2xl border border-solid border-slate-200">
      {useLogo && (
        <div className="flex w-full justify-center mb-4">
          <Logo width={50} height={50} fill="#4840ba"></Logo>
        </div>
      )}
      <div className="flex justify-center items-center ">
        <h1 className="text-2xl m-0 mb-1 font-black">{title}</h1>
      </div>
      <p className="text-[hsla(243,30%,13%,.63)] text-base m-0 mb-1">{description}</p>
      {children}
    </section>
  );
}

{
  /* <Logo width={50} height={50} fill="#4840ba" /> */
}
{
  /* <Logo></Logo> */
}
