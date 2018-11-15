declare module '*.svg' {
  import { ComponentClass } from 'react';
  const content: ComponentClass<React.SVGAttributes<SVGElement>>;
  export default content;
}
