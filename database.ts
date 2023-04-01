import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createUser(name: string, email: string) {
    try {
        const user = await prisma.user.create({
            data: { name, email },
        })
        await prisma.$disconnect()
        return user;
    } catch (error) {
        await prisma.$disconnect()
        console.error(error)
        process.exit(1)
    }
}

async function getUsers() {
    try {
        const users = await prisma.user.findMany()
        await prisma.$disconnect()
        return users;
    } catch (error) {
        await prisma.$disconnect()
        console.error(error)
    }

}

export const DB = {
    createUser,
    getUsers
};