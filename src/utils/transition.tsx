import * as React from 'react';
import * as ReactDOM from 'react-dom';

export type TransitionProps = {
  name?: string;
  onEnter: VoidFunction;
  onAfterEnter: VoidFunction;
  onLeave: VoidFunction;
  onAfterLeave: VoidFunction;
};

class Transition extends React.PureComponent<TransitionProps> {
  constructor(props: TransitionProps) {
    super(props);

    const { children } = props;

    this.state = {
      children: children && this.enhanceChildren(children)
    }

    this.didEnter = this.didEnter.bind(this);
    this.didLeave = this.didLeave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const children = React.isValidElement(this.props.children) && React.Children.only(this.props.children);
    const nextChildren = React.isValidElement(nextProps.children) && React.Children.only(nextProps.children);

    if (!nextProps.name) {
      this.setState({
        children: nextChildren
      });
      return;
    }

    if (this.isViewComponent(nextChildren)) {
      this.setState({
        children: this.enhanceChildren(nextChildren, { show: children ? children.props.show : true })
      })
    } else {
      if (nextChildren) {
        this.setState({
          children: this.enhanceChildren(nextChildren)
        })
      }
    }
  }

  componentDidUpdate(preProps: TransitionProps) {
    if (!this.props.name) return;

    const children = React.isValidElement(this.props.children) && React.Children.only(this.props.children);
    const preChildren = React.isValidElement(preProps.children) && React.Children.only(preProps.children);

    if (this.isViewComponent(children)) {
      if ((!preChildren || !preChildren.props.show) && children.props.show) {
        this.toggleVisible();
      } else if (preChildren && preChildren.props.show && !children.props.show) {
        this.toggleHidden();
      }
    } else {
      if (!preChildren && children) {
        this.toggleVisible();
      } else if (preChildren && !children) {
        this.toggleHidden();
      }
    }

  }

  enhanceChildren = (children: React.ReactNode, props) => {
    return React.cloneElement(
      children, 
      Object.assign({ 
        ref: (el) => { this.el = el } 
      }, props)
    );
  }

  get transitionClass() {
    const { name } = this.props;

    return {
      enter: `${name}-enter`,
      enterActive: `${name}-enter-active`,
      enterTo: `${name}-enter-to`,
      leave: `${name}-leave`,
      leaveActive: `${name}-leave-active`,
      leaveTo: `${name}-leave-to`,
    }
  }

  isViewComponent(element) {
    return element && element.type._typeName === 'View';
  }

  /* css animation fix when animation applyied to .{action} instanceof .{action}-active */

  animateElement(element, action, active, fn) {
    element.classList.add(active);

    const styles = getComputedStyle(element);
    const duration = parseFloat(styles['animationDuration']) || parseFloat(styles['transitionDuration']);

    element.classList.add(action);

    if (duration === 0) {
      const styles = getComputedStyle(element);
      const duration = parseFloat(styles['animationDuration']) || parseFloat(styles['transitionDuration']);

      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        fn();
      }, duration * 1000)
    }

    element.classList.remove(action, active);
  }

  didEnter(e) {
    const childDOM = ReactDOM.findDOMNode(this.el);

    if (!e || e.target !== childDOM) return;

    const { onAfterEnter } = this.props;
    const { enterActive, enterTo } = this.transitionClass;

    childDOM.classList.remove(enterActive, enterTo);

    childDOM.removeEventListener('transitionend', this.didEnter);
    childDOM.removeEventListener('animationend', this.didEnter);

    onAfterEnter && onAfterEnter();
  }

  didLeave(e) {
    const childDOM = ReactDOM.findDOMNode(this.el);
    if (!e || e.target !== childDOM) return;

    const { onAfterLeave, children } = this.props;
    const { leaveActive, leaveTo } = this.transitionClass;

    new Promise((resolve) => {
      if (this.isViewComponent(children)) {
        childDOM.removeEventListener('transitionend', this.didLeave);
        childDOM.removeEventListener('animationend', this.didLeave);

        window.requestAnimationFrame(() => {
          childDOM.style.display = 'none';
          childDOM.classList.remove(leaveActive, leaveTo);

          window.requestAnimationFrame(resolve);
        })
      } else {
        this.setState({ children: null }, resolve);
      }
    }).then(() => {
      onAfterLeave && onAfterLeave()
    })
  }

  toggleVisible() {
    const { onEnter } = this.props;
    const { enter, enterActive, enterTo, leaveActive, leaveTo } = this.transitionClass;
    const childDOM = ReactDOM.findDOMNode(this.el);

    childDOM.addEventListener('transitionend', this.didEnter);
    childDOM.addEventListener('animationend', this.didEnter);

    // this.animateElement(childDOM, enter, enterActive, this.didEnter);

    window.requestAnimationFrame(() => {
      // when hidden transition not end
      if (childDOM.classList.contains(leaveActive)) {
        childDOM.classList.remove(leaveActive, leaveTo);

        childDOM.removeEventListener('transitionend', this.didLeave);
        childDOM.removeEventListener('animationend', this.didLeave);
      }

      childDOM.style.display = '';
      childDOM.classList.add(enter, enterActive);

      onEnter && onEnter();

      requestAnimationFrame(() => {
        childDOM.classList.remove(enter);
        childDOM.classList.add(enterTo);
      })
    })
  }

  toggleHidden() {
    const { onLeave } = this.props;
    const { leave, leaveActive, leaveTo, enterActive, enterTo } = this.transitionClass;
    const childDOM = ReactDOM.findDOMNode(this.el);

    childDOM.addEventListener('transitionend', this.didLeave);
    childDOM.addEventListener('animationend', this.didLeave);

    // this.animateElement(childDOM, leave, leaveActive, this.didLeave);

    requestAnimationFrame(() => {
      // when enter transition not end
      if (childDOM.classList.contains(enterActive)) {
        childDOM.classList.remove(enterActive, enterTo);

        childDOM.removeEventListener('transitionend', this.didEnter);
        childDOM.removeEventListener('animationend', this.didEnter);
      }

      childDOM.classList.add(leave, leaveActive);

      onLeave && onLeave();

      requestAnimationFrame(() => {
        childDOM.classList.remove(leave);
        childDOM.classList.add(leaveTo);
      })
    })
  }

  render() {
    return this.state.children || null;
  }
}

export default Transition;