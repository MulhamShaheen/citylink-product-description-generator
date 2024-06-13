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

export type ProductInformation = {
  category: string; // Группа товаров
  code: string; // Код товара
  citylink: string; // Ситилинк
  type: string; // Тип
  part_number: string; // PartNumber/Артикул Производителя
  brand: string; // Бренд
  model: string; // Модель
  family: string; // Семейство
  website: string; // Ссылка на сайт поставщика/вендора
};

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

// Добавление продукта
export type AddProductRequest = {
  information: ProductInformation;
};

export type AddProductResponse = {
  ok: boolean;
  result: Product;
};
