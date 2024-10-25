import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

interface RegisterBody {
    name: string;
    email: string;
    password: string;
}

export const registerUser = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente.', user: newUser });
    } catch (error: any) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const getUserById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);

    } catch (error: any) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const updateUser = async (req: Request<{ id: string }, {}, RegisterBody>, res: Response) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.name = name;
        user.email = email;
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: 'Usuario actualizado exitosamente', user });
    } catch (error: any) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await user.remove();

        res.status(200).json({
            message: 'Usuario eliminado exitosamente', user
        });

    } catch (error: any) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};