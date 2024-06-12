import { CSSProperties, ComponentType, ReactNode } from 'react';
import styles from './Group.module.scss';

export const Group: ComponentType<{ children: ReactNode; css?: CSSProperties }> = ({
  children,
  css,
}) => {
  return (
    <div className={styles.group} style={css}>
      {children}
    </div>
  );
};
