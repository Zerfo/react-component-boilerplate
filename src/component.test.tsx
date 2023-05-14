import { render, screen } from '@testing-library/react';

import Button from '.';

describe('button', () => {
  it('render component', () => {
    render(<Button text="тест кнопки" />);

    expect(screen.getByText('тест кнопки')).toBeInTheDocument();
  });

  it('render component with warning prop', () => {
    render(<Button text="тест кнопки" warning />);

    expect(screen.getByText('тест кнопки')).toHaveClass('warning');
  });
});
