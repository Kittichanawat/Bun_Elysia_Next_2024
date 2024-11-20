const { PrismaClient } = require( '@prisma/client')
const prisma = new PrismaClient()

export const DepartmentController = {
    list: async () => {
        return await prisma.department.findMany({
            include: {
                users: true
            }
        })
    },
    usersInDepartment: async ({params}: {params: {id: string}}) => {
        try {
            const users = await prisma.department.findMany({
                where:{
                    id: parseInt(params.id)
                },
                include: {
                    users: {
                        select: {
                            id: true,
                            email: true,
                            level: true,
                            credit: true
                        },
                        where:{
                            level: 'user'
                        }
                    }
                    
                },
                orderBy: {
                    id:'asc'
                }
            })
            return {user: users}
        } catch (error) {
            return error
        }
    },

createDepartmentAndUsers: async ({body}: {
    body:{
        department: {
            name: string
        },
        users: {
            email: string,
            password: string
        }[]
    }
}) => {
    try {
        const department = await prisma.department.create({
            data:{
                name: body.department.name
            }
        }) 

        const users = await prisma.user.createMany({
            data: body.users.map((user) => ({
                email: user.email,
                password: user.password,
                departmentId: department.id
            }))
        })
        return {message: 'Creates successfully'}
    } catch (error) {
        return error
    }
},
countUsersInDepartment: async () => {
    try {
        const departments = await prisma.department.findMany ({
            select: {
                id: true,
                name: true,
                _count: {
                    select:{
                        users: true
                    }
                }
            }
        })
        return {departments: departments}
    } catch (error) {
        return error
    }
}
}