// Сущности

export type ProductCategory = 'laptop' | 'smartphone' | 'monitor' | 'tv';

export type ProductSearchCriteria = 'code' | 'name';

export type Product = {
  id: number;
  title: string;
  description: string;
  src?: string;
};

export type ProductPrompt = string;

// Запросы
// Поиск продукта
export type SearchProductRequest = {
  category: ProductCategory;
  criteria: ProductSearchCriteria;
  value: string;
};

export type SearchProductResponse = {
  ok: boolean;
  result: Product[];
};

// Регенерация описания продукта
export type RegenerateProductDescriptionRequest = {
  id: number; // ID продукта
  prompts: ProductPrompt[]; // Массив из промптов
};

export type RegenerateProductDescriptionResponse = {
  ok: boolean;
  result: Product; // Продукт с новым описанием
};

export type ProductInfo<FieldName extends string, FieldValue extends string> = Record<
  FieldName,
  FieldValue
>;

export type ProductField = { value: string; name: string; id: string };

// Отправка информации о товаре
export type UploadProductInfoRequest = {
  productName: string;
  file: File;
};

export type UploadProductInfoResponse = {
  status: boolean;
  result: ProductInfo<string, string>;
};

// Отправка описания продукта
export type FillProductInfoRequest = {
  fields: { field_name: string; field_value: string }[];
};

export type FillProductInfoResponse = {
  status: boolean;
  result: {
    found: boolean;
    products: Product[];
  };
};
