import { Button, Icon, RadioButton, RadioButtonOption, Text } from '@gravity-ui/uikit';

import { Group } from '../Group/Group';

import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { House } from '@gravity-ui/icons';
import { Align } from '../Align/Align';

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
        <Group>
          <Button size="l" onClick={() => nav('/')}>
            <Icon data={House}></Icon>
          </Button>
          <RadioButton size="l" options={options} onUpdate={nav} />
        </Group>
        <Text variant="body-1">
          <Align>
            Powered by <img height={24} src="/assets/logo.png" />
          </Align>
        </Text>
      </Group>
    </div>
  );
};
