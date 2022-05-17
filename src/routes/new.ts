import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@microservices-ecommerce/common';
import { body } from 'express-validator';
import { Product } from '../models/product';


const router = express.Router();

router.post('/api/products',
// requireAuth,
[
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0')
],
validateRequest,
async (req: Request, res: Response) => {
  const { title, price,userId } = req.body;
  const product = Product.build({
    title,
    price,
    userId
    // userId: req.currentUser!.id
  });
  await product.save();
  res.status(201).send(product);
}); 

export { router as createProductRouter };