import express, { Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@apsc_/common';
import { User } from '../models/user';

const router = express.Router();

router.post(
    '/api/users/signup', 
    [
        body('email')
            .isEmail()
            .withMessage('Provide a valid email address'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20})
            .withMessage('Password must be between 4 and 20 characters'),
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
        
    const { email, password } = req.body;

    const exisitingUser = await User.findOne({ email });
    
    if (exisitingUser){
        throw new BadRequestError('Email already in use');
    }

    const user = User.build({ email, password });
    await user.save() ; // persist the user to mongoDB

    //generate a jwt

    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_KEY!
    );

    // store it on the session object
    req.session={
        jwt: userJwt
    };

    res.status(201).send(user);
});

export { router as signupRouter }