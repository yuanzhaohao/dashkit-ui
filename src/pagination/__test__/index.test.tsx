import * as React from 'react';
import * as enzyme from 'enzyme';
import Pagination from '..';
const prefixCls = 'dk-pagination';

describe('Pagination[Basic]', () => {
  test('should call onChange', () => {
    const changeMock = jest.fn();
    const wrapper = enzyme.mount(<Pagination current={10} total={1000} onChange={changeMock} />);
    wrapper
      .find(`.${prefixCls}-item`)
      .first()
      .simulate('click');

    expect(changeMock.mock.calls[0][0]).toBe(1);
  });

  test('should disabled items', () => {
    const wrapper = enzyme.mount(<Pagination current={1} total={2} disabled />);
    wrapper.find(`${prefixCls}-item`).forEach(item => {
      expect(item.prop('disabled')).toBeTruthy();
    });
  });

  test('should minus while prev click', () => {
    const wrapper = enzyme.mount(<Pagination current={10} total={1000} />);
    wrapper
      .find(`.${prefixCls}-prev`)
      .first()
      .simulate('click');

    wrapper.update();

    setTimeout(() => {
      expect(wrapper.state('current')).toBe(9);
    }, 0);
  });

  test('should add while next click', () => {
    const wrapper = enzyme.mount(<Pagination current={10} total={1000} />);
    wrapper
      .find(`.${prefixCls}-next`)
      .first()
      .simulate('click');

    setTimeout(() => {
      expect(wrapper.state('current')).toBe(11);
    }, 0);
  });
});
