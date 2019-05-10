import './style.scss';

import Modal from './modal';
import { create } from './events';

Modal.success = create('success');
Modal.info = create('info');
Modal.warning = create('warning');
Modal.warn = create('warning');
Modal.error = create('error');
Modal.confirm = create('confirm');

export default Modal;
