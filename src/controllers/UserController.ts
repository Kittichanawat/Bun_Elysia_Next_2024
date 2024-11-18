
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UserController = {
    list: async () => {
        return await prisma.user.findMany();
    },
    create: async ({ body }: { 
        body: { 
            email: string; 
            password: string; 
        } 
    }) => {
        try {
            await prisma.user.create({
                data:body
            })

            return {message: 'User created'}
        } catch (error) {
            return error
        }
    },
    update: async ({ body, params }: { 
        body: { 
            name: string; 
            email: string; 
        }, 
        params: { 
            id: number; 
        }
    }) => {
        try {
            await prisma.user.update({
                where: {id:parseInt(params.id) },
                data: body
            })
            return {message: 'User updated'}
        } catch (error) {
            return error
        }
    },
    remove: async ({ params }: { 
        params: { 
            id: string; 
        } 
    }) => {
        try {
            await prisma.user.delete({
                where: {id:parseInt(params.id) }
            })
            return {message: 'User deleted'}
        } catch (error) {
            return error
        }
    },
    findSomeField: async () => {
        try {
            const users = await prisma.user.findMany({
                select: {
                    level: true,
                    credit: true,
                    id: true
                }
            })
            return users
        } catch (error) {
            return error
        }
    }
}