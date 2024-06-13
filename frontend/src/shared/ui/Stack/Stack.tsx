import { CSSProperties, ComponentType, ReactNode } from 'react';

import styles from './Stack.module.scss';

export const Stack: ComponentType<{
  children: ReactNode;
  css?: CSSProperties;
  gap?: number;
  align?: CSSProperties['textAlign'];
}> = ({ children, css, gap = 8, align = 'center' }) => {
  return (
    <div
      className={styles.stack}
      style={{
        ...css,
        gap,
        textAlign: align,
      }}
    >
      {children}
    </div>
  );
};
