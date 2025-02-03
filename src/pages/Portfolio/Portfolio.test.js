import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Portfolio from './Portfolio';
import users from '../../../tests/__fixtures__/users.json';
import posts from '../../../tests/__fixtures__/posts.json';
import comments from '../../../tests/__fixtures__/comments.json';

const mockFreelancer = users[0];
const mockJobs = posts.filter((post) => post.userId === mockFreelancer.id);
const mockComments = comments.filter((comment) =>
  mockJobs.some((job) => job.id === comment.postId)
);

describe('Portfolio Component', () => {
  test('displays details of the freelancer', () => {
    render(<Portfolio freelancer={mockFreelancer} jobs={mockJobs} />);

    expect(screen.getByText(mockFreelancer.name)).toBeVisible();
    expect(screen.getByText(mockFreelancer.email)).toBeVisible();
    expect(screen.getByText(mockFreelancer.phone)).toBeVisible();
    expect(screen.getByText(mockFreelancer.address.city)).toBeVisible();
    expect(screen.getByText(mockFreelancer.address.street)).toBeVisible();
    expect(screen.getByText(mockFreelancer.address.suite)).toBeVisible();
    expect(screen.getByText(mockFreelancer.address.zipcode)).toBeVisible();
  });

  test('displays past jobs when the freelancer has jobs', () => {
    render(<Portfolio freelancer={mockFreelancer} jobs={mockJobs} />);

    expect(screen.getByText('Past Jobs')).toBeVisible();

    mockJobs.forEach((job) => {
      expect(screen.getByText(job.title)).toBeVisible();
    });
  });

  test('displays a message when the freelancer has no past jobs', () => {
    render(<Portfolio freelancer={mockFreelancer} jobs={[]} />);

    expect(screen.getByText('Past Jobs')).toBeVisible();

    expect(screen.getByText('No past jobs found.')).toBeVisible();
  });

  test('displays comments when "Show Comments" is clicked', () => {
    render(<Portfolio freelancer={mockFreelancer} jobs={mockJobs} />);

    mockJobs.forEach((job) => {
      expect(screen.getByText(job.title)).toBeVisible();
    });

    mockComments.forEach((comment) => {
      expect(screen.queryByText(comment.body)).not.toBeInTheDocument();
    });

    mockJobs.forEach((job) => {
      userEvent.click(screen.getByRole('button', { name: `Show Comments for "${job.title}"` }));
    });

    mockComments.forEach((comment) => {
      expect(screen.getByText(comment.body)).toBeVisible();
    });

    mockJobs.forEach((job) => {
      expect(
        screen.getByRole('button', { name: `Hide Comments for "${job.title}"` })
      ).toBeVisible();
    });
  });
});
