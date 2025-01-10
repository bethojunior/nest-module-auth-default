// import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaProvider extends PrismaClient implements OnModuleInit, OnModuleDestroy {
//   async onModuleInit() {
//     await this.$connect(); // Conecta ao banco de dados
//     console.log('Prisma conectado!');
//   }

//   async onModuleDestroy() {
//     await this.$disconnect(); // Desconecta ao encerrar o módulo
//     console.log('Prisma desconectado!');
//   }
// }
