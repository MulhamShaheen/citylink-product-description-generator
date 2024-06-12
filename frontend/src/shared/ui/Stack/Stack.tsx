import { CSSProperties, ComponentType, ReactNode } from 'react';

import styles from './Stack.module.scss';

export const Stack: ComponentType<{ children: ReactNode; css?: CSSProperties }> = ({
  children,
  css,
}) => {
  return (
    <div className={styles.stack} style={css}>
      {children}
    </div>
  );
};
