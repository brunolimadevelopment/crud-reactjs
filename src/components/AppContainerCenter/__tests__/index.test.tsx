import { render } from '@testing-library/react';
import AppContainerCenter from '../index';

describe('AppContainerCenter Component', () => {
  it('renders correctly', () => {
    const { container } = render(<AppContainerCenter>Hello World</AppContainerCenter>);
    
    expect(container.firstChild).toBeInTheDocument();

    expect(container.firstChild).toHaveStyle(`
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    `);
  });
});
