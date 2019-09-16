import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import * as enzyme from 'enzyme';
import Form from '..';
import Input from '../../input';
const prefixCls = 'dk-form';

it('calls onSubmit prop function when form is submitted', () => {
  const onSubmitFn = jest.fn();
  const wrapper = enzyme.mount(<Form onSubmit={onSubmitFn} />);
  const form = wrapper.find('form');
  form.simulate('submit');
  expect(onSubmitFn).toHaveBeenCalledTimes(1);
});

test('should make contact on prop and className', () => {
  const wrapper = enzyme.mount(
    <Form labelAlign="left">
      <Form.Item label="Name" name="name" required>
        <Input placeholder="Please input your name" />
      </Form.Item>
    </Form>,
  );
  wrapper.find(`.${prefixCls}-item-label`).forEach(label => {
    const align = label.prop('labelAlign');
    console.log(align);
    expect(label.hasClass(`${prefixCls}-item-label-${align}`)).toBeTruthy();
  });
});

it('reads and sets input value', () => {
  const wrapper = enzyme.mount(
    <Form>
      <Form.Item label="First Name" name="name">
        <Input />
      </Form.Item>
    </Form>,
  );
  wrapper.find('input').simulate('change', { target: { value: 'Yuan Zhaohao' } });
  console.log(wrapper);
  expect(wrapper.fields.name.value).toEqual('Yuan Zhaohao');
});
