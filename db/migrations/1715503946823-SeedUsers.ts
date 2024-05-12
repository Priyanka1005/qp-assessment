import { User, UserRole } from "src/auth/entities/user.entity";
import { EntityManager, MigrationInterface, QueryRunner, getManager } from "typeorm";
import * as bcrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";

export class SeedUsers1715503946823 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.manager.getRepository(User);

        // Hash password using bcrypt
        const hashedPassword = await bcrypt.hash('password', 10);
        const adminUser = new User();
        adminUser.name = 'Admin';
        adminUser.phone = '1234567890';
        adminUser.email = 'admin@example.com';
        adminUser.password = hashedPassword;
        adminUser.role = UserRole.ADMIN;
        adminUser.address = 'Admin Address';
    
        const userUser = new User();
        userUser.name = 'User';
        userUser.phone = '0987654321';
        userUser.email = 'user@example.com';
        userUser.password = hashedPassword;
        userUser.role = UserRole.USER;
        userUser.address = 'User Address';
        // Save the new entities to the database
        await userRepository.save([adminUser, userUser]);

      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const userRepository = queryRunner.manager.getRepository(User);
        await userRepository.delete({ email: 'admin@example.com' });
        await userRepository.delete({ email: 'user@example.com' });
      }

}
