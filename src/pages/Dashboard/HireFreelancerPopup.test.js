import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HireFreelancerPopup from './HireFreelancerPopup';
import users from '../../../tests/__fixtures__/users.json';
import test from '@playwright/test';

const freelancer = users[0];

describe('HireFreelancerPopup Component', () => {
  test('submits form successfully when all fields are filled', () => {
    const onSubmit = jest.fn();

    render(<HireFreelancerPopup onSubmit={onSubmit} freelancer={freelancer} />);

    userEvent.type(screen.getByLabelText(/name/i), 'Test User');
    userEvent.type(screen.getByLabelText(/message subject/i), 'Project Inquiry');
    userEvent.type(
      screen.getByLabelText(/message body/i),
      'I would like to discuss a potential project collaboration.'
    );

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Test User',
      subject: 'Project Inquiry',
      message: 'I would like to discuss a potential project collaboration.',
      to: freelancer.email,
    });
  });

  test('validates form fields', () => {
    render(<HireFreelancerPopup onSubmit={jest.fn()} freelancer={freelancer} />);

    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/name is required/i)).toBeVisible();
    expect(screen.getByText(/subject is required/i)).toBeVisible();
    expect(screen.getByText(/message is required/i)).toBeVisible();
  });
});
