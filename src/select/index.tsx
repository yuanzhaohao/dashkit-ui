import './style.scss';

import Select from './select';
import Option from './option';
import OptionGroup from './option-group';
Select.Option = Option;
Select.OptionGroup = OptionGroup;

export { Option, OptionGroup };
export default Select;
