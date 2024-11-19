
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
    },

    sort: async () => {
        try {
            return await prisma.user.findMany({
                orderBy:{
                    credit: 'desc'
                }
            })
        } catch (error) {
            return error
        }
    },
    filter: async () => {
        try {
            return await prisma.user.findMany({
                where: {
                    level:"admin"
                }
            })
        } catch (error) {
            return error
        }
    }, 
    moreThan: async () =>{
        try {
            return await prisma.user.findMany({
                where: {
                    credit: {
                        gt: 100
                    }
                }
            })
        } catch (error) {
            return error
        }
    },
    lessThan: async () => {
        try {
            return await prisma.user.findMany({
                where: {
                    credit: {
                        lt: 100
                    }
                }
            })
        } catch (error) {
            return error
        }
    },
    notEqual: async () => {
        return await prisma.user.findMany({
            where: {
                credit: {
                    not: 100
                }
            }
        })
    },

    in: async () => {
        return await prisma.user.findMany({
            where:{credit: {in: [100, 200]}}
        })
    },
    isNull: async () => {
        return await prisma.user.findMany({
            where: {
                credit:{
                    equals: null
                }
            }
        })
    },
    isNotNull: async () => {
        return await prisma.user.findMany({
            where: {
                credit:{
                    not: null
                }
            }
        })
    },
    between: async () => {
        return await prisma.user.findMany({
            where: {
                credit: {
                    gte: 100,
                    lte: 200
                }
            }
        })
    }
}