import './spin.less';

import * as classNames from 'classnames';
import * as React from 'react';

export type SpinSize = 'small' | 'default' | 'large';
export type SpinProps = {
  spinning?: boolean;
  className?: string;
  size?: SpinSize;
  delay?: number;
  text?: string;
};
export interface SpinState {
  spinning?: boolean;
}
class Spin extends React.Component<SpinProps, SpinState> {
  public static defaultProps = {
    spinning: true,
    size: 'default' as SpinSize,
  };
  private delayTimeout: number;
  private debounceTimeout: number;
  constructor(props: SpinProps) {
    super(props);

    const spinning = props.spinning;
    this.delayTimeout = 0;
    this.debounceTimeout = 0;
    this.state = {
      spinning,
    };
  }

  public componentDidMount() {
    const { spinning, delay } = this.props;
    if (spinning && delay) {
      this.setState({
        spinning: false,
      });
      this.delayTimeout = window.setTimeout(() => {
        this.setState({
          spinning,
        });
      }, delay);
    }
  }

  public componentWillReceiveProps(nextProps: SpinProps) {
    const currentSpinning = this.props.spinning;
    const spinning = nextProps.spinning;
    const { delay } = this.props;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (currentSpinning && !spinning) {
      this.debounceTimeout = window.setTimeout(() => {
        this.setState({ spinning });
      }, 200);
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
    } else {
      if (spinning && delay) {
        if (this.delayTimeout) {
          clearTimeout(this.delayTimeout);
        }
        this.delayTimeout = window.setTimeout(() => {
          this.setState({
            spinning,
          });
        }, delay);
      } else {
        this.setState({ spinning });
      }
    }
  }

  public componentWillUnmount() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (this.delayTimeout) {
      window.clearTimeout(this.delayTimeout);
    }
  }
  public render() {
    const { className, size, text } = this.props;
    const { spinning } = this.state;
    const isNestedPattern = !!(this.props && this.props.children);
    const spinClassName = classNames([
      'spin',
      {
        'spinning': spinning,
      },
    ]);
    const circleClassName = classNames([
      'spin-circle',
      {
        'spin-large': size === 'large',
        'spin-small': size === 'small',
      },
    ]);

    const spinElement = (
      <div className={spinClassName}>
        <div className={circleClassName} />
        {text ? <div className="spin-text">{text}</div> : null}
      </div>
    );

    if (isNestedPattern) {
      const containerClassName = classNames(
        'spin-container',
        {
          'spin-blur': spinning,
        },
        className,
      );
      return (
        <div className="spin-box">
          <div className={containerClassName}>{this.props.children}</div>
          {spinning ? (
            <div className="spin-loading">{spinElement}</div>
          ) : null}
        </div>
      );
    }

    return spinElement;
  }
}
export default Spin;
