import { ICategory } from '../Icategory.entity';
import { ICategoryRepository } from '../Icategory.repository';

const CATEGORY_MOCK: ICategory[] = [
  {
    id: 1,
    name: 'Video Games',
    percentage: 1,
    products: [
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
    ],
  },
  {
    id: 2,
    name: 'Home',
    percentage: 2,
    products: [],
  },
];

export class MockCategoryRepository implements ICategoryRepository {
  async saveOne(payload: Partial<ICategory>): Promise<ICategory> {
    const newId = CATEGORY_MOCK.length + 1;

    CATEGORY_MOCK.push({
      id: newId,
      name: payload.name,
      percentage: payload.percentage,
      products: payload.products,
    });

    const categoryInserted = CATEGORY_MOCK[CATEGORY_MOCK.length - 1];

    return Promise.resolve(categoryInserted);
  }

  async findOne(payload: Partial<ICategory>): Promise<ICategory | null> {
    const result = CATEGORY_MOCK.find(
      (userMock) =>
        userMock.id === payload?.id || userMock.name === payload?.name,
    );

    return result;
  }

  async find(): Promise<ICategory[]> {
    return Promise.resolve(CATEGORY_MOCK);
  }

  async updateOne(params: {
    id: number;
    payload: Partial<ICategory>;
  }): Promise<boolean> {
    const { id: categoryId, payload } = params;

    CATEGORY_MOCK.forEach((categoryMock) => {
      if (categoryMock.id === categoryId) {
        categoryMock.name = payload.name;
        categoryMock.percentage = !!payload.percentage
          ? payload.percentage
          : categoryMock.percentage;
      }
    });

    return Promise.resolve(true);
  }

  async deleteOne(id: number): Promise<boolean> {
    const index = CATEGORY_MOCK.findIndex(
      (categoryMock) => categoryMock.id === id,
    );

    if (index !== -1) {
      CATEGORY_MOCK.splice(index, 1);

      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }
}
