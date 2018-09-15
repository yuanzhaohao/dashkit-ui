import { destroy, getComponent } from './handler';

const create = (type: string) => (content, duration = 3, options = {}) => {
  const { onClose, position = 'top' } = options;
  const messager = getComponent(position);
  console.log(messager)
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
  warn: create('warning'),
  warning: create('warning'),
  error: create('danger'),
}