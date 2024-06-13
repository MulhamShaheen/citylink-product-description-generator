import { useState } from 'react';
import { Button, Text, TextInput } from '@gravity-ui/uikit';

import { Group, Stack } from '@/shared/ui';
import { useAddProduct } from '@/api/hooks';
import { ProductInformation } from '@/api/interactions';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_INFORMATION_FIELDS, ProductField } from './const';

export const AddProductPage = () => {
  const { mutateAsync: addProduct, isLoading } = useAddProduct();
  const nav = useNavigate();

  const [fields, setFields] = useState<ProductField[]>(PRODUCT_INFORMATION_FIELDS);

  const handleFieldDelete = (fieldId: string) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== fieldId));
  };

  const handleFieldValueUpdate = (id: string, fieldValue: string) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, fieldValue } : field)),
    );
  };

  const submitFields = async () => {
    const information = fields.reduce(
      (acc, field) => ({ ...acc, [field.fieldCode]: field.fieldValue }),
      {},
    ) as ProductInformation;

    await addProduct({
      information,
    });

    nav('/show-product-card');
  };

  return (
    <Stack css={{ minWidth: 600 }}>
      <Stack>
        <Stack>
          <Text variant="header-2">Заполните информацию о товаре</Text>
        </Stack>
        <Stack css={{ marginTop: 24 }}>
          {fields.map(({ fieldName, fieldValue, id }, idx) => (
            <Group key={id || idx}>
              <TextInput value={fieldName} size="xl" placeholder="Название поля" />
              <TextInput
                value={fieldValue}
                size="xl"
                hasClear
                onChange={(event) => handleFieldValueUpdate(id, event.target.value)}
                placeholder="Значение"
              />
              <Button size="xl" view="outlined-danger" onClick={() => handleFieldDelete(id)}>
                Удалить
              </Button>
            </Group>
          ))}
        </Stack>
        <Button
          onClick={submitFields}
          style={{ marginTop: 16 }}
          view="action"
          size="xl"
          loading={isLoading}
        >
          Отправить
        </Button>
      </Stack>
    </Stack>
  );
};
