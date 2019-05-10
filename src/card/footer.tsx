import * as classNames from 'classnames';
import * as React from 'react';
import { BasicProps } from './types';

const Footer = (props: BasicProps) => {
  const { className, prefixCls = 'dk-card', ...attributes } = props;
  const basicClassName = classNames(`${prefixCls}-footer`, className);
  return <div {...attributes} className={basicClassName} />;
};

export default Footer;
