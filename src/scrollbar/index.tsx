import './style.scss';
import * as React from 'react';
import * as classNames from 'classnames';
import { getInnerWidth, getInnerHeight, getScrollbarWidth, raf, caf } from './utils';

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
type ScrollbarEvent = MouseEvent & {
  target: HTMLDivElement;
};
type UpdateCallbackProps = (value: ValueProps) => void;
export type ScrollbarProps = {
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  thumbSize?: number;
  thumbMinSize: number;
  autoHide: boolean;
  autoHideTimeout: number;
  onScroll?: (event: MouseEvent) => void;
  onScrollStart?: () => void;
  onScrollStop?: () => void;
  onScrollFrame?: (value: ValueProps) => void;
  onUpdate?: UpdateCallbackProps;
};

class Scrollbar extends React.PureComponent<ScrollbarProps> {
  public static defaultProps = {
    prefixCls: 'dk-scrollbar',
    thumbMinSize: 30,
    autoHide: true,
    autoHideTimeout: 1000,
  };
  public scrolling: boolean;
  public dragging: boolean;
  public prevPageY?: number;
  public prevPageX?: number;
  public viewScrollLeft?: number;
  public viewScrollTop?: number;
  public lastViewScrollLeft?: number;
  public lastViewScrollTop?: number;
  public hideTracksTimeout: number;
  public detectScrollingInterval: number;
  public trackMouseOver?: boolean;
  public requestFrame?: any;

