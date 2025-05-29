"use client";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schema/loginSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import loginAction from "./loginAction"

export default function LoginForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  async function onSubmit(data: { email: string; password: string }) {
    const response = await loginAction(data);
    if (response.success) {
      toast.success("Login successful!");
      router.push("/transfer");
    } else {
      toast.error(response.error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={form.formState.isSubmitting} type="submit">Login</Button>
        </div>
      </form>
    </Form>
  )
}
