import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({ order: [["price", "DESC"]] });
    res.status(200).json({ data: products });
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;
    const product = await Product.findByPk(+id);

    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });

    res.status(200).json({ data: product });
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;
    const product = await Product.findByPk(+id);

    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });

    await product.update(req.body);

    res.status(200).json({ data: product });
  } catch (error) {
    console.error(error);
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;
    const product = await Product.findByPk(+id);

    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });

    product.availability = !product.dataValues.availability;
    await product.save();

    res.status(200).json({ data: product });
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;
    const product = await Product.findByPk(+id);

    if (!product)
      return res.status(404).json({ error: "Producto no encontrado" });

    await product.destroy();

    res.status(204).json();
  } catch (error) {
    console.error(error);
  }
};
