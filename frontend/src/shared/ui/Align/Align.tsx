import { ComponentType, ReactNode } from 'react';

import styles from './Align.module.scss';

export const Align: ComponentType<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.align}>{children}</div>;
};
