import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PatentSubmissionForm from '../components/PatentSubmissionForm';
import axios from 'axios';

jest.mock('axios');

describe('PatentSubmissionForm', () => {
  beforeEach(() => {
    render(<PatentSubmissionForm />);
  });

  it('renders the form with all fields', () => {
    expect(screen.getByLabelText(/Invention Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Inventor Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Invention:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit Patent/i })).toBeInTheDocument();
  });

  it('allows entering text in the form fields', () => {
    fireEvent.change(screen.getByLabelText(/Invention Name:/i), { target: { value: 'My Invention' } });
    fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'An amazing invention that...' } });
    fireEvent.change(screen.getByLabelText(/Inventor Name:/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Date of Invention:/i), { target: { value: '2023-01-01' } });

    expect(screen.getByLabelText(/Invention Name:/i).value).toBe('My Invention');
    expect(screen.getByLabelText(/Description:/i).value).toBe('An amazing invention that...');
    expect(screen.getByLabelText(/Inventor Name:/i).value).toBe('John Doe');
    expect(screen.getByLabelText(/Date of Invention:/i).value).toBe('2023-01-01');
  });

  it('submits the form successfully', async () => {
    const mockResponse = { status: 200 };
    axios.post.mockResolvedValueOnce(mockResponse);

    fireEvent.change(screen.getByLabelText(/Invention Name:/i), { target: { value: 'My Invention' } });
    fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'An amazing invention that...' } });
    fireEvent.change(screen.getByLabelText(/Inventor Name:/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Date of Invention:/i), { target: { value: '2023-01-01' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit Patent/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/patent-submissions', {
        inventionName: 'My Invention',
        description: 'An amazing invention that...',
        inventorName: 'John Doe',
        dateOfInvention: '2023-01-01',
      });
    });
  });

  it('shows an error message if the submission fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Submission failed'));

    fireEvent.change(screen.getByLabelText(/Invention Name:/i), { target: { value: 'My Invention' } });
    fireEvent.change(screen.getByLabelText(/Description:/i), { target: { value: 'An amazing invention that...' } });
    fireEvent.change(screen.getByLabelText(/Inventor Name:/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Date of Invention:/i), { target: { value: '2023-01-01' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit Patent/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
