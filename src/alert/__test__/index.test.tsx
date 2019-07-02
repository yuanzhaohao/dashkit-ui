import * as React from 'react';
import * as enzyme from 'enzyme';
import Alert from '..';
const prefixCls = 'dk-alert';

describe('Alert[Basic]', () => {
  test(`should render .${prefixCls} in a Alert`, () => {
    const wrapper = enzyme.shallow(<Alert>A simple default alert—check it out!</Alert>);
    wrapper.find(Alert).forEach(child => {
      expect(child.shallow().hasClass(prefixCls)).toBeTruthy();
    });
  });
});

describe('Alert[closable]', () => {
  test(`should have close icon when set closable`, () => {
    const wrapper = enzyme.shallow(
      <Alert type="info" closable>
        A simple info alert with close button!
      </Alert>,
    );
    const eventMock = { preventDefault: jest.fn() };
    wrapper.find(`.${prefixCls}-close`).simulate('click', eventMock);
    expect(wrapper.find(prefixCls).exists()).toBeFalsy();
  });
});
