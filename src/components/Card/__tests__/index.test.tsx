import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from '../index';
import { Client } from 'types/client';

const mockClient: Client = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    about: 'Lorem ipsum dolor sit amet', 
};

describe('Card Component', () => {
    const actions = [
        { iconTestId: 'action-icon-eye', expectedPath: '/client/1' },
        { iconTestId: 'action-icon-update', expectedPath: '/updateClient/1' },
        { iconTestId: 'action-icon-trash', expectedDeleteId: '1' },
    ];

    beforeEach(() => {
        render(
            <MemoryRouter>
                <Card client={mockClient} onDeleteClient={jest.fn()} />
            </MemoryRouter>
        );
    });

    it('renders correctly', () => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();

        actions.forEach(({ iconTestId }) => {
            expect(screen.getByTestId(iconTestId)).toBeInTheDocument();
        });
    });

    it('calls onDeleteClient when delete icon is clicked', () => {
        fireEvent.click(screen.getByTestId('action-icon-trash'));

        expect(actions[2].expectedDeleteId).toEqual('1');
    });

    it('navigates to correct route when icons are clicked', () => {
        actions.forEach(({ iconTestId, expectedPath }) => {
            fireEvent.click(screen.getByTestId(iconTestId));

            setTimeout(() => {
                expect(window.location.pathname).toBe(expectedPath);
            }, 100);
        });
    });
});