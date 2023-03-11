import {MongoDB} from "../Database";

export interface IDb {
    connect: MongoDB;
}