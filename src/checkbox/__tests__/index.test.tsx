import * as React from 'react';
import { mount } from 'enzyme';
import Checkbox from '..';
const prefixCls = 'dk-checkbox';

describe('Checkbox', () => {
  test('should react while click', () => {
    const checkbox = mount(<Checkbox defaultChecked>Option</Checkbox>);
    expect(checkbox.find(`.${prefixCls}`).hasClass(`${prefixCls}-checked`)).toBeTruthy();
    checkbox.find(`.${prefixCls}-input`).simulate('change', {
      target: {
        checked: false,
      },
    });
    checkbox.update();
    expect(checkbox.find(`.${prefixCls}`).hasClass(`${prefixCls}-checked`)).toBeFalsy();
  });
});
