import { mount } from 'enzyme';
import * as React from 'react';
import Checkbox from '..';

describe('Checkbox', () => {
  test('should react while click', () => {
    const wrapper = mount(<Checkbox defaultChecked>Option</Checkbox>);
    expect(wrapper.find(`.dk-checkbox`).hasClass(`dk-checkbox-checked`)).toBeTruthy();
    console.log(wrapper.find(`.dk-checkbox`));
    // click label
    wrapper.find(`.dk-checkbox-input`).simulate('change', {
      target: {
        checked: false,
      },
    });
    wrapper.update();
    expect(wrapper.find(`.dk-checkbox`).hasClass(`dk-checkbox-checked`)).toBeFalsy();
  });
});
