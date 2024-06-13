import { useState } from 'react';
import { Button, RadioButton, RadioButtonOption, Text, TextInput } from '@gravity-ui/uikit';

import { Group, Stack } from '@/shared/ui';
import { ProductCategory, ProductSearchCriteria } from '@/api/interactions';
import { useSearchProduct } from '@/api/hooks/useSearchProduct';

const productCategoriesOption: RadioButtonOption<ProductCategory>[] = [
  {
    value: 'laptop',
    content: 'Ноутбуки',
  },
  {
    value: 'smartphone',
    content: 'Смартфоны',
  },
  {
    value: 'monitor',
    content: 'Мониторы',
  },
  {
    value: 'tv',
    content: 'Телевизоры',
  },
];

const searchFieldOptions: RadioButtonOption<ProductSearchCriteria>[] = [
  {
    value: 'code',
    content: 'Артикул',
  },
  {
    value: 'name',
    content: 'Название товара',
  },
];

export const SearchProductPage = () => {
  const [category, setCategory] = useState<ProductCategory>('laptop');
  const [criteria, setCriteria] = useState<ProductSearchCriteria>('code');
  const [criteriaValue, setCriteriaValue] = useState('');

  const { mutateAsync: searchProduct, isLoading } = useSearchProduct();

  const onSubmit = () => {
    searchProduct({
      category,
      criteria,
      value: criteriaValue,
    });
  };

  return (
    <Stack css={{ minWidth: 500 }}>
      <Stack gap={16}>
        <Stack gap={16} align="left">
          <Text variant="header-1">Категория товара</Text>
          <RadioButton
            value={category}
            onUpdate={setCategory}
            options={productCategoriesOption}
            size="l"
          />
        </Stack>
        <Stack gap={16} align="left">
          <Text variant="header-1">Искать по</Text>
          <RadioButton
            value={criteria}
            onUpdate={setCriteria}
            options={searchFieldOptions}
            size="l"
          />
        </Stack>
        <Stack css={{ marginTop: 16 }} align="left">
          <Group>
            <TextInput
              size="xl"
              placeholder={criteria === 'code' ? 'Артикул товара' : 'Название товара'}
              onChange={(e) => setCriteriaValue(e.target.value)}
              value={criteriaValue}
            />
            <Button
              style={{
                width: 200,
              }}
              disabled={!criteriaValue}
              size="xl"
              view="action"
              onClick={onSubmit}
              loading={isLoading}
            >
              Искать
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Stack>
  );
};
