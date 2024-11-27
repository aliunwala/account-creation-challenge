import { describe, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CreateUser } from './create-user';

describe('CreateUser', () => {
  test('render', () => {});
  render(<CreateUser />, { wrapper: BrowserRouter });
  screen.getByText('First name');
  screen.getByText('Last name');
});
