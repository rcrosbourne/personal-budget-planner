import { getCsrfToken, getSession, signIn } from "next-auth/react";
import type { CtxOrReq } from "next-auth/client/_utils";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { z } from "zod";
import MainWrapper from "../../components/MainWrapper";
import Link from "next/link";
import Head from "next/head";
import GuestLayout from "../../components/GuestLayout";

const signInSchema = z.object({
  email: z.string().email({ message: "Email address is required" }),
  password: z.string().min(6, { message: "Password is required" }),
});
export default function Signin({ csrfToken }: { csrfToken: string }) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const onSubmit = async (data: FieldValues) => {
    // sign in user
    setIsSubmitting(true);
    const status = await signIn("credentials", {
      email: data.email as string,
      password: data.password as string,
      redirect: false,
    });
    if (status && !status.ok && status.error) {
      setError("email", { type: "manual", message: status.error });
      setIsSubmitting(false);
      return;
    }
  };
  return (
    <GuestLayout>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainWrapper>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-gray-900 mt-6 text-center font-cursive text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-neutral-50 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <TextInput
                label={"Email"}
                hasErrors={!!errors.email}
                errorMessage={errors?.email?.message?.toString()}
                {...register("email")}
              />
              <TextInput
                label={"Password"}
                type="password"
                hasErrors={!!errors.password}
                errorMessage={errors?.password?.message?.toString()}
                {...register("password")}
              />
              <Button type="submit" text="Sign In" isDisabled={isSubmitting} />
            </form>
            <Link
              href="/register"
              className="text-md mt-1 inline-block font-medium text-secondary-blue-900 hover:text-secondary-blue-700 hover:underline"
            >
              Click here to register
            </Link>
          </div>
        </div>
      </MainWrapper>
    </GuestLayout>
  );
}

export async function getServerSideProps(context: CtxOrReq) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
