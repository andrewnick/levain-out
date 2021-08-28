import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, Index, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Session } from './Session'

@Entity()
export class Log extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column("float")
    temperature: number;

    @Column("float")
    humidity: number;

    @Column()
    switch: boolean;

    @Column({ default: 28 })
    set_point: number;

    @Column({ default: 5 })
    set_point_tolerance: number;

    @Index()
    @ManyToOne(() => Session, session => session.logs, { eager: true })
    session: Session;

    static getLastLog() {
        const log = this.createQueryBuilder("log")
            .orderBy("log.id", "DESC")
            .getOne();

        if (!log) {
            return {
                id: 0,
                created_at: 0,
                temperature: 0,
                humidity: 0,
                set_point: 0,
                set_point_tolerance: 0,
            };
        }

        return log;
    }
}