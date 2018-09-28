import * as React from 'react';

import SvgInfo from './svgs/alert-info.svg';
import SvgSuccess from './svgs/alert-success.svg';
import SvgWarning from './svgs/alert-warning.svg';
import SvgError from './svgs/alert-error.svg';

const svgIcon: { [index: string]: JSX.Element } = {
  info: <SvgInfo />,
  success: <SvgSuccess />,
  warning: <SvgWarning />,
  error: <SvgError />,
};

export default svgIcon;