import { AppRouter } from "@/trpc"
import { createTRPCReact } from "@trpc/react-query"

// allow type reporting with tRPC router
export const trpc = createTRPCReact<AppRouter>({})