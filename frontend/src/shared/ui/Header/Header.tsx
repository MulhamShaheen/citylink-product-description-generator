import { RadioButton, RadioButtonOption, Text } from '@gravity-ui/uikit';

import { Group } from '../Group/Group';

import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';

const options: RadioButtonOption[] = [
  { value: '/', content: 'Искать товар' },
  { value: '/add-product', content: 'Добавить товар' },
];

export const Header = () => {
  const nav = useNavigate();

  return (
    <div className={styles.header}>
      <Group
        css={{
          padding: 24,
          justifyContent: 'space-between',
        }}
      >
        <Text variant="header-1">Wolf From Citylink</Text>
        <RadioButton size="l" options={options} onUpdate={nav} />
      </Group>
    </div>
  );
};
