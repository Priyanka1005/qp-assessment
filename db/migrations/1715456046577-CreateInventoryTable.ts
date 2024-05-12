import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInventoryTable1715456046577 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:"inventories",
            columns:[
                {
                    name: 'id',
                    type: 'bigint',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'product_id',
                    type: 'bigint',
                    isNullable: false,
                },
                {
                    name: 'quantity',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                    isNullable: false,
                },
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('inventories');
    }

}
