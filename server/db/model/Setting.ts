import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Setting extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    set_point: number;

    @Column()
    set_point_tolerance: number;


    static getLatestSetting() {
        const setting = this.createQueryBuilder("setting")
            .orderBy("session.id", "DESC")
            .getOne();

        if (!setting) {
            return Setting.getDefault();
        }

        return setting;
    }

    static getDefault() {
        return {
            id: 1,
            set_point: 25,
            set_point_tolerance: 1,
        };
    }
}