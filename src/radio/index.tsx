import * as React from 'react';
import Item, { InputProps } from '../checkbox/item';
import Group from './group';

const Radio = ({ prefixCls = 'dk-radio', ...attributes }: InputProps) => (
  <Item prefixCls={prefixCls} type="radio" {...attributes} />
);

Radio.componentType = 'Radio';

Radio.Group = Group;

export default Radio;
