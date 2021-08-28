import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Log } from './Log'

export enum StatusType {
    STARTED = 'started',
    PAUSED = 'paused',
    FINISHED = 'finished'
}

@Entity()
export class Session extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: StatusType,
        default: StatusType.STARTED
    })
    status: StatusType

    @OneToMany(() => Log, log => log.session)
    logs: Log[];

    static getLogs(id: number) {
        let session = this.createQueryBuilder("session")
            .where("session.id = :id ", { id: id })

            .getOne();

        return session
    }

    static sessionById(id: number) {
        let session = this.createQueryBuilder("session")
            .where("session.id = :id ", { id: id })
            .getOne();

        if (!session) {
            session = this.createQueryBuilder("session")
                .orderBy("session.id", "DESC")
                .getOne();
        }

        return session;
    }

    static currentSession() {
        let session = this.createQueryBuilder("session")
            .where("session.status IN (:...status)", { status: ["started", "paused"] })
            .orderBy("session.id", "DESC")
            .leftJoinAndSelect("session.logs", "log")
            .getOne();

        if (!session) {
            session = this.createQueryBuilder("session")
                .orderBy("session.id", "DESC")
                .leftJoinAndSelect("session.logs", "log")
                .getOne();
        }

        return session;
    }
}