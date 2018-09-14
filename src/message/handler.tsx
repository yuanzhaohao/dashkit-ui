import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AlertType } from '../alert';
import Message from './message';

const elements: any = {};
const components: any = {};

function getElement(type: AlertType) {
  const div = document.createElement('div');

  div.className = 'dk-msg';
  document.body.appendChild(div);
  elements[type] = div;
  return div
}

export function destroy(type: AlertType) {
  if (components[type]) {
    delete components[type]
  }
  if (elements[type]) {
    document.body.removeChild(elements[type])
    delete elements[type]
  }
}

export function getComponent(type: AlertType) {
  let component = components[type]
  if (!component) {
    component = ReactDOM.render(
      <Message onDestory={() => destroy(type)} />,
      getElement(type),
    )
    components[type] = component;
  }

  return component;
}
