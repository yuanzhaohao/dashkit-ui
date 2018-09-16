import { destroy, getComponent } from './handler';

const create = (type: string) => (content, duration = 3, options = {}) => {
  const { onClose, position = 'top' } = options;
  const messager = getComponent(position);
  messager.addMessage({
    content,
    duration,
    type,
    onClose,
  })
}

export default {
  show: create('default'),
  success: create('success'),
  info: create('info'),
  warning: create('warning'),
  error: create('error'),
}