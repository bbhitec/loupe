"use client"
// this directive will force this component to be rendered client-side

import { PropsWithChildren, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { trpc } from "../_trpc/client"
import { httpBatchLink } from "@trpc/client"

// PropsWithChildren will preserve types
const Providers = ({ children }: PropsWithChildren) => {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: 'http://localhost:3000/api/trpc'
            })
        ]
    })
    )

    return (
        <trpc.Provider
            client={trpcClient}
            queryClient={queryClient}>
            {/* use this wrap to use ReactQuery independently from trpc */}
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}

export default Providers