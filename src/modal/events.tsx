
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import { ModalProps, ModalType } from './types';
import Panel from './panel';
import Button from '../button';
import Icon from '../icon';

type Props = ModalProps & {
  id?: string;
  content?: React.ReactNode;
};

export function create(type: ModalType) {
  return (options: ModalProps = {}) => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    let props = {
      prefixCls: 'dk-modal',
      width: 420,
      ...options,
    };

    ReactDOM.render(getPanel(props), div);

    setTimeout(() => {
      props.visible = true;
      ReactDOM.render(getPanel(props), div);
    }, 10);

    function destroy() {
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
    }

    function update(newProps: Props) {
      props = {
        ...props,
        ...newProps,
      };
      ReactDOM.render(getPanel(props), div);
    }

    function getPanel(props: Props) {
      const { title, content, prefixCls, onConfirm, ...attributes } = props;
      const handleConfirmClick = () => {
        update({
          visible: false,
        });
        if (typeof props.onConfirm === 'function') {
          props.onConfirm();
        }
      };
      const handleCancelClick = () => {
        update({
          visible: false,
        });
        if (typeof props.onCancel === 'function') {
          props.onCancel();
        }
      }
      const iconType: { [key: string]: string } = {
        success: 'check-circle',
        error: 'x-circle',
        warning: 'alert-circle',
        info: 'info',
        confirm: 'help-circle',
      };
      const contentNode = (
        <div className={`${prefixCls}-body-container`}>
          <span className={`${prefixCls}-body-title`}>{title}</span>
          <div className={`${prefixCls}-body-content`}>{content}</div>
          <Icon className={classNames(`${prefixCls}-body-icon`, {
            [`${prefixCls}-body-icon-${type}`]: true,
          })} type={iconType[type]} />
        </div>
      );
      return (
        <Panel {...attributes} showFooter={false} onClose={destroy}>
          {contentNode}
          <div className={`${prefixCls}-body-btn`}>
            {type === 'confirm' && (
              <Button onClick={handleCancelClick} className={`${prefixCls}-body-btn-cancel`}>Cancel</Button>
            )}
            <Button type="primary" onClick={handleConfirmClick}>OK</Button>
          </div>
        </Panel>
      );
    }

    return {
      destroy,
    };
  }
}