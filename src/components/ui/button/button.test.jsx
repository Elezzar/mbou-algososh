import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

import {Button} from './button';

describe('Button', () => {
  it('Кнопка с текстом отрисовывается корректно', () => {
    const tree = renderer.create(<Button text='test' />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Кнопка без текста отрисовывается корректно', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Заблокированная кнопка отрисовывается корректно', () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Кнопка с индикатором загрузки отрисовывается корректно', () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Колбэк при клике на кнопку вызывается корректно', () => {
    const mockFn = jest.fn();
    render(<Button onClick={mockFn} />)
    fireEvent.click(screen.getByRole('button'));
    expect(mockFn).toHaveBeenCalled();
  })
})