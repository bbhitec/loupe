import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client"

const Page = async () => {
    // sync logged in user
    const router = useRouter()

    // note where the user is coming from
    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    // [demo] tRPC request will provide type safety and loading state
    // const { data, isLoading } = trpc.test.useQuery()
    const { data, isLoading } = trpc.authCallback.useQuery(undefined, undefined)
    // [todo] is the query success handled properly? (onSucces is deprecated?)
    if (data?.success) {
        // user is synced - send to original destination or to dashboard
        router.push(origin ? `/${origin}` : '/dashboard')
    }


}

export default Page