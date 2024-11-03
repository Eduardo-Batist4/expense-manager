import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateUser = [
    body('name').notEmpty().withMessage('The Name is required!'),
    body('email')
        .notEmpty().withMessage('The Email is required!')
        .isEmail().withMessage('The Invalid Email!'),
    body('password')
        .notEmpty().withMessage('The Password is required!')
        .isLength({ min: 6 }).withMessage('The Password must be at 6 characters!'),
    body('confirmPassword')
        .notEmpty().withMessage('The ConfirmPassword is required!')
        .custom((value, { req }) => {
            if(value !== req.body.password) {
              throw new Error("The Passwords don't match!");  
            };
            return true;
        }),
];

export const handleValidateErros = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
        return; 
    };
    next();
};