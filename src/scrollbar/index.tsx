import * as React from 'react';
import * as classNames from 'classnames';
import * as css from 'dom-css';
import raf, { cancel as caf } from 'raf';
import { getInnerWidth, getInnerHeight, getScrollbarWidth } from './utils';
import {
  disableSelectStyle,
  disableSelectStyleReset
} from './styles';


type ValueProps = {
  left: number;
  top: number;
  scrollLeft: number;
  scrollTop: number;
  scrollWidth: number;
  scrollHeight: number;
  clientWidth: number;
  clientHeight: number;
};
type UpdateCallback = (value: ValueProps) => void;
export type ScrollbarProps = {
  prefixCls?: string;
  thumbSize?: number;
  thumbMinSize: number;
  hideTracksWhenNotNeeded: boolean;
  autoHide: boolean;
  autoHideTimeout: number;
  autoHideDuration: number;
  autoHeight: boolean;
  autoHeightMin: number;
  autoHeightMax: number;
  universal: boolean;
  onScroll?: (event: MouseEvent) => void;
  onScrollStart?: () => void;
  onScrollStop?: () => void;
  onScrollFrame?: (value: ValueProps) => void;
  onUpdate?: UpdateCallback;
};

export type ScrollbarState = {
  didMountUniversal: boolean;
};

class Scrollbar extends React.PureComponent<ScrollbarProps, ScrollbarState> {
  scrolling: boolean;
  dragging: boolean;
  prevPageY?: number;
  prevPageX?: number;
  viewScrollLeft?: number;
  viewScrollTop?: number;
  lastViewScrollLeft?: number;
  lastViewScrollTop?: number;
  hideTracksTimeout: number;
  detectScrollingInterval: number;
  trackMouseOver?: boolean;
  requestFrame?: VoidFunction;

  readonly containerRef: React.RefObject<HTMLDivElement>;
  readonly trackHorizontalRef: React.RefObject<HTMLDivElement>;
  readonly thumbHorizontalRef: React.RefObject<HTMLDivElement>;
  readonly trackVerticalRef: React.RefObject<HTMLDivElement>;
  readonly thumbVerticalRef: React.RefObject<HTMLDivElement>;
  readonly viewRef: React.RefObject<HTMLDivElement>;

  static defaultProps = {
    prefixCls: 'dk-scrollbar',
    thumbMinSize: 30,
    hideTracksWhenNotNeeded: false,
    autoHide: false,
    autoHideTimeout: 1000,
    autoHideDuration: 200,
    autoHeight: false,
    autoHeightMin: 0,
    autoHeightMax: 200,
    universal: false,
  };

  constructor(props: ScrollbarProps) {
    super(props);

    this.hideTracksTimeout = 0;
    this.detectScrollingInterval = 0;
    this.scrolling = false;
    this.dragging = false;

    this.containerRef = React.createRef();
    this.viewRef = React.createRef();
    this.trackHorizontalRef = React.createRef();
    this.thumbHorizontalRef = React.createRef();
    this.trackVerticalRef = React.createRef();
    this.thumbVerticalRef = React.createRef();

    this.state = {
      didMountUniversal: false,
    };
  }

  componentDidMount() {
    this.addListeners();
    this.update();
    this.componentDidMountUniversal();
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    this.removeListeners();
    caf(this.requestFrame);
    clearTimeout(this.hideTracksTimeout);
    clearInterval(this.detectScrollingInterval);
  }

  render() {
    const { prefixCls, children } = this.props;
    const containerClassName = classNames({
      [`${prefixCls}-scrollbar`]: true,
    })

    return (
      <div className={containerClassName} ref={this.containerRef}>
        <div className={`${prefixCls}-view`} ref={this.viewRef}>{children}</div>
        <div className={`${prefixCls}-track-horizontal`} ref={this.trackHorizontalRef}>
          <div className={`${prefixCls}-thumb-horizontal`} ref={this.thumbHorizontalRef}></div>
        </div>
        <div className={`${prefixCls}-track-vertical`} ref={this.trackVerticalRef}>
          <div className={`${prefixCls}-thumb-vertical`} ref={this.thumbVerticalRef}></div>
        </div>
      </div>
    );
  }

  componentDidMountUniversal() { // eslint-disable-line react/sort-comp
    const { universal } = this.props;
    if (!universal) return;
    this.setState({ didMountUniversal: true });
  }

  getScrollLeft() {
    const el = this.viewRef.current;
    if (!el) {
      return 0;
    }
    return el.scrollLeft;
  }

  getScrollTop() {
    const el = this.viewRef.current;
    if (!el) {
      return 0;
    }
    return el.scrollTop;
  }

  getScrollWidth() {
    const el = this.viewRef.current;
    if (!el) {
      return 0;
    }
    return el.scrollWidth;
  }

  getScrollHeight() {
    const el = this.viewRef.current;
    if (!el) {
      return 0;
    }
    return el.scrollHeight;
  }

  getClientWidth() {
    const el = this.viewRef.current;
    if (!el) {
      return 0;
    }
    return el.clientWidth;
  }

  getClientHeight() {
    const el = this.viewRef.current;
    if (!el) {
      return 0;
    }
    return el.clientHeight;
  }

  getValues() {
    const {
      scrollLeft = 0,
      scrollTop = 0,
      scrollWidth = 0,
      scrollHeight = 0,
      clientWidth = 0,
      clientHeight = 0
    } = this.viewRef.current || {};

    return {
      left: (scrollLeft / (scrollWidth - clientWidth)) || 0,
      top: (scrollTop / (scrollHeight - clientHeight)) || 0,
      scrollLeft,
      scrollTop,
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight
    };
  }

  getThumbHorizontalWidth() {
    const { thumbSize, thumbMinSize } = this.props;
    const { scrollWidth, clientWidth } = this.viewRef.current as HTMLDivElement;
    const trackHorizontalDiv = this.trackHorizontalRef.current as HTMLDivElement;
    const trackWidth = getInnerWidth(trackHorizontalDiv);
    const width = Math.ceil(clientWidth / scrollWidth * trackWidth);
    if (trackWidth === width) return 0;
    if (thumbSize) return thumbSize;
    return Math.max(width, thumbMinSize);
  }

  getThumbVerticalHeight() {
    const { thumbSize, thumbMinSize } = this.props;
    const { scrollHeight, clientHeight } = this.viewRef.current as HTMLDivElement;
    const trackVerticalDiv = this.trackVerticalRef.current as HTMLDivElement;
    const trackHeight = getInnerHeight(trackVerticalDiv);
    const height = Math.ceil(clientHeight / scrollHeight * trackHeight);
    if (trackHeight === height) return 0;
    if (thumbSize) return thumbSize;
    return Math.max(height, thumbMinSize);
  }

  getScrollLeftForOffset(offset: number) {
    const { scrollWidth, clientWidth } = this.viewRef.current as HTMLDivElement;
    const trackHorizontalDiv = this.trackHorizontalRef.current as HTMLDivElement;
    const trackWidth = getInnerWidth(trackHorizontalDiv);
    const thumbWidth = this.getThumbHorizontalWidth();
    return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
  }

  getScrollTopForOffset(offset: number) {
    const { scrollHeight, clientHeight } = this.viewRef.current as HTMLDivElement;
    const trackVerticalDiv = this.trackVerticalRef.current as HTMLDivElement;
    const trackHeight = getInnerHeight(trackVerticalDiv);
    const thumbHeight = this.getThumbVerticalHeight();
    return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
  }

  scrollLeft(left = 0) {
    if (!this.viewRef.current) return;
    this.viewRef.current.scrollLeft = left;
  }

  scrollTop(top = 0) {
    if (!this.viewRef.current) return;
    this.viewRef.current.scrollTop = top;
  }

  scrollToLeft() {
    if (!this.viewRef.current) return;
    this.viewRef.current.scrollLeft = 0;
  }

