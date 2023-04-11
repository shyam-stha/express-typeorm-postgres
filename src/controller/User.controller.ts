import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await AppDataSource.getRepository(User).find()
        return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}


export const getUsersById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await AppDataSource.getRepository(User).findOneBy({ id: parseInt(req?.params?.id) })
        return res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //check if email already exits
        const userWithEmail = await AppDataSource.getRepository(User).findBy({ email: req?.body?.email })
        if (userWithEmail?.length) {
            return res.send("email already exits")
        }

        const user = AppDataSource.getRepository(User).create(req.body)
        const response = await AppDataSource.getRepository(User).save(user)
        return res.status(201).send("user created successfully..!")
    } catch (error) {
        next(error)
    }
}


export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //check if user exits or not
        const user = await AppDataSource.getRepository(User).findOneBy({ id: parseInt(req?.params?.id) })
        if (!user) {
            return res.status(401).send("user not found")
        }

        AppDataSource.getRepository(User).merge(user, req.body)
        const response = await AppDataSource.getRepository(User).save(user)

        return res.status(200).send("user updated successfully..!")
    } catch (error) {
        next(error)
    }
}

export const removeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //check if user exits or not
        const user = await AppDataSource.getRepository(User).findOneBy({ id: parseInt(req?.params?.id) })
        if (!user) {
            return res.status(401).send("user not found")
        }

        const response = await AppDataSource.getRepository(User).delete(parseInt(req?.params?.id))
        return res.status(200).send("user deleted successfully..!")
    } catch (error) {
        next(error)
    }
}