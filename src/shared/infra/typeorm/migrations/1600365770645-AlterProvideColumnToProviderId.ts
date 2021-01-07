import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AlterProvideColumnToProviderId1600365770645 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');
        
        await queryRunner.addColumn('appointments', new TableColumn(
            {
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            },
        ));

        await queryRunner.createForeignKey('appointments', new TableForeignKey(
            {
                name: 'AppointmentProvider',
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider',
            type: 'varchar',
            isNullable: false,
        }));
    }

}

/**
 * CASCADE: Quando uma propriedade pode deixar de existir é preferível que ela possa
 * assumir valores nulos para não ter de deletar todas as ocorrencias da mesma no db 
 * */ 

