import { CSSProperties, ComponentType, ReactNode } from 'react';

import styles from './Align.module.scss';

export const Align: ComponentType<{ children: ReactNode; css?: CSSProperties }> = ({
  children,
  css,
}) => {
  return (
    <div className={styles.align} style={css}>
      {children}
    </div>
  );
};