  scrollToTop() {
    if (!this.viewRef.current) return;
    this.viewRef.current.scrollTop = 0;
  }

  scrollToRight() {
    if (!this.viewRef.current) return;
    this.viewRef.current.scrollLeft = this.viewRef.current.scrollWidth;
  }

  scrollToBottom() {
    if (!this.viewRef.current) return;
    this.viewRef.current.scrollTop = this.viewRef.current.scrollHeight;
  }

  addListeners() {
    /* istanbul ignore if */
    if (typeof document === 'undefined' || !this.viewRef.current) return;
    this.viewRef.current.addEventListener('scroll', this.handleScroll);
    if (!getScrollbarWidth()) return;
    const trackHorizontalDiv = this.trackHorizontalRef.current as HTMLDivElement;
    const trackVerticalDiv = this.trackVerticalRef.current as HTMLDivElement;
    const thumbHorizontalDiv = this.thumbHorizontalRef.current as HTMLDivElement;
    const thumbVerticalDiv = this.thumbVerticalRef.current as HTMLDivElement;

    trackHorizontalDiv.addEventListener('mouseenter', this.handleTrackMouseEnter);
    trackHorizontalDiv.addEventListener('mouseleave', this.handleTrackMouseLeave);
    trackHorizontalDiv.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
    trackVerticalDiv.addEventListener('mouseenter', this.handleTrackMouseEnter);
    trackVerticalDiv.addEventListener('mouseleave', this.handleTrackMouseLeave);
    trackVerticalDiv.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
    thumbHorizontalDiv.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
    thumbVerticalDiv.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
    window.addEventListener('resize', this.handleWindowResize);
  }

  removeListeners() {
    /* istanbul ignore if */
    if (typeof document === 'undefined' || !this.viewRef.current) return;
    this.viewRef.current.removeEventListener('scroll', this.handleScroll);
    if (!getScrollbarWidth()) return;
    const trackHorizontalDiv = this.trackHorizontalRef.current as HTMLDivElement;
    const trackVerticalDiv = this.trackVerticalRef.current as HTMLDivElement;
    const thumbHorizontalDiv = this.thumbHorizontalRef.current as HTMLDivElement;
    const thumbVerticalDiv = this.thumbVerticalRef.current as HTMLDivElement;

    trackHorizontalDiv.removeEventListener('mouseenter', this.handleTrackMouseEnter);
    trackHorizontalDiv.removeEventListener('mouseleave', this.handleTrackMouseLeave);
    trackHorizontalDiv.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
    trackVerticalDiv.removeEventListener('mouseenter', this.handleTrackMouseEnter);
    trackVerticalDiv.removeEventListener('mouseleave', this.handleTrackMouseLeave);
    trackVerticalDiv.removeEventListener('mousedown', this.handleVerticalTrackMouseDown);
    thumbHorizontalDiv.removeEventListener('mousedown', this.handleHorizontalThumbMouseDown);
    thumbVerticalDiv.removeEventListener('mousedown', this.handleVerticalThumbMouseDown);
    window.removeEventListener('resize', this.handleWindowResize);
    // Possibly setup by `handleDragStart`
    this.teardownDragging();
  }

  handleScroll(event: MouseEvent) {
    const { onScroll, onScrollFrame } = this.props;
    if (onScroll) onScroll(event);
    this.update((values: ValueProps) => {
      const { scrollLeft, scrollTop } = values;
      this.viewScrollLeft = scrollLeft;
      this.viewScrollLeft = scrollTop;
      if (onScrollFrame) onScrollFrame(values);
    });
    this.detectScrolling();
  }

  handleScrollStart() {
    const { onScrollStart } = this.props;
    if (onScrollStart) onScrollStart();
    this.handleScrollStartAutoHide();
  }

  handleScrollStartAutoHide() {
    const { autoHide } = this.props;
    if (!autoHide) return;
    this.showTracks();
  }

