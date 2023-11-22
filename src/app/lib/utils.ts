import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    // twmerge helps remove redundant style directives
    return twMerge(clsx(inputs))
}