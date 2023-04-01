import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type PostType = {
    title: string;
    content: string;
    published?: boolean;
    authorId: number;
}

type UpdatePostType = {
    title?: string;
    content?: string;
    published?: boolean;
}

export const Post = {
    async index() {
        try {
            const posts = await prisma.post.findMany()
            await prisma.$disconnect()
            return posts;
        } catch (error) {
            console.error(error)
            process.exit(1)
        }
    },


    async show(id: number) {
        try {
            const post = await prisma.post.findUnique({
                where: { id },
            })
            await prisma.$disconnect()
            return post;

        } catch (error) {
            await prisma.$disconnect()
            console.error(error)
            process.exit(1)
        }
    },

    async store(post: PostType) {
        try {
            const new_post = await prisma.post.create({
                data: post,
            })

            await prisma.$disconnect()
            return new_post;
        } catch (error) {
            await prisma.$disconnect()
            console.error(error)
            process.exit(1)
        }
    },


    async update(post: UpdatePostType, id: number) {
        try {
            const post_updated = await prisma.post.update({
                where: { id },
                data: post,
            })

            console.log(post);
            
            await prisma.$disconnect()
            return post_updated;
        } catch (error) {
            await prisma.$disconnect()
            console.error(error)
            process.exit(1)
        }
    },


    async destroy(id: number) {
        try {
            const deleteUser = await prisma.post.delete({
                where: { id },
            })
            console.log(deleteUser);
            await prisma.$disconnect()
            return 1;

        } catch (error) {
            await prisma.$disconnect()
            console.error(error)
            process.exit(1)
        }
    },
}