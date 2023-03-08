import {Request, Response} from "express";
import {ObjectId} from "mongodb";
import {IProduct, IUser} from "../Interface";
import {ProductService} from "../Service/ProductService";
import {UserModel} from "../Model";
import {UserService} from "../Service";
import {IRequest} from "../Interface/IRequest";


export class UserController {

    async users(req: IRequest, res: Response): Promise<Response> {
        await new UserService().getUser(req.headers.authorization!);
        return res.json(await new UserService().getAllUsers());
    }

    async updateUser(req: IRequest, res: Response): Promise<Response> {
        const {id} = req.params;
        const user: IUser = {
            _id: req.user?._id!,
            admin: req.user?.admin!,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: ""
        }
        const updateUser = new UserService().updateUser(new ObjectId(id), user);
        return res.json({x:updateUser});
    }


}
