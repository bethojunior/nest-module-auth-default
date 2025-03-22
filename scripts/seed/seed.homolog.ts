import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const enterprise = await prisma.enterprise.upsert({
    where: { email: 'contato@madgic.com' },
    update: {},
    create: {
      name: 'Madgic Enterprise',
      email: 'contato@madgic.com',
      cnpj: '12345678000199',
    },
  });

  const hashedPassword = await bcrypt.hash('123456', 10);

  await prisma.user.upsert({
    where: { email: 'jhon@doe.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@doe.com',
      password: hashedPassword,
      role: 'ENTERPRISE',
      isActive: true,
      enterpriseId: enterprise.id,
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