  public readonly containerRef: React.RefObject<HTMLDivElement>;
  public readonly trackHorizontalRef: React.RefObject<HTMLDivElement>;
  public readonly thumbHorizontalRef: React.RefObject<HTMLDivElement>;
  public readonly trackVerticalRef: React.RefObject<HTMLDivElement>;
  public readonly thumbVerticalRef: React.RefObject<HTMLDivElement>;
  public readonly viewRef: React.RefObject<HTMLDivElement>;

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
  }

  public componentDidMount() {
    this.addListeners();
    this.update();
  }

  public componentDidUpdate(prevProps: ScrollbarProps) {
    if (prevProps.autoHide !== this.props.autoHide) {
      this.removeListeners();
      this.addListeners();
    }
    // this.update();
  }

  public componentWillUnmount() {
    this.removeListeners();
    if (this.requestFrame) {
      caf(this.requestFrame);
    }
    clearTimeout(this.hideTracksTimeout);
    clearInterval(this.detectScrollingInterval);
  }

  public render() {
    const { prefixCls, children, style, className, autoHide } = this.props;
    const containerClassName = classNames(
      {
        [`${prefixCls}`]: true,
      },
      className,
    );
    const scrollbarWidth = getScrollbarWidth();
    const viewStyle = {
      marginLeft: `-${scrollbarWidth}px`,
      marginRight: `-${scrollbarWidth}px`,
    };

    return (
      <div className={containerClassName} ref={this.containerRef} style={style}>
        <div className={`${prefixCls}-view`} ref={this.viewRef} style={viewStyle}>
          {children}
        </div>
        <div
          className={classNames({
            [`${prefixCls}-track-horizontal`]: true,
            [`${prefixCls}-hide-track`]: autoHide,
          })}
          ref={this.trackHorizontalRef}
        >
          <div className={`${prefixCls}-thumb-horizontal`} ref={this.thumbHorizontalRef} />
        </div>
        <div
          className={classNames({
            [`${prefixCls}-track-vertical`]: true,
            [`${prefixCls}-hide-track`]: autoHide,
          })}
          ref={this.trackVerticalRef}
        >
          <div className={`${prefixCls}-thumb-vertical`} ref={this.thumbVerticalRef} />
        </div>
      </div>
    );
  }

  public getScrollLeft = () => {
    const el = this.viewRef.current;
    if (!el) {
      return 0;
    }
    return el.scrollLeft;
  };

  public getScrollTop = () => {
    const el = this.viewRef.current;
    if (!el) {
      return 0;
    }
    return el.scrollTop;
  };

  public getScrollWidth = () => {
    const el = this.viewRef.current;
    if (!el) {
      return 0;
    }
    return el.scrollWidth;
  };

  public getScrollHeight = () => {
    const el = this.viewRef.current;
    if (!el) {
      return 0;
    }
    return el.scrollHeight;
  };

  public getClientWidth = () => {
    const el = this.viewRef.current;
    if (!el) {
      return 0;
    }
    return el.clientWidth;
  };

  public getClientHeight = () => {
    const el = this.viewRef.current;
    if (!el) {
      return 0;
    }
    return el.clientHeight;
  };

  public getValues = () => {
    const {
      scrollLeft = 0,
      scrollTop = 0,
      scrollWidth = 0,
      scrollHeight = 0,
      clientWidth = 0,
      clientHeight = 0,
    } = this.viewRef.current || {};

    return {
      left: scrollLeft / (scrollWidth - clientWidth) || 0,
      top: scrollTop / (scrollHeight - clientHeight) || 0,
      scrollLeft,
      scrollTop,
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight,
    };
  };

  public getThumbHorizontalWidth = () => {
    const { thumbSize, thumbMinSize } = this.props;
    const { scrollWidth, clientWidth } = this.viewRef.current as HTMLDivElement;
    const trackHorizontalDiv = this.trackHorizontalRef.current as HTMLDivElement;
    const trackWidth = getInnerWidth(trackHorizontalDiv);
    const width = Math.ceil((clientWidth / scrollWidth) * trackWidth);
    if (trackWidth === width) {
      return 0;
    }
    if (thumbSize) {
      return thumbSize;
    }
    return Math.max(width, thumbMinSize);
  };

  public getThumbVerticalHeight = () => {
    const { thumbSize, thumbMinSize } = this.props;
    const { scrollHeight, clientHeight } = this.viewRef.current as HTMLDivElement;
    const trackVerticalDiv = this.trackVerticalRef.current as HTMLDivElement;
    const trackHeight = getInnerHeight(trackVerticalDiv);
    const height = Math.ceil((clientHeight / scrollHeight) * trackHeight);
    if (trackHeight === height) {
      return 0;
    }
    if (thumbSize) {
      return thumbSize;
    }
    return Math.max(height, thumbMinSize);
  };

  public getScrollLeftForOffset = (offset: number) => {
    const { scrollWidth, clientWidth } = this.viewRef.current as HTMLDivElement;
    const trackHorizontalDiv = this.trackHorizontalRef.current as HTMLDivElement;
    const trackWidth = getInnerWidth(trackHorizontalDiv);
    const thumbWidth = this.getThumbHorizontalWidth();
    return (offset / (trackWidth - thumbWidth)) * (scrollWidth - clientWidth);
  };

  public getScrollTopForOffset = (offset: number) => {
    const { scrollHeight, clientHeight } = this.viewRef.current as HTMLDivElement;
    const trackVerticalDiv = this.trackVerticalRef.current as HTMLDivElement;
    const trackHeight = getInnerHeight(trackVerticalDiv);
    const thumbHeight = this.getThumbVerticalHeight();
    return (offset / (trackHeight - thumbHeight)) * (scrollHeight - clientHeight);
  };

  public scrollLeft = (left = 0, duration = 0) => {
    if (!this.viewRef.current) {
      return;
    }
    if (duration === 0) {
      this.viewRef.current.scrollLeft = left;
    } else {
      scrollAnimateLeft(this.viewRef.current, left, duration);
    }
  };

  public scrollTop = (top = 0, duration = 0) => {
    if (!this.viewRef.current) {
      return;
    }
    if (duration === 0) {
      this.viewRef.current.scrollTop = top;
    } else {
      scrollAnimateTop(this.viewRef.current, top, duration);
    }
  };

  public scrollToLeft = () => {
    if (!this.viewRef.current) {
      return;
    }
    this.viewRef.current.scrollLeft = 0;
  };

  public scrollToTop = () => {
    if (!this.viewRef.current) {
      return;
    }
    this.viewRef.current.scrollTop = 0;
  };

  public scrollToRight = () => {
    if (!this.viewRef.current) {
      return;
    }
    this.viewRef.current.scrollLeft = this.viewRef.current.scrollWidth;
  };

  public scrollToBottom = () => {
    if (!this.viewRef.current) {
      return;
    }
    this.viewRef.current.scrollTop = this.viewRef.current.scrollHeight;
  };

  public addListeners = () => {
    if (typeof document === 'undefined' || !this.viewRef.current) {
      return;
    }
    this.viewRef.current.addEventListener('scroll', this.handleScroll);

    if (!this.props.autoHide) {
      return;
    }
    const trackHorizontalDiv = this.trackHorizontalRef.current as HTMLDivElement;
    const trackVerticalDiv = this.trackVerticalRef.current as HTMLDivElement;
    const thumbHorizontalDiv = this.thumbHorizontalRef.current as HTMLDivElement;
    const thumbVerticalDiv = this.thumbVerticalRef.current as HTMLDivElement;

    trackHorizontalDiv.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
    trackVerticalDiv.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
    thumbHorizontalDiv.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
    thumbVerticalDiv.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
    window.addEventListener('resize', this.handleWindowResize);
  };

  public removeListeners = () => {
    if (typeof document === 'undefined' || !this.viewRef.current) {
      return;
    }
    this.viewRef.current.removeEventListener('scroll', this.handleScroll);

    if (!this.props.autoHide) {
      return;
    }

    const trackHorizontalDiv = this.trackHorizontalRef.current as HTMLDivElement;
    const trackVerticalDiv = this.trackVerticalRef.current as HTMLDivElement;
    const thumbHorizontalDiv = this.thumbHorizontalRef.current as HTMLDivElement;
    const thumbVerticalDiv = this.thumbVerticalRef.current as HTMLDivElement;

    trackHorizontalDiv.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
    trackVerticalDiv.removeEventListener('mousedown', this.handleVerticalTrackMouseDown);
    thumbHorizontalDiv.removeEventListener('mousedown', this.handleHorizontalThumbMouseDown);
    thumbVerticalDiv.removeEventListener('mousedown', this.handleVerticalThumbMouseDown);
    window.removeEventListener('resize', this.handleWindowResize);
    this.teardownDragging();
  };

  public handleScroll = (event: MouseEvent) => {
    const { onScroll, onScrollFrame } = this.props;
    if (typeof onScroll === 'function') {
      onScroll(event);
    }
    this.update((values: ValueProps) => {
      const { scrollLeft, scrollTop } = values;
      this.viewScrollLeft = scrollLeft;
      this.viewScrollTop = scrollTop;
      if (typeof onScrollFrame === 'function') {
        onScrollFrame(values);
      }
    });
    this.detectScrolling();
  };

  public handleScrollStart = () => {
    const { onScrollStart } = this.props;
    if (typeof onScrollStart === 'function') {
      onScrollStart();
    }
    this.handleScrollStartAutoHide();
  };

  public handleScrollStartAutoHide = () => {
    const { autoHide } = this.props;
    if (!autoHide) {
      return;
    }
    this.showTracks();
  };

  public handleScrollStop = () => {
    const { onScrollStop } = this.props;
    if (typeof onScrollStop === 'function') {
      onScrollStop();
    }
    this.handleScrollStopAutoHide();
  };

  public handleScrollStopAutoHide = () => {
    const { autoHide } = this.props;
    if (!autoHide) {
      return;
    }
    this.hideTracks();
  };

  public handleWindowResize = () => {
    this.update();
  };

  public handleHorizontalTrackMouseDown = (event: ScrollbarEvent) => {
    event.preventDefault();
    const { target, clientX } = event;
    const { left: targetLeft } = target.getBoundingClientRect();
    const thumbWidth = this.getThumbHorizontalWidth();
    const offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
    const viewDiv = this.viewRef.current as HTMLDivElement;
    viewDiv.scrollLeft = this.getScrollLeftForOffset(offset);
  };

  public handleVerticalTrackMouseDown = (event: ScrollbarEvent) => {
    event.preventDefault();
    const { target, clientY } = event;
    const { top: targetTop } = target.getBoundingClientRect();
    const thumbHeight = this.getThumbVerticalHeight();
    const offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
    const viewDiv = this.viewRef.current as HTMLDivElement;
    viewDiv.scrollTop = this.getScrollTopForOffset(offset);
  };

  public handleHorizontalThumbMouseDown = (event: ScrollbarEvent) => {
    event.preventDefault();
    this.handleDragStart(event);
    const { target, clientX } = event;
    const { offsetWidth } = target;
    const { left } = target.getBoundingClientRect();
    this.prevPageX = offsetWidth - (clientX - left);
  };

  public handleVerticalThumbMouseDown = (event: ScrollbarEvent) => {
    event.preventDefault();
    this.handleDragStart(event);
    const { target, clientY } = event;
    const { offsetHeight } = target;
    const { top } = target.getBoundingClientRect();
    this.prevPageY = offsetHeight - (clientY - top);
  };

  public setupDragging = () => {
    const doc: any = document;
    doc.body.style.userSelect = 'none';
    doc.addEventListener('mousemove', this.handleDrag);
    doc.addEventListener('mouseup', this.handleDragEnd);
    doc.onselectstart = () => false;
  };

  public teardownDragging = () => {
    const doc: any = document;
    doc.body.style.userSelect = '';
    doc.removeEventListener('mousemove', this.handleDrag);
    doc.removeEventListener('mouseup', this.handleDragEnd);
    doc.onselectstart = undefined;
  };

  public handleDragStart = (event: MouseEvent) => {
    this.dragging = true;
    event.stopImmediatePropagation();
    this.setupDragging();
  };

  public handleDrag = (event: MouseEvent) => {
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
  };

  public handleDragEnd = () => {
    this.dragging = false;
    this.prevPageX = this.prevPageY = 0;
    this.teardownDragging();
    this.handleDragEndAutoHide();
  };

  public handleDragEndAutoHide = () => {
    const { autoHide } = this.props;
    if (!autoHide) {
      return;
    }
    this.hideTracks();
  };

  public handleTrackMouseEnter = () => {
    this.trackMouseOver = true;
    this.handleTrackMouseEnterAutoHide();
  };

  public handleTrackMouseEnterAutoHide = () => {
    const { autoHide } = this.props;
    if (!autoHide) {
      return;
    }
    this.showTracks();
  };

  public handleTrackMouseLeave = () => {
    this.trackMouseOver = false;
    this.handleTrackMouseLeaveAutoHide();
  };

  public handleTrackMouseLeaveAutoHide = () => {
    const { autoHide } = this.props;
    if (!autoHide) {
      return;
    }
    this.hideTracks();
  };

  public showTracks = () => {
    clearTimeout(this.hideTracksTimeout);
    const trackHorizontalDiv = this.trackHorizontalRef.current as HTMLDivElement;
    const trackVerticalDiv = this.trackVerticalRef.current as HTMLDivElement;
    trackHorizontalDiv.style.opacity = '1';
    trackVerticalDiv.style.opacity = '1';
  };

  public hideTracks = () => {
    if (this.dragging) {
      return;
    }
    if (this.scrolling) {
      return;
    }
    if (this.trackMouseOver) {
      return;
    }
    const { autoHideTimeout } = this.props;
    clearTimeout(this.hideTracksTimeout);
    this.hideTracksTimeout = window.setTimeout(() => {
      const trackHorizontalDiv = this.trackHorizontalRef.current as HTMLDivElement;
      const trackVerticalDiv = this.trackVerticalRef.current as HTMLDivElement;
      trackHorizontalDiv.style.opacity = '0';
      trackVerticalDiv.style.opacity = '0';
    }, autoHideTimeout);
  };

  public detectScrolling = () => {
    if (this.scrolling) {
      return;
    }
    this.scrolling = true;
    this.handleScrollStart();
    this.detectScrollingInterval = window.setInterval(() => {
      if (
        this.lastViewScrollLeft === this.viewScrollLeft &&
        this.lastViewScrollTop === this.viewScrollTop
      ) {
        clearInterval(this.detectScrollingInterval);
        this.scrolling = false;
        this.handleScrollStop();
      }
      this.lastViewScrollLeft = this.viewScrollLeft;
      this.lastViewScrollTop = this.viewScrollTop;
    }, 100);
  };

  public raf = (callback: VoidFunction) => {
    if (this.requestFrame) {
      caf(this.requestFrame);
    }
    this.requestFrame = raf(() => {
      this.requestFrame = undefined;
      callback();
    });
  };

  public update = (callback?: UpdateCallbackProps) => {
    this.raf(() => this.updateCallback(callback));
  };

  public updateCallback = (callback?: UpdateCallbackProps) => {
    const { onUpdate } = this.props;
    const values = this.getValues();
    const { scrollLeft, clientWidth, scrollWidth } = values;

    if (this.props.autoHide) {
      const trackHorizontalDiv = this.trackHorizontalRef.current as HTMLDivElement;
      const trackHorizontalWidth = getInnerWidth(trackHorizontalDiv);
      const thumbHorizontalWidth = this.getThumbHorizontalWidth();
      const thumbHorizontalX =
        (scrollLeft / (scrollWidth - clientWidth)) * (trackHorizontalWidth - thumbHorizontalWidth);

      const { scrollTop, clientHeight, scrollHeight } = values;
      const trackVerticalDiv = this.trackVerticalRef.current as HTMLDivElement;
      const trackVerticalHeight = getInnerHeight(trackVerticalDiv);
      const thumbVerticalHeight = this.getThumbVerticalHeight();
      const thumbVerticalY =
        (scrollTop / (scrollHeight - clientHeight)) * (trackVerticalHeight - thumbVerticalHeight);

      const thumbHorizontalDiv = this.thumbHorizontalRef.current as HTMLDivElement;
      const thumbVerticalDiv = this.thumbVerticalRef.current as HTMLDivElement;

      thumbHorizontalDiv.style.height = `${thumbHorizontalWidth}px`;
      thumbHorizontalDiv.style.transform = `translateX(${thumbHorizontalX}px)`;

      thumbVerticalDiv.style.height = `${thumbVerticalHeight}px`;
      thumbVerticalDiv.style.transform = `translateY(${thumbVerticalY}px)`;
    }

    if (typeof onUpdate === 'function') {
      onUpdate(values);
    }
    if (typeof callback === 'function') {
      callback(values);
    }
  };
}

const scrollAnimateTop = (element: Element, to: number, duration: number) => {
  if (duration <= 0) {
    element.scrollTop = to;
    return;
  }
  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;

  raf(() => {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) {
      return;
    }
    scrollAnimateTop(element, to, duration - 10);
  });
};

const scrollAnimateLeft = (element: Element, to: number, duration: number) => {
  if (duration <= 0) {
    element.scrollLeft = to;
    return;
  }
  const difference = to - element.scrollLeft;
  const perTick = (difference / duration) * 10;

  raf(() => {
    element.scrollLeft = element.scrollLeft + perTick;
    if (element.scrollLeft === to) {
      return;
    }
    scrollAnimateLeft(element, to, duration - 10);
  });
};

export default Scrollbar;
