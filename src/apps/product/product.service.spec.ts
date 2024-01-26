import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository } from './gateways/databases/implementations/product.repository';
import { MockProductRepository } from './gateways/databases/__mocks__/mock-product.repository';
import { CategoryService } from '../category/category.service';
import { CategoryRepository } from '../category/gateways/database/implementations/category.repository';
import { MockCategoryRepository } from '../category/gateways/database/__mocks__/mock-category.repository';

describe('ProductService', () => {
  let service: ProductService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
