import { useAppContext } from '@/context/AppContext';
import { FillProductDescriptionPage } from '../FillProductDescriptionPage/FillProductDescriptionPage';

export const FillProductCardDetails = () => {
  const { activeProduct } = useAppContext();

  return (
    <div>
      <FillProductDescriptionPage product={activeProduct} />
    </div>
  );
};
