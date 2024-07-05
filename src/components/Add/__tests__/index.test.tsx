import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom'; 
import Add from '../index';
import CreateClient from '../../../pages/CreateClient';

describe('Add Component', () => {
  it('renders correctly', () => {
    render(
      <RouterProvider router={createMemoryRouter([{ path: '/', element: <Add /> }])} />
    );

    expect(screen.getByText('All Clients')).toBeInTheDocument();

    expect(screen.getByText('Create client')).toBeInTheDocument();
  });

  it('navigates to /createClient when "Create client" button is clicked', () => {
    
    const routes = [
      {
        path: "/",
        element: <Add />,
      },
      {
        path: "/createClient",
        element: <CreateClient />,
      }
    ];

    const router = createMemoryRouter(routes);

    render(
      <RouterProvider router={router} />
    );

    expect(router.state.location.pathname).toBe('/');

    const createClientButton = screen.getByText('Create client');

    userEvent.click(createClientButton);

    setTimeout(() => {
      expect(router.state.location.pathname).toBe('/createClient');

      expect(screen.getByText('Create Client Page')).toBeInTheDocument();
    }, 0);
  });
});
