import { act, render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ClientForm from '../index';

describe('ClientForm Component', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/createClient']}>
          <Routes>
            <Route path="/createClient" element={<ClientForm title="Add Client" textButton="Save" onAction={jest.fn()} />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  it('submits form data correctly', async () => {
    const name = 'John Doe';
    const email = 'john.doe@example.com';
    const about = 'Lorem ipsum';

    const nameInput = await screen.findByPlaceholderText('Name');
    const emailInput = await screen.findByPlaceholderText('E-mail');
    const aboutInput = await screen.findByPlaceholderText('About');

    act(() => {
      fireEvent.change(nameInput, { target: { value: name } });
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(aboutInput, { target: { value: about } });
      fireEvent.click(screen.getByText('Save'));
    });

    await screen.findByText('See All Clients');


  });
});