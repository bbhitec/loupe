import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"

const Page = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()    // getUser returns a promise

    // authenticate
    if (!user || !user.id) redirect('/auth-callback?origin=dashboard')

    // sync user to the app db (eventual consistency)




    return <div>{user.email}Cont</div>
}

export default Page