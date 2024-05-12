import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1715497426690 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "phone",
                    type: "varchar",
                    length: "20",
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "255",
                    isUnique: true,
                },  
                {
                    name: "password",
                    type: "varchar",
                    length: "255",
                },              
                {
                    name: "role",
                    type: "enum",
                    enum: ["admin", "user"],
                    default: "'user'",
                },
                {
                    name: "address",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP",
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
