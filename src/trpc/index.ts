import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/dist/types/server';
import { publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';


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
    authCallback: publicProcedure.query( async () =>  {
        const { getUser } = getKindeServerSession()
        const user = await getUser()

        if (!user?.id || !user.email)
            throw new TRPCError({ code: 'UNAUTHORIZED'})

        // [todo] check if the user is in the database

        return { success: true }
    })
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;