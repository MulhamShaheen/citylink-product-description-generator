import { Text } from '@gravity-ui/uikit';

import { useAppContext } from '@/context/AppContext';
import { Group, ProductCard, Stack } from '@/shared/ui';

export const FoundProductsPage = () => {
  const { products } = useAppContext();

  return (
    <Stack>
      <Text variant="header-2" style={{ marginBottom: 24 }}>
        Найденные товары
      </Text>
      <Stack>
        <Group css={{ minWidth: 800 }}>
          {products.map((p, idx) => (
            <ProductCard product={p} showDescription key={idx} />
          ))}
        </Group>
      </Stack>
    </Stack>
  );
};
