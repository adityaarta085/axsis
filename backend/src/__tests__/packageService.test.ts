import * as packageService from '../services/packageService';
import prisma from '../utils/prisma';

jest.mock('../utils/prisma', () => ({
  package: { findMany: jest.fn(), findUnique: jest.fn() },
  __esModule: true,
  default: { package: { findMany: jest.fn(), findUnique: jest.fn() } },
}));

describe('Package Service', () => {
  it('should fetch all packages', async () => {
    (prisma.package.findMany as any).mockResolvedValue([{ id: '1', name: 'Pkg 1' }]);
    const result = await packageService.getAllPackages();
    expect(result).toHaveLength(1);
  });
});
