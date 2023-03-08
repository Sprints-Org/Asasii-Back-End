import {JwtPayload} from "jsonwebtoken";

export interface IToken extends JwtPayload {
    user_id: string;
}