"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/utils/schema";
import Link from "next/link";
import React from "react";

type LoginInput = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/space");
    } else {
      console.log(res);
      alert(res?.error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full items-center"
      >
        <input placeholder="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          placeholder="password"
          type="password"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <button type="submit">로그인</button>
      </form>
      <Link href={"/signup"}>회원가입</Link>
    </div>
  );
}
