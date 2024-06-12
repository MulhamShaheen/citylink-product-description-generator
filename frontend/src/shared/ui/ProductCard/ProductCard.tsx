import { Button, Card, Text } from '@gravity-ui/uikit';

import { Stack } from '../Stack/Stack';
import { ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
  button: ReactNode;
}

export const ProductCard = ({ description, title, button: ButtonComponent }: Props) => {
  return (
    <Card style={{ padding: 16, flex: 1 }}>
      <Stack>
        <Stack>
          <Text variant="header-2">{title}</Text>
          <Text variant="body-1">{description}</Text>
        </Stack>
        <div style={{ marginTop: 8 }}>{ButtonComponent}</div>
      </Stack>
    </Card>
  );
};
