import * as React from 'react';
import * as classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { ModalProps, ModalState } from './types';
import Icon from '../icon';
import Button from '../button';

const ESC_KEY = 27;

class ModalPanel extends React.Component<ModalProps, ModalState> {
  static defaultProps = {
    prefixCls: 'dk-modal',
    closeByEsc: true,
    showFooter: true,
  };
  static success: any;
  readonly bodyRef: React.RefObject<HTMLDivElement>;

  constructor(props: ModalProps) {
    super(props);
    this.state = {
      visible: false,
      bodyVisible: false,
    };
    this.bodyRef = React.createRef();
  }

  componentDidUpdate(prevProps: ModalProps, prevState: ModalState) {
    if (this.props.visible && !prevProps.visible) {
      this.openModal();
    } else if (!this.props.visible && prevProps.visible) {
      this.closeModal();
    }

    if (this.state.visible && !prevState.visible) {
      setTimeout(() => {
        this.focusBody();
      }, 0);
    }
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    const { prefixCls, showFooter, footer, closeByEsc, title, className, width, children } = this.props;
    const footerNode = <>
      <Button type="default" onClick={this.props.onCancel}>Cancel</Button>
      <Button type="primary" className={`${prefixCls}-footer-confirm`} onClick={this.props.onConfirm}>OK</Button>
    </>;

    const bodyNode = (
      <CSSTransition
        in={this.state.bodyVisible}
        unmountOnExit
        timeout={300}
        classNames={`${prefixCls}-panel`}
        onExited={this.handleExited}
      >
        <div
          className={classNames(`${prefixCls}-panel`, className)}
          onKeyDown={closeByEsc ? this.handleKeydown : undefined}
          tabIndex={-1}
          ref={this.bodyRef}
          style={width !== undefined ? { width } : null}
        >
          {!!title && (
            <>
              <div className={`${prefixCls}-header`}>{title}</div>
              <div className={`${prefixCls}-close`} onClick={this.handleClose}>
                <Icon className={`${prefixCls}-close-icon`} type="x" />
              </div>
            </>
          )}
          <div className={`${prefixCls}-body`}>
            {children}
          </div>
          {!!showFooter && (
            <div className={`${prefixCls}-footer`}>
              {footer === undefined ? footerNode : footer}
            </div>
          )}
        </div>
      </CSSTransition>
    );

    return (
      <div className={`${prefixCls}`}>
        <CSSTransition
          timeout={300}
          in={this.state.bodyVisible}
          classNames={`${prefixCls}-mask`}
        >
          <div className={`${prefixCls}-mask`} onClick={this.handleClose} />
        </CSSTransition>
        {bodyNode}
      </div>
    );
  }

  openModal = () => {
    this.setState({
      visible: true,
    }, () => {
      this.setState({
        bodyVisible: true,
      });
    })
  }

  closeModal = () => {
    this.setState({
      bodyVisible: false,
    });
  }

  handleClose = () => {
    this.closeModal();
  }

  handleExited = () => {
    const { onClose } = this.props;
    this.setState({
      visible: false,
    });
    if (typeof onClose === 'function') {
      onClose();
    }
  }

  focusBody = () => {
    const bodyElement = this.bodyRef.current;
    if (bodyElement) {
      bodyElement.focus();
    }
  }

  handleKeydown = event => {
    if (event.keyCode === ESC_KEY) {
      event.stopPropagation();
      this.closeModal();
    }
  }
}

export default ModalPanel;