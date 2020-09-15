import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

 @Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;
  
  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;