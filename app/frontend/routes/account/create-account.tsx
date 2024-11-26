import React from 'react';
import { FlowLayout } from 'app/frontend/reusable-components/flow-layout/flow-layout';
import { Card } from 'app/frontend/reusable-components/card/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { Button } from 'app/frontend/reusable-components/button/button';
import PasswordStrengthBar from './password-strength-bar';
const schema = z.object({
  username: z.string().min(10).max(50),
  password: z
    .string()
    .min(20)
    .max(50)
    .regex(new RegExp('[a-zA-Z]'), 'Must contain a character from a to z')
    .regex(new RegExp('[0-9]'), 'Must contain at least one digit from 0 to 9'),
});

type AccountFields = z.infer<typeof schema>;

export function CreateAccount() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<AccountFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',

      // username: 'ali@gmail.com',
      // password: '12312321312321312kjhkh',
    },
  });

  const onSubmit: SubmitHandler<AccountFields> = async (data) => {
    try {
      const response = await fetch('/api/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const respBody = await response.json();
        console.log(respBody);
        throw Error(respBody.error + '. Status Code: ' + response.status);
      }
      const { token } = await response.json();
      console.log('token');
      console.log(token);
      localStorage.setItem('wealthFrontToken', JSON.stringify(token));
      nav('/signup/account-selection');
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // console.log(data);
      // console.log('getValues: ', getValues());
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError('root', {
          message: `${e.message}`,
        });
      }
    }
  };

  return (
    <FlowLayout>
      <Card title="Create New Account" useLogo={true}>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          {/* Username */}
          <div className="min-h-[64px]">
            <input
              {...register('username')}
              type="text"
              placeholder="Username"
              className="outline-none w-full border-b-2 border-zinc-300 focus:border-[#6d66d4] text-sm"
            />
            {errors.username && <div className="text-[#ED4337]">{errors.username.message}</div>}
          </div>

          {/* Password */}
          <div className="min-h-[96px]">
            <input
              {...register('password')}
              type="text"
              placeholder="Password"
              className=" outline-none w-full border-b-2 border-zinc-300 focus:border-[#6d66d4]  text-sm"
            />
            {errors.password && <div className="text-[#ED4337]">{errors.password.message}</div>}
            {/* Password Strength Bar */}
            <PasswordStrengthBar className="mt-2" pw={watch('password')}></PasswordStrengthBar>
          </div>
          <div className="flex justify-center items-center">
            <Button
              customClassNames={twMerge(
                'w-full text-center flex items-center justify-center',
                isSubmitting ? 'disabled:opacity-20 bg-gray-600 cursor-not-allowed' : ''
              )}
              isDisabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Loading...' : 'Submit'}
            </Button>
          </div>

          {/* Error Messages to user */}
          {errors.root && <div className="text-[#ED4337] mt-4">{errors.root.message}</div>}
        </form>
      </Card>
    </FlowLayout>
  );
}
