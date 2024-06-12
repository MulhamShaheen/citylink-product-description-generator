import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IconPlus } from '@tabler/icons-react';
import { Button, Text, TextInput } from '@gravity-ui/uikit';

import { useAppContext } from '@/context/AppContext';
import { Align, Group, Stack } from '@/shared/ui';
import { useSendProductFields } from '@/api/hooks';
import { FillProductInfoRequest, Product, ProductField } from '@/api/interactions';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: Product | null;
  onSend?: (fields: FillProductInfoRequest['fields']) => void;
}

export const FillProductDescriptionPage = ({ product, onSend }: Props) => {
  const { productFields, setProducts } = useAppContext();

  const nav = useNavigate();

  const [fields, setFields] = useState<ProductField[]>([...productFields]);

  const { mutateAsync: sendProductFields, isLoading } = useSendProductFields();

  const handleFieldDelete = (fieldId: string) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== fieldId));
  };

  const handleFieldValueUpdate = (id: string, value: string) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, value } : field)),
    );
  };

  const handleFieldNameUpdate = (id: string, name: string) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, name } : field)),
    );
  };

  const addNewField = () => {
    setFields((prevFields) => [
      ...prevFields,
      {
        name: `Новое поле`,
        value: 'Значение поля',
        id: uuidv4(),
      },
    ]);
  };

  const submitFields = async () => {
    const fieldsRecord: FillProductInfoRequest['fields'] = fields.map(({ name, value }) => ({
      field_name: name,
      field_value: value,
    }));

    if (onSend) {
      await onSend(fieldsRecord);
      return nav('/product-edited');
    }

    const res = await sendProductFields({ fields: fieldsRecord });

    if (!res.status) {
      return;
    }

    const { found, products } = res.result;

    setProducts(products);

    if (found) {
      nav('/found-products');
    } else {
      nav('/similar-products');
    }
  };

  return (
    <Stack css={{ minWidth: 600 }}>
      <Stack>
        <Stack>
          <Text variant="header-2">Заполните информацию о товаре</Text>
          {product?.title && <Text variant="header-1">{product.title}</Text>}
        </Stack>
        <Stack css={{ marginTop: 24 }}>
          {fields.map(({ name, value, id }, idx) => (
            <Group key={id || idx}>
              <TextInput
                value={name}
                size="xl"
                hasClear
                onChange={(event) => handleFieldNameUpdate(id, event.target.value)}
                label="Название поля"
              />
              <TextInput
                value={value}
                size="xl"
                hasClear
                onChange={(event) => handleFieldValueUpdate(id, event.target.value)}
                label="Значение"
              />
              <Button size="xl" view="outlined-danger" onClick={() => handleFieldDelete(id)}>
                Удалить
              </Button>
            </Group>
          ))}
        </Stack>
        <Group css={{ marginTop: 8 }}>
          <Button size="l" onClick={addNewField}>
            <Align>
              <IconPlus size={16} />
              Добавить поле
            </Align>
          </Button>
        </Group>
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
