import prisma from '../utils/prisma';

export const checkCoverage = async (postcode: string) => {
  const coverage = await prisma.coverage.findUnique({ where: { postcode } });
  if (!coverage) return { supported: false, expected_speed_mbps: 0, notes: 'Area not covered yet.' };
  return {
    supported: coverage.supported,
    expected_speed_mbps: coverage.expected_speed_mbps,
    city: coverage.city,
    notes: coverage.notes,
  };
};
