import { useAppContext } from '@/context/AppContext';
import { Group, ProductCard } from '@/shared/ui';

export const ProductCardPage = () => {
  const { activeProduct } = useAppContext();

  return (
    <div>
      <Group>
        <ProductCard
          button={<></>}
          description={activeProduct?.description || ''}
          title={activeProduct?.title || ''}
        />
      </Group>
    </div>
  );
};
