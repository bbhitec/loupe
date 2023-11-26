"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client"
import { Loader2 } from "lucide-react"

const Page = () => {
    // sync logged in user
    const router = useRouter()

    // note where the user is coming from
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    // [demo] tRPC request will provide type safety and loading state
    // const { data, isLoading } = trpc.test.useQuery()
    // [todo] onSuccess/onError is deprecated?
    //
    // [demo] we dont name this function since it runs of page load
    //       i.e. no use of:  const { data, isLoading } =
    trpc.authCallback.useQuery(undefined, {
        onSuccess: ({ success }) => {
            if (success) {
                // user is synced - send to original destination or to dashboard
                router.push(origin ? `/${origin}` : '/dashboard')
            }
        },
        onError: (err) => {
            // reroute to login page
            if (err.data?.code === 'UNAUTHORIZED') {
                router.push('/sign-in')
            }
        },
        // re-check the next half a second
        retry: true,
        retryDelay: 500
    })

    // return a loading animation
    return (
        <div className='w-full mt-24 flex justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                <h3>
                    Let us take you to your account right away {')'} ...
                </h3>
                <p>We'll redirect you in a moment.</p>
            </div>
        </div>
    )
}

export default Page