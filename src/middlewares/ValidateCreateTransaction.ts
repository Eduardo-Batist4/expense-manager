import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateTransaction = [
    body('userId').notEmpty().withMessage('UserId is rrequired!'),
    body('amount').notEmpty().withMessage('Amount is required!'),
    body('type').notEmpty().withMessage('Type is required!')
        .isIn(['entrada', 'saida']).withMessage("The type input must be 'entrada' or 'saida'."),
    body('category').notEmpty().withMessage('Category is required!')
        .isIn(['alimentação', 'transporte', 'saude', 'educação', 'outros']).withMessage("The category input must be 'alimentação', 'transporte', 'saude', 'educação' or 'outros'")
];

export const handleValidateErros = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return;
    };
    next();
};