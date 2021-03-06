import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { Session } from './Session'

@Entity()
export class Log extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("float")
    temperature: number;

    @Column("float")
    humidity: number;

    @Column()
    switch: boolean;

    @Column()
    set_point: number;

    @Column()
    set_point_tolerence: number;

    @ManyToOne(() => Session, session => session.logs)
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