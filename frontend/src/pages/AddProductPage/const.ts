import { v4 as uuidv4 } from 'uuid';

import { ProductInformation } from '@/api/interactions';

export type ProductField = {
  id: string;
  fieldName: string;
  fieldValue: string;
  fieldCode: keyof ProductInformation;
};

export const PRODUCT_INFORMATION_FIELDS: ProductField[] = [
  {
    id: uuidv4(),
    fieldCode: 'category',
    fieldName: 'Группа товаров',
    fieldValue: '',
  },
  {
    id: uuidv4(),
    fieldCode: 'code',
    fieldName: 'Код товара',
    fieldValue: '',
  },
  {
    id: uuidv4(),
    fieldCode: 'brand',
    fieldName: 'Тип',
    fieldValue: '',
  },
  {
    id: uuidv4(),
    fieldCode: 'model',
    fieldName: 'Тип',
    fieldValue: '',
  },
  {
    id: uuidv4(),
    fieldCode: 'family',
    fieldName: 'Семейство',
    fieldValue: '',
  },
  {
    id: uuidv4(),
    fieldCode: 'part_number',
    fieldName: 'PartNumber/Артикул Производителя',
    fieldValue: '',
  },
  {
    id: uuidv4(),
    fieldCode: 'website',
    fieldName: 'Ссылка на сайт поставщика/вендора',
    fieldValue: '',
  },
];
