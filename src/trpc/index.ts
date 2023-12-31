import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';


// this will hold the api logic
export const appRouter = router({
    // define api endpoints
    test: publicProcedure.query(() => {
        // [demo] the usual next.js api responses:
        // return new Response('OK')
        // return new Response(JSON.stringify(""))
        return 'hello'  // tRPC enables this
    }),

    // api endpoint to check if the logged user is in the apps database
    authCallback: publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession()
        const user = await getUser()

        if (!user?.id || !user.email)
            throw new TRPCError({ code: 'UNAUTHORIZED' })

        // using prisma and planetscale to check if the user
        // is in the database
        const dbUser = await db.user.findFirst({
            where: {
                id: user.id,
                email: user.email
            }
        })

        return { success: true }
    })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;