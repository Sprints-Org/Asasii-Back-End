import {IUser} from "./IUser";

export interface IShipping extends IUser{
    phone_number: string;
    address: string;
    city: string;
    country: string;
    zip_code: number;
}