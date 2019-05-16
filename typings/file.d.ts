declare module '*.svg' {
  import { ComponentClass } from 'react';
  const content: ComponentClass<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.json' {
  const value: any;
  export default value;
}
