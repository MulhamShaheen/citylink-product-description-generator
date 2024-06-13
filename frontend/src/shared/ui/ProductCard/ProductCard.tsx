import { Button, Card, Text } from '@gravity-ui/uikit';
import { useNavigate } from 'react-router-dom';

import { Product } from '@/api/interactions';
import { useAppContext } from '@/context/AppContext';

import { Stack } from '../Stack/Stack';

interface Props {
  product: Product;
  showDescription?: boolean;
  showButton?: boolean;
}

export const ProductCard = ({ product, showDescription = true, showButton = true }: Props) => {
  const { setActiveProduct } = useAppContext();
  const nav = useNavigate();

  const handleClick = () => {
    setActiveProduct(product);
    nav('/show-product-card');
  };

  return (
    <Card style={{ padding: 16, flex: 1 }}>
      <Stack>
        <Stack gap={16}>
          <Text variant="header-2">{product.title}</Text>
          <img
            height={130}
            src={product.src || '/assets/product.jpg'}
            style={{
              objectFit: 'cover',
            }}
          />
          {showDescription && (
            <Text
              variant="body-3"
              style={{
                maxHeight: 150,
                overflowY: 'auto',
              }}
            >
              {product.description}
            </Text>
          )}
        </Stack>
        {showButton && (
          <div style={{ marginTop: 8 }}>
            <Button size="l" view="action" onClick={handleClick}>
              Смотреть товар
            </Button>
          </div>
        )}
      </Stack>
    </Card>
  );
};
