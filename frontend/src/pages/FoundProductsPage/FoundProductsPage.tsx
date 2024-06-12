import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@gravity-ui/uikit';

import { useAppContext } from '@/context/AppContext';
import { Group, ProductCard, Stack } from '@/shared/ui';
import { Product } from '@/api/interactions';

interface ButtonProps {
  product: Product;
}

const ShowProductButton = ({ product }: ButtonProps) => {
  const { setActiveProduct } = useAppContext();
  const nav = useNavigate();

  const handleClick = () => {
    setActiveProduct(product);
    nav('/show-product-card');
  };

  return (
    <Button size="l" view="action" onClick={handleClick} width="max">
      Показать
    </Button>
  );
};

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
            <ProductCard
              button={<ShowProductButton product={p} />}
              description={p.description}
              title={p.title}
              key={idx}
            />
          ))}
        </Group>
      </Stack>
    </Stack>
  );
};
