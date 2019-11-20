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
      .prop('onClick')(0);

    expect(changeMock.mock.calls[0][0]).toBe(1);
  });
});
