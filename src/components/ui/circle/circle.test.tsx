import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe('Circle', () => {
  it('Circle без символов отрисовывается корректно', () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Circle с символом отрисовывается корректно', () => {
    const tree = renderer.create(<Circle letter="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Circle тегом head отрисовывается корректно', () => {
    const tree = renderer.create(<Circle head="1" />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Circle c react-элементом в head отрисовывается корректно', () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Circle тегом tail отрисовывается корректно', () => {
    const tree = renderer.create(<Circle tail="1" />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Circle c react-элементом в tail отрисовывается корректно', () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Circle с index отрисовывается корректно', () => {
    const tree = renderer.create(<Circle index={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Circle с prop isSmall отрисовывается корректно', () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Circle в состоянии deafult отрисовывается корректно', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Circle в состоянии changing отрисовывается корректно', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('Circle в состоянии modified отрисовывается корректно', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  })
})