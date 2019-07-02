import * as React from 'react';
import * as enzyme from 'enzyme';
import Button from '..';
const prefixCls = 'dk-button';

describe('Button[Basic]', () => {
  test(`should render .${prefixCls} in a Button`, () => {
    const wrapper = enzyme.shallow(<Button>Default</Button>);
    wrapper.find(Button).forEach(button => {
      expect(button.shallow().hasClass(prefixCls)).toBeTruthy();
    });
  });
});

describe('Button[Type]', () => {
  test('should make contact on prop and className', () => {
    const wrapper = enzyme.mount(
      <>
        <Button>Default</Button>
        <Button type="primary">Primary</Button>
        <Button outline>Outline</Button>
        <Button type="primary" outline>
          Primary
        </Button>
        <Button round>Round</Button>
        <Button type="primary" round>
          Primary
        </Button>
      </>,
    );
    wrapper.find(`.${prefixCls}`).forEach(button => {
      const type = button.prop('type');
      const outline = button.prop('outline');
      const round = button.prop('round');
      expect(button.hasClass(`${prefixCls}-${type}`)).toBeTruthy();
      if (outline) {
        expect(button.hasClass(`${prefixCls}-outline-${type}`)).toBeTruthy();
      }
      if (round) {
        expect(button.hasClass(`${prefixCls}-rounded`)).toBeTruthy();
      }
    });
  });
});

describe('Button[Size]', () => {
  test('should set size class while has size prop', () => {
    const wrapper = enzyme.mount(
      <>
        <Button size="large">Large</Button>
        <Button size="default">Default</Button>
        <Button size="small">Small</Button>
      </>,
    );
    wrapper.find(`.${prefixCls}`).forEach(button => {
      const size = button.prop('size');
      expect(button.hasClass(`${prefixCls}-${size}`)).toBeTruthy();
    });
  });
});

describe('Button[Click]', () => {
  test('should has click wave effect', () => {
    const mockCallBack = jest.fn();

    const button = enzyme.shallow(<Button onClick={mockCallBack}>Ok!</Button>);
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
