import { useState } from 'react';

import { useAppContext } from '@/context/AppContext';
import { Align, Group, ProductCard, Stack } from '@/shared/ui';
import { Button, Text, TextArea } from '@gravity-ui/uikit';

import styles from './ProductCardPage.module.scss';
import { useRegenerateProduct } from '@/api/hooks';

interface PromptProps {
  prompt: string;
  loading?: boolean;
  onChange: (value: string) => void;
  onDelete: () => void;
}

const Prompt = ({ onChange, onDelete, prompt, loading = false }: PromptProps) => {
  return (
    <Group>
      <Align>
        <TextArea
          style={{ width: '80%' }}
          size="l"
          value={loading ? '...' : prompt}
          onChange={(e) => onChange(e.target.value)}
          disabled={loading}
        />
        <Button size="l" onClick={onDelete} view="flat-danger" loading={loading}>
          Удалить
        </Button>
      </Align>
    </Group>
  );
};

export const ProductCardPage = () => {
  const { activeProduct } = useAppContext();

  const { mutateAsync: regenerateProductDescription, isLoading } = useRegenerateProduct();

  const [prompts, setPrompts] = useState<string[]>(['Промпт для описания']);

  const regenerateDescription = () => {
    if (!activeProduct) {
      return;
    }

    setPrompts(['Промпт для описания']);

    regenerateProductDescription({
      id: activeProduct.id,
      prompts,
    });
  };

  return (
    <Stack>
      <Group gap={32}>
        {activeProduct && (
          <Stack
            css={{
              maxWidth: 600,
              overflowY: 'auto',
            }}
          >
            <ProductCard product={activeProduct} showDescription showButton={false} />
          </Stack>
        )}
        <div className={styles.promptEditor}>
          <Stack gap={16} css={{ width: '100%' }}>
            <Text variant="header-1">Редактор промптов</Text>
            <Stack>
              {prompts.map((prompt, idx) => (
                <Prompt
                  key={prompt + idx}
                  loading={isLoading}
                  onDelete={() => setPrompts(prompts.filter((_, i) => i !== idx))}
                  prompt={prompt}
                  onChange={(value) =>
                    setPrompts([...prompts.slice(0, idx), value, ...prompts.slice(idx + 1)])
                  }
                />
              ))}
            </Stack>
            <Stack>
              <Button
                size="l"
                view="normal"
                onClick={() => setPrompts([...prompts, 'Новый промпт'])}
                loading={isLoading}
              >
                Добавить промпт
              </Button>
              <Button
                size="l"
                view="action"
                loading={isLoading}
                onClick={regenerateDescription}
                disabled={!activeProduct}
              >
                Перегенерировать описание
              </Button>
            </Stack>
          </Stack>
        </div>
      </Group>
    </Stack>
  );
};
