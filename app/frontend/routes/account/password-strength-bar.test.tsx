import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides custom matchers like .toBeInTheDocument()
// import { MemoryRouter } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import { CreateAccount } from './create-account';

describe('CreateAccount subcomponent: password-strength-bar', () => {
  test('1) Type "1" into the password field 2) confirm we see the "too short" message', async () => {
    // https://stackoverflow.com/questions/70029935/react-router-v6-usenavigate-may-be-used-only-in-the-context-of-a-router-co
    render(
      <Router>
        <CreateAccount />
      </Router>
    );

    const passwordText = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordText, { target: { value: '1' } });
    await waitFor(() => {
      expect(screen.getByText('too short')).toBeInTheDocument();
    });
  });

  test('1) Type "11111111111111111111" into the password field 2) confirm we see the "weak" message', async () => {
    render(
      <Router>
        <CreateAccount />
      </Router>
    );

    const passwordText = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordText, { target: { value: '11111111111111111111' } });
    await waitFor(() => {
      expect(screen.getByText('weak')).toBeInTheDocument();
    });
  });

  test('1) Type "111111111111111112345" into the password field 2) confirm we see the "okay" message', async () => {
    render(
      <Router>
        <CreateAccount />
      </Router>
    );

    const passwordText = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordText, { target: { value: '111111111111111112345' } });
    await waitFor(() => {
      expect(screen.getByText('okay')).toBeInTheDocument();
    });
  });

  test('1) Type "11111111111111111234567" into the password field 2) confirm we see the "good" message', async () => {
    render(
      <Router>
        <CreateAccount />
      </Router>
    );

    const passwordText = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordText, { target: { value: '11111111111111111234567' } });
    await waitFor(() => {
      expect(screen.getByText('good')).toBeInTheDocument();
    });
  });

  test('1) Type "11111111111111111234567abc" into the password field 2) confirm we see the "strong" message', async () => {
    render(
      <Router>
        <CreateAccount />
      </Router>
    );

    const passwordText = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordText, { target: { value: '11111111111111111234567abc' } });
    await waitFor(() => {
      expect(screen.getByText('strong')).toBeInTheDocument();
    });
  });
});
