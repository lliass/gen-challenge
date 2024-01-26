import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryRepository } from './gateways/database/implementations/category.repository';
import { MockCategoryRepository } from './gateways/database/__mocks__/mock-category.repository';
import { ICategory } from './gateways/database/Icategory.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: CategoryRepository, useClass: MockCategoryRepository },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new Category', async () => {
    const newCategory: Partial<ICategory> = {
      name: 'Garden',
      percentage: 3,
    };

    const newCategoryCreated = await service.create({
      name: newCategory.name,
      percentage: newCategory.percentage,
    });

    expect(newCategoryCreated.name).toEqual('Garden');
    expect(newCategoryCreated.percentage).toBeGreaterThan(0);
  });

  it('should not create a new Category, because the name already exist', async () => {
    const newUser: Partial<ICategory> = {
      name: 'Video Games',
      percentage: 3,
    };

    await expect(
      service.create({
        name: newUser.name,
        percentage: newUser.percentage,
      }),
    ).rejects.toThrowError(BadRequestException);
  });

  it('should return all Categorys', async () => {
    const allCategorys = await service.listAll();

    const lastCategory = allCategorys[allCategorys.length - 1];

    expect(lastCategory.name).toBe('Garden');
    expect(allCategorys.length).toBeGreaterThan(0);
  });

  it('should not return all Categorys, because any category could be found', async () => {
    jest.spyOn(categoryRepository, 'find').mockImplementation(async () => []);

    await expect(service.listAll()).rejects.toThrowError(NotFoundException);
  });

  it('should return a Category', async () => {
    const categoryFound = await service.listOne(1);

    expect(categoryFound).toHaveProperty('name');
    expect(categoryFound.percentage).toBeGreaterThan(0);
  });

  it('should not return a Category, because any Category with the requested id could be found', async () => {
    await expect(service.listOne(100)).rejects.toThrowError(NotFoundException);
  });

  it('should edit a Category', async () => {
    const editId = 3;
    const editPayload: Partial<ICategory> = {
      name: 'Backyard',
      percentage: 3,
    };

    await service.editOne({
      id: editId,
      payload: {
        name: editPayload.name,
        percentage: editPayload.percentage,
      },
    });

    const categoryFound = await service.listOne(editId);

    expect(categoryFound.name).toBe('Backyard');
    expect(categoryFound.percentage).toBeGreaterThan(0);
    expect(categoryFound.percentage).toBe(3);
  });

  it('should not edit a Category, because any Category with the requested id could be found', async () => {
    const editId = 100;
    const editPayload: Partial<ICategory> = {
      name: 'Backyard',
      percentage: 3,
    };

    await expect(
      service.editOne({
        id: editId,
        payload: { name: editPayload.name, percentage: editPayload.percentage },
      }),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should delete a Category', async () => {
    const deleteId = 3;

    await service.deleteOne(deleteId);

    await expect(service.listOne(deleteId)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should not delete a Category, because any Category with the requested id could be found', async () => {
    const deleteId = 3;

    await expect(service.deleteOne(deleteId)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should not delete a Category, because the Category has products', async () => {
    const deleteId = 1;

    await expect(service.deleteOne(deleteId)).rejects.toThrowError(
      BadRequestException,
    );
  });

  it('should return a Categorys by name', async () => {
    const categoryName = 'Video Games';

    const categorysFound = await service.findOneByName(categoryName);

    expect(categorysFound.name).toBe('Video Games');
    expect(categorysFound.percentage).toBeGreaterThan(0);
  });

  it('should not return a Categorys by name,  because any Category with the requested name could be found', async () => {
    const categoryName = 'Kitchen';

    await expect(service.findOneByName(categoryName)).rejects.toThrowError(
      NotFoundException,
    );
  });
});
