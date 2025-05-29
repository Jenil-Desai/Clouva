import RegisterForm from "@/components/section/register/RegisterForm"
import { Cloud } from "lucide-react"
import Link from "next/link"


export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={"flex flex-col gap-6"}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <Link
                href="/"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md">
                  <Cloud className="size-6" />
                </div>
                <span className="sr-only">Clouva</span>
              </Link>
              <h1 className="text-xl font-bold">Welcome back to Clouva</h1>
              <div className="text-center text-sm">
                Already have an account?
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <RegisterForm />
            </div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
          </div>
        </div >
      </div >
    </div >
  )
}
