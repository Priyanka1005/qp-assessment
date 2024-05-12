import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrderTable1715516212023 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'orders',
            columns: [
              { name: 'id', type: 'bigint', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
              { name: 'product_id', type: 'bigint' },
              { name: 'description', type: 'varchar' },
              { name: 'delivery', type: 'varchar' },
              { name: 'quantity', type: 'int' },
              { name: 'price', type: 'decimal', precision: 10, scale: 2 },
              { name: 'total_price', type: 'decimal', precision: 10, scale: 2 },
              { name: 'user_id', type: 'bigint' },
              { name: 'delivery_address', type: 'varchar' },
              { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
            ],
          }),
          true,
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders');
      }
}