  handleScrollStop() {
    const { onScrollStop } = this.props;
    if (onScrollStop) onScrollStop();
    this.handleScrollStopAutoHide();
  }

  handleScrollStopAutoHide() {
    const { autoHide } = this.props;
    if (!autoHide) return;
    this.hideTracks();
  }

  handleWindowResize() {
    this.update();
  }

  handleHorizontalTrackMouseDown(event: MouseEvent) {
    event.preventDefault();
    const { target, clientX } = event;
    const { left: targetLeft } = target.getBoundingClientRect();
    const thumbWidth = this.getThumbHorizontalWidth();
    const offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
    const viewDiv = this.viewRef.current as HTMLDivElement;
    viewDiv.scrollLeft = this.getScrollLeftForOffset(offset);
  }

  handleVerticalTrackMouseDown(event: MouseEvent) {
    event.preventDefault();
    const { target, clientY } = event;
    const { top: targetTop } = target.getBoundingClientRect();
    const thumbHeight = this.getThumbVerticalHeight();
    const offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
    const viewDiv = this.viewRef.current as HTMLDivElement;
    viewDiv.scrollTop = this.getScrollTopForOffset(offset);
  }

  handleHorizontalThumbMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.handleDragStart(event);
    const { target, clientX } = event;
    const { offsetWidth } = target as HTMLDivElement;
    const { left } = target.getBoundingClientRect();
    this.prevPageX = offsetWidth - (clientX - left);
  }

  handleVerticalThumbMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.handleDragStart(event);
    const { target, clientY } = event;
    const { offsetHeight } = target as HTMLDivElement;
    const { top } = target.getBoundingClientRect();
    this.prevPageY = offsetHeight - (clientY - top);
  }

  setupDragging() {
    css(document.body, disableSelectStyle);
    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.handleDragEnd);
    // document.onselectstart = () => false;
  }

  teardownDragging() {
    css(document.body, disableSelectStyleReset);
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragEnd);
    // document.onselectstart = undefined;
  }

  handleDragStart(event: MouseEvent) {
    this.dragging = true;
    event.stopImmediatePropagation();
    this.setupDragging();
  }

  handleDrag(event: MouseEvent) {
    if (this.prevPageX) {
      const { clientX } = event;
      const trackHorizontalDiv = this.trackHorizontalRef.current as HTMLDivElement;
      const viewDiv = this.viewRef.current as HTMLDivElement;
      const { left: trackLeft } = trackHorizontalDiv.getBoundingClientRect();
      const thumbWidth = this.getThumbHorizontalWidth();
      const clickPosition = thumbWidth - this.prevPageX;
      const offset = -trackLeft + clientX - clickPosition;
      viewDiv.scrollLeft = this.getScrollLeftForOffset(offset);
    }
    if (this.prevPageY) {
      const { clientY } = event;
      const trackVerticalDiv = this.trackVerticalRef.current as HTMLDivElement;
      const viewDiv = this.viewRef.current as HTMLDivElement;
      const { top: trackTop } = trackVerticalDiv.getBoundingClientRect();
      const thumbHeight = this.getThumbVerticalHeight();
      const clickPosition = thumbHeight - this.prevPageY;
      const offset = -trackTop + clientY - clickPosition;
      viewDiv.scrollTop = this.getScrollTopForOffset(offset);
    }
    return false;
  }

  handleDragEnd() {
    this.dragging = false;
    this.prevPageX = this.prevPageY = 0;
    this.teardownDragging();
    this.handleDragEndAutoHide();
  }

  handleDragEndAutoHide() {
    const { autoHide } = this.props;
    if (!autoHide) return;
    this.hideTracks();
  }

  handleTrackMouseEnter() {
    this.trackMouseOver = true;
    this.handleTrackMouseEnterAutoHide();
  }

  handleTrackMouseEnterAutoHide() {
    const { autoHide } = this.props;
    if (!autoHide) return;
    this.showTracks();
  }

  handleTrackMouseLeave() {
    this.trackMouseOver = false;
    this.handleTrackMouseLeaveAutoHide();
  }

  handleTrackMouseLeaveAutoHide() {
    const { autoHide } = this.props;
    if (!autoHide) return;
    this.hideTracks();
  }

  showTracks() {
    clearTimeout(this.hideTracksTimeout);
    css(this.trackHorizontalRef.current, { opacity: 1 });
    css(this.trackVerticalRef.current, { opacity: 1 });
  }

  hideTracks() {
    if (this.dragging) return;
    if (this.scrolling) return;
    if (this.trackMouseOver) return;
    const { autoHideTimeout } = this.props;
    clearTimeout(this.hideTracksTimeout);
    this.hideTracksTimeout = window.setTimeout(() => {
      css(this.trackHorizontalRef.current, { opacity: 0 });
      css(this.trackVerticalRef.current, { opacity: 0 });
    }, autoHideTimeout);
  }

  detectScrolling() {
    if (this.scrolling) return;
    this.scrolling = true;
    this.handleScrollStart();
    this.detectScrollingInterval = window.setInterval(() => {
      if (this.lastViewScrollLeft === this.viewScrollLeft
        && this.lastViewScrollTop === this.viewScrollTop) {
        clearInterval(this.detectScrollingInterval);
        this.scrolling = false;
        this.handleScrollStop();
      }
      this.lastViewScrollLeft = this.viewScrollLeft;
      this.lastViewScrollTop = this.viewScrollTop;
    }, 100);
  }

  raf(callback: VoidFunction) {
    if (this.requestFrame) raf.cancel(this.requestFrame);
    this.requestFrame = raf(() => {
      this.requestFrame = undefined;
      callback();
    });
  }

  update(callback?: UpdateCallback) {
    this.raf(() => this._update(callback));
  }

  _update(callback?: UpdateCallback) {
    const { onUpdate, hideTracksWhenNotNeeded } = this.props;
    const values = this.getValues();
    if (getScrollbarWidth()) {
      const { scrollLeft, clientWidth, scrollWidth } = values;
      const trackHorizontalDiv = this.trackHorizontalRef.current as HTMLDivElement;
      const trackHorizontalWidth = getInnerWidth(trackHorizontalDiv);
      const thumbHorizontalWidth = this.getThumbHorizontalWidth();
      const thumbHorizontalX = scrollLeft / (scrollWidth - clientWidth) * (trackHorizontalWidth - thumbHorizontalWidth);
      const thumbHorizontalStyle = {
        width: thumbHorizontalWidth,
        transform: `translateX(${thumbHorizontalX}px)`
      };
      const { scrollTop, clientHeight, scrollHeight } = values;
      const trackVerticalDiv = this.trackVerticalRef.current as HTMLDivElement;
      const trackVerticalHeight = getInnerHeight(trackVerticalDiv);
      const thumbVerticalHeight = this.getThumbVerticalHeight();
      const thumbVerticalY = scrollTop / (scrollHeight - clientHeight) * (trackVerticalHeight - thumbVerticalHeight);
      const thumbVerticalStyle = {
        height: thumbVerticalHeight,
        transform: `translateY(${thumbVerticalY}px)`
      };
      if (hideTracksWhenNotNeeded) {
        const trackHorizontalStyle = {
          visibility: scrollWidth > clientWidth ? 'visible' : 'hidden'
        };
        const trackVerticalStyle = {
          visibility: scrollHeight > clientHeight ? 'visible' : 'hidden'
        };
        css(this.trackHorizontalRef.current, trackHorizontalStyle);
        css(this.trackVerticalRef.current, trackVerticalStyle);
      }
      css(this.thumbHorizontalRef.current, thumbHorizontalStyle);
      css(this.trackVerticalRef.current, thumbVerticalStyle);
    }
    if (onUpdate) onUpdate(values);
    if (typeof callback === 'function') {
      callback(values);
    }
  }
}

export default Scrollbar;
