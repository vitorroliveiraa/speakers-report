import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean
    errorMessage?: string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError,errorMessage , ...props}, ref) => {
    return (
      <>
      <input
        type={type}
        className={hasError? cn(
          "flex h-10 w-full rounded-md border border-red-500 bg-white px-3 py-2 text-sm ring-offset-red-500 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-red-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className
        ): cn(
          "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className
        )}
        ref={ref}
        {...props}
      />
      {errorMessage && <span className="">{errorMessage}</span>}
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }
