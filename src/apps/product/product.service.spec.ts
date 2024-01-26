import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository } from './gateways/databases/implementations/product.repository';
import { MockProductRepository } from './gateways/databases/__mocks__/mock-product.repository';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/gateways/database/implementations/category.repository';
import { MockCategoryRepository } from '../category/gateways/database/__mocks__/mock-category.repository';
import { IProduct } from './gateways/databases/Iproduct.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let service: ProductService;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: CategoryRepository, useClass: MockCategoryRepository },
        CategoryService,
        { provide: ProductRepository, useClass: MockProductRepository },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepository = module.get<ProductRepository>(ProductRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new Product', async () => {
    const newProduct = {
      name: 'Broom',
      description: 'Broom to Clean',
      value: 30,
      categoryName: 'Home',
    };

    const newCategoryCreated = await service.create({
      name: newProduct.name,
      description: newProduct.description,
      value: newProduct.value,
      categoryName: newProduct.categoryName,
    });

    expect(newCategoryCreated.name).toEqual('Broom');
    expect(newCategoryCreated.category.name).toEqual('Home');
  });

  it('should not create a new Product, because any Category could be found', async () => {
    const newProduct = {
      name: 'Broom',
      description: 'Broom to Clean',
      value: 30,
      categoryName: 'Yard',
    };

    await expect(
      service.create({
        name: newProduct.name,
        description: newProduct.description,
        value: newProduct.value,
        categoryName: newProduct.categoryName,
      }),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return all Products', async () => {
    const allCategorys = await service.listAll();

    const lastCategory = allCategorys[allCategorys.length - 1];

    expect(lastCategory.name).toBe('Broom');
    expect(allCategorys.length).toBeGreaterThan(0);
  });

  it('should not return all Products, because any category could be found', async () => {
    jest.spyOn(productRepository, 'find').mockImplementation(async () => []);

    await expect(service.listAll()).rejects.toThrowError(NotFoundException);
  });

  it('should return a Product', async () => {
    const categoryFound = await service.listOne(1);

    expect(categoryFound).toHaveProperty('name');
    expect(categoryFound.name).toBe('PlayStation');
    expect(categoryFound.value).toBeGreaterThan(0);
  });

  it('should not return a Product, because any Product with the requested id could be found', async () => {
    await expect(service.listOne(100)).rejects.toThrowError(NotFoundException);
  });

  it('should edit a Product', async () => {
    const editId = 2;
    const editPayload: Partial<IProduct> = {
      name: 'Squeegee',
      description: 'Squeegee to clean',
      value: 60,
    };

    await service.editOne({
      id: editId,
      payload: {
        name: editPayload.name,
        description: editPayload.description,
        value: editPayload.value,
      },
    });

    const categoryFound = await service.listOne(editId);

    expect(categoryFound.name).toBe('Squeegee');
    expect(categoryFound.value).toBeGreaterThan(0);
    expect(categoryFound.value).toBe(60);
  });

  it('should not edit a Product, because any Product with the requested id could be found', async () => {
    const editId = 100;
    const editPayload: Partial<IProduct> = {
      name: 'Squeegee',
      description: 'Squeegee to clean',
      value: 60,
    };

    await expect(
      service.editOne({
        id: editId,
        payload: {
          name: editPayload.name,
          description: editPayload.description,
          value: editPayload.value,
        },
      }),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should delete a Product', async () => {
    const deleteId = 2;

    await service.deleteOne(deleteId);

    await expect(service.listOne(deleteId)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should not delete a Product, because any Product with the requested id could be found', async () => {
    const deleteId = 2;

    await expect(service.deleteOne(deleteId)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should simulate an Installments', async () => {
    const simulateId = 1;
    const totalInstallments = 3;

    const installmentsSimulated = await service.simulateInstallments({
      id: simulateId,
      queryParams: { totalInstallments: totalInstallments },
    });

    expect(installmentsSimulated.name).toBe('PlayStation');
    expect(installmentsSimulated.value).toBeGreaterThan(0);
    expect(installmentsSimulated.valueOfInstallments).toEqual(1142.86);
    expect(installmentsSimulated.totalInstallments).toEqual(3);
  });

  it('should not simulate an Installments, because any Product with the requested id could be found', async () => {
    const simulateId = 100;
    const totalInstallments = 3;

    await expect(
      service.simulateInstallments({
        id: simulateId,
        queryParams: { totalInstallments: totalInstallments },
      }),
    ).rejects.toThrowError(NotFoundException);
  });
});
