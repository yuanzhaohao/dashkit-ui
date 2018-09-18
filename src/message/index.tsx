import './style.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MessageType } from './types';
import Message from './message';

const prefixCls = 'dk-msg';
const defaultDuration = 2.5;
const defaultTransitionDuration = 0.216;

const defaultMax = 100;

let element: HTMLDivElement | null = null;
let component: any = null;

const now = Date.now();
let seed = 0;

function getUid() {
  return `dashkit-message-${now}-${seed++}`;
}

function destroy() {
  if (component) {
    component = null;
  }
  if (element) {
    document.body.removeChild(element);
    element = null;
  }
}

function getComponent() {
  if (!component) {
    const div = document.createElement('div');

    element = div;
    document.body.appendChild(div);
    component = ReactDOM.render(
      <Message 
        prefixCls={prefixCls} 
        max={defaultMax} 
        transitionDuration={defaultTransitionDuration}
        onDestory={destroy} 
      />,
      div,
    )
  }
  return component;
}

function create(type: MessageType) {
  return async (content: React.ReactNode, duration: number = defaultDuration, onClose: VoidFunction) => {
    const messager = getComponent();
    messager.addMessage({
      id: getUid(),
      content,
      duration,
      type,
      onClose,
    })
  }
}

export default {
  show: create('default'),
  success: create('success'),
  info: create('info'),
  warning: create('warning'),
  error: create('error'),
}