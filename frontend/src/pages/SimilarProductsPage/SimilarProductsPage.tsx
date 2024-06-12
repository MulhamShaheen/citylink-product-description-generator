import { Button, Text } from '@gravity-ui/uikit';
import { v4 as uuidv4 } from 'uuid';

import { useAppContext } from '@/context/AppContext';
import { Group, ProductCard, Stack } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/api/interactions';

interface ButtonProps {
  product: Product;
}

const FillDetailButton = ({ product }: ButtonProps) => {
  const { setActiveProduct, setProductFields } = useAppContext();
  const nav = useNavigate();

  const handleClick = () => {
    setProductFields(
      Object.entries(product).map(([name, value]) => ({ id: uuidv4(), name, value })),
    );
    setActiveProduct(product);
    nav('/fill-product-card-details');
  };

  return (
    <Button size="l" view="action" onClick={handleClick} width="max">
      Заполнить информацию
    </Button>
  );
};

export const SimilarProductsPage = () => {
  const { products } = useAppContext();

  return (
    <Stack>
      <Text variant="header-2" style={{ marginBottom: 24 }}>
        ТОП-{products.length} похожих товаров
      </Text>
      <Stack>
        <Group css={{ minWidth: 800 }}>
          {products.map((p, idx) => (
            <ProductCard
              description={p.description}
              title={p.title}
              button={<FillDetailButton product={p} />}
              key={idx}
            />
          ))}
        </Group>
      </Stack>
    </Stack>
  );
};
