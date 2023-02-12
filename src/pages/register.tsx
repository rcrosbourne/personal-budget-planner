import type { CtxOrReq } from "next-auth/client/_utils";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { z } from "zod";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import TextInput from "../components/TextInput";
import Button from "../components/Button";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    passwordConfirm: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });
export default function Register({ csrfToken }: { csrfToken: string }) {
  // use create user mutation
  const session = useSession();
  const createUserMutation = api.user.register.useMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  useEffect(() => {
    if (session && session.data?.user) {
      void router.push("/");
    }
  }, [session, router]);
  const submitHandler = async (data: FieldValues) => {
    createUserMutation.mutate({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      email: data.email,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      password: data.password,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      name: data.name,
    });
    // // sign in user
    const status = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (status && !status.ok && status.error) {
      setError("email", { type: "manual", message: status.error });
    }
    if (status && status.ok && status.url) {
      await router.push(status.url);
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-col justify-center bg-neutral-100 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-neutral-900">
            Register
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full  sm:max-w-md">
          <div className="bg-neutral-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-2" onSubmit={handleSubmit(submitHandler)}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <TextInput
                label={"Name"}
                hasErrors={!!errors.name}
                errorMessage={errors?.name?.message?.toString()}
                {...register("name")}
              />
              <TextInput
                label={"Email"}
                hasErrors={!!errors.email}
                errorMessage={errors?.email?.message?.toString()}
                type="email"
                {...register("email")}
              />
              <TextInput
                label={"Password"}
                hasErrors={!!errors.password}
                errorMessage={errors?.password?.message?.toString()}
                type="password"
                {...register("password")}
              />
              <TextInput
                label={"Confirm Password"}
                hasErrors={!!errors.passwordConfirm}
                errorMessage={errors?.passwordConfirm?.message?.toString()}
                type="password"
                {...register("passwordConfirm")}
              />
              {createUserMutation.isError && (
                <p className="text-rose-600 mt-2 text-sm">
                  {createUserMutation.error.message}
                </p>
              )}
              <Button
                type="submit"
                text="Create Account"
                isDisabled={createUserMutation.isLoading}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: CtxOrReq) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
