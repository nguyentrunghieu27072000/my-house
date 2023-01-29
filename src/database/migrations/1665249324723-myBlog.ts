import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class myBlog1665249324723 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'userName',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'UserIp',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['ADMIN', 'MEMBER'],
            isNullable: true,
          },
          {
            name: 'moneyTotal',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'deposit',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'money',
            type: 'float',
            default: 0,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'shopping',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'price',
            type: 'float',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
    await queryRunner.dropTable('deposit');
    await queryRunner.dropTable('shopping');
  }
}
