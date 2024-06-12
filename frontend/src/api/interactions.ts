export type ProductInfo<FieldName extends string, FieldValue extends string> = Record<
  FieldName,
  FieldValue
>;

export type Product = {
  title: string;
  description: string;
};

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
