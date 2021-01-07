import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/Users';
/**
 *  Declarando um decorator.
 * Quando declaramos um decorator em cima de uma classe significa que estamos 
 * passando ela, a classe, como um parametro para a nossa entidade.
 * Decorators estão disponíveis apenas no typescript, não no javascript.
 * 
 * Quando utilizamos o typeorm e os decorators não é necessário mais utilizar o 
 * método constructor.
 * a bib uuid também não precisa mais ser importada porque o typeorm já faz isso.
 */

 /**
  * Tipos de relacionamentos:
  * 1 para 1 (OneToOne) -> Um usuário tem um agendamento
  * 1 para muitos (OneToMany) -> Um usuário tem muitos agendamentos
  * Muitos para muitos (ManyToMany) -> Se mais de um provider pudesse participar de um serviço
  * Muitos para um (ManyToOne) -> Muitos agendamentos para um usuário
  */

 @Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne( () => User )
  @JoinColumn({ name: 'provider_id' })
  provider: User;
  
  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;