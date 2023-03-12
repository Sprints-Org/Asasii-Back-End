import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { ICategory } from "../Interface";
import { CategoryService } from "../Service";

export class CategoryController {
  async add(req: Request, res: Response): Promise<Response> {
    //check if all filed is exists
    if (!req.body.name || !req.files) {
      return res.status(400).json({
        error: "missing requirements",
      });
    }
    //check if the category name is repeted
    const categories: ICategory[] =
      await new CategoryService().getAllCategory();
    if (categories.map((e) => e.name).indexOf(req.body.name) != -1) {
      return res.status(400).json({
        error: "category name alredy exist",
      });
    }

    //get the new path for the image
    const files: any = req.files;
    const file: any = files[0];

    //check the size of the image
    if (file.size > 1000000) {
      return res.status(400).json({
        error: "Image should be less than 1mb in size",
      });
    }
    const Category: ICategory = {
      _id: new ObjectId(),
      name: req.body.name,
      image: file.filename,
    };
    const data = await new CategoryService().createCategory(Category);
    return res.json(data);
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const data = await new CategoryService().getAllCategory();
    return res.json(data);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = await new CategoryService().getCategoryById(new ObjectId(id));
    return res.json(data);
  }

  async getCategoryProducts(req: Request, res: Response): Promise<Response> {
    const { Category_name } = req.params;
    const data = await new CategoryService().getCategoryProducts(Category_name);
    return res.json(data);
  }

  async edit(req: Request, res: Response): Promise<Response> {
    //check if all filed is exists
    if (!req.body.name || !req.files) {
      return res.status(400).json({
        error: "missing requirements",
      });
    }
    const { id } = req.params;
    //check if the category name is repeted
    const categories: ICategory[] =
      await new CategoryService().getAllCategory();
    const categoryToBeEdited: ICategory =
      await new CategoryService().getCategoryById(new ObjectId(id));
    console.log(categoryToBeEdited[0].name, req.body.name);

    if (
      categories.map((e) => e.name).indexOf(req.body.name) >= 0 &&
      categoryToBeEdited[0].name != req.body.name
    ) {
      return res.status(400).json({
        error: "category name alredy exist",
      });
    }
    //get the new path for the image
    const files: any = req.files;
    const file: any = files[0];

    //check the size of the image
    if (file.size > 1000000) {
      console.log(file.size);
      return res.status(400).json({
        error: "Image should be less than 1mb in size",
      });
    }

    const Category: ICategory = {
      _id: new ObjectId(id),
      name: req.body.name,
      image: file.filename,
    };
    const data = await new CategoryService().editCategory(
      new ObjectId(id),
      Category
    );

    return res.json(data);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = await new CategoryService().deleteCategory(new ObjectId(id));
    return res.json(data);
  }
}
