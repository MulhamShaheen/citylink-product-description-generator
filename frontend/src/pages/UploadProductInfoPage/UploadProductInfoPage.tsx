import { RefObject, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconFileFilled, IconUpload } from '@tabler/icons-react';
import { Button, TextInput } from '@gravity-ui/uikit';

import { Group, Stack, Align } from '@/shared/ui';
import { useSendProductInfo } from '@/api/hooks';
import { useAppContext } from '@/context/AppContext';

export const UploadProductInfoPage = () => {
  const { setProductFields } = useAppContext();

  const fileInputRef = useRef<RefObject<HTMLInputElement>>(null);
  const [file, setFile] = useState<File | null>(null);
  const [productName, setProductName] = useState('');

  const { mutateAsync: sendProductInfoForm, isLoading } = useSendProductInfo();

  const nav = useNavigate();

  const uploadButtonTitle = file ? file.name : 'Загрузить файл';
  const UploadButtonIcon = file ? IconFileFilled : IconUpload;

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const onSubmit = async () => {
    if (!file || !productName) {
      return;
    }

    const res = await sendProductInfoForm({
      file,
      productName,
    });

    if (res.status) {
      nav('fill-product-info');
    }

    if (res.result) {
      setProductFields(res.result);
    }
  };

  return (
    <Stack css={{ minWidth: 500 }}>
      <Group>
        <TextInput
          size="xl"
          placeholder="Название товара"
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />
        <input
          accept=""
          onChange={onFileChange}
          ref={fileInputRef}
          multiple={false}
          type="file"
          hidden
        />
        <Button
          size="xl"
          type="button"
          selected={Boolean(file)}
          onClick={() => fileInputRef?.current && fileInputRef?.current?.click()}
        >
          <Align>
            <UploadButtonIcon size={18} />
            {uploadButtonTitle}
          </Align>
        </Button>
      </Group>
      <Button
        disabled={!productName || !file}
        size="xl"
        view="action"
        onClick={onSubmit}
        loading={isLoading}
      >
        Отправить
      </Button>
    </Stack>
  );
};
