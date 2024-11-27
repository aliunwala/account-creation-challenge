import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom'; // Provides custom matchers like .toBeInTheDocument()
// import { MemoryRouter } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import { CreateAccount } from './create-account';

describe('CreateAccount', () => {
  test('1) Render page, 2) inputs should have correct placeholder values 2) Submit button should have correct text', () => {
    // https://stackoverflow.com/questions/70029935/react-router-v6-usenavigate-may-be-used-only-in-the-context-of-a-router-co
    render(
      <Router>
        <CreateAccount />
      </Router>
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    const formSubmitBtn = screen.getByRole('button', { name: /Create Account/ });
    expect(formSubmitBtn).toBeInTheDocument();
  });

  test('1) Render page 2) Add "bad" to user/pass fields + submit 3) Confirm we see error messages', async () => {
    const user = userEvent.setup();
    render(
      <Router>
        <CreateAccount />
      </Router>
    );

    const usernameText = screen.getByPlaceholderText('Username');
    const passwordText = screen.getByPlaceholderText('Password');
    const formSubmitBtn = screen.getByRole('button', { name: /Create Account/ });

    user.type(usernameText, 'bad');
    user.type(passwordText, 'bad');
    user.click(formSubmitBtn);

    await waitFor(() => {
      expect(screen.getByText(/String must contain at least 10 character\(s\)/)).toBeInTheDocument();
      expect(screen.getByText(/String must contain at least 20 character\(s\)/)).toBeInTheDocument();
    });
  });

  test('1) Render page 2) Add "good" to user/pass fields + submit 3) Confirm the test token from the mock api is added to localstorage ', async () => {
    // const user = userEvent.setup();
    render(
      <Router>
        <CreateAccount />
      </Router>
    );

    const usernameText = screen.getByPlaceholderText('Username');
    const passwordText = screen.getByPlaceholderText('Password');
    const formSubmitBtn = screen.getByRole('button', { name: /Create Account/ });

    fireEvent.change(usernameText, { target: { value: 'testuser@randomwebsite.com' } });
    fireEvent.change(passwordText, { target: { value: 'testuserRandomPass1234' } });
    fireEvent.click(formSubmitBtn);
    // user.type(usernameText, 'testuser@randomwebsite.com');
    // user.type(passwordText, 'testuserRandomPass1234');
    // user.click(formSubmitBtn);

    // https://stackoverflow.com/questions/64818305/simple-fetch-mock-using-typescript-and-jest
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ token: 'jest-test-token' }),
      })
    ) as jest.Mock;

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/create-account', {
        method: 'POST',
        body: JSON.stringify({
          username: 'testuser@randomwebsite.com',
          password: 'testuserRandomPass1234',
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    });

    await waitFor(() => {
      expect(localStorage.getItem('wealthFrontToken')).toBe('"jest-test-token"');
    });
  });
});
