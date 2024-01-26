import { IProduct } from '../IProduct.entity';
import { IProductRepository } from '../IProduct.repository';

const PRODUCT_MOCK: IProduct[] = [
  {
    id: 1,
    category_id: 1,
    name: 'PlayStation',
    description: 'Sony VideoGame',
    value: 1000,
    category: {
      id: 1,
      name: 'Video Games',
      percentage: 1,
    },
  },
];

export class MockProductRepository implements IProductRepository {
  async saveOne(payload: Partial<IProduct>): Promise<IProduct> {
    const newId = PRODUCT_MOCK.length + 1;

    PRODUCT_MOCK.push({
      id: newId,
      category_id: payload.category_id,
      name: payload.name,
      description: payload.description,
      value: payload.value,
      category: {
        id: 0,
        name: 'test',
        percentage: 1,
      },
    });

    const categoryInserted = PRODUCT_MOCK[PRODUCT_MOCK.length - 1];

    return Promise.resolve(categoryInserted);
  }

  async findOne(payload: Partial<IProduct>): Promise<IProduct | null> {
    const result = PRODUCT_MOCK.find(
      (userMock) =>
        userMock.id === payload?.id || userMock.name === payload?.name,
    );

    return result;
  }

  async find(): Promise<IProduct[]> {
    return Promise.resolve(PRODUCT_MOCK);
  }

  async updateOne(params: {
    id: number;
    payload: Partial<IProduct>;
  }): Promise<boolean> {
    const { id: categoryId, payload } = params;

    PRODUCT_MOCK.forEach((productMock) => {
      if (productMock.id === categoryId) {
        productMock.name = payload.name;
        productMock.description = !!payload.description
          ? payload.description
          : productMock.description;
        productMock.value = !!payload.value ? payload.value : productMock.value;
      }
    });

    return Promise.resolve(true);
  }

  async deleteOne(id: number): Promise<boolean> {
    const index = PRODUCT_MOCK.findIndex(
      (categoryMock) => categoryMock.id === id,
    );

    if (index !== -1) {
      PRODUCT_MOCK.splice(index, 1);

      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }
}
