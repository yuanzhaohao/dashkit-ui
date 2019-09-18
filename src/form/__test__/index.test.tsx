import * as React from 'react';
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

it('reads and sets input value', () => {
  const onSubmit = (event, values, errors) => {
    expect(values.name).toEqual('Yuan Zhaohao');
    const isError = errors && errors.length;
    expect(isError).toBeTruthy();
  };
  const wrapper = enzyme.mount(
    <Form onSubmit={onSubmit}>
      <Form.Item label="First Name" name="name">
        <Input name="name" />
      </Form.Item>
      <Form.Item label="Email" name="email" required>
        <Input />
      </Form.Item>
    </Form>,
  );
  wrapper.find('input[name="name"]').simulate('change', { target: { value: 'Yuan Zhaohao' } });
  wrapper.find('form').simulate('submit');
});
