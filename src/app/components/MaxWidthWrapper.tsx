import { ReactNode } from "react"
import { cn } from "../lib/utils"

const MaxWidthWrapper = ({
    // two arguments destructuring
    className,
    children,
} : {
    //
    className?: string  // typed but not mandatory (optional)
    children: ReactNode
}) => {
    return (
    // using utility twMerge to safely control multiple\redundant style commands
    // instead of:
    // <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
    <div className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}>
        {/* this div will wrap all the pages of the website */}
        {children}
    </div>
    )

}

export default MaxWidthWrapper