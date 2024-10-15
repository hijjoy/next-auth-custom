"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axiosClient } from "@/libs/axiosInstance";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signUpSchema } from "@/utils/schema";

type SignUpInput = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpInput) => {
    try {
      const res = await axiosClient.post("/api/v1/auth/join", {
        name: data.name,
        email: data.email,
        password: data.password,
        socialType: "LOCAL",
        globalRole: "ROLE_USER",
        privacyPolicyAllowed: data.privacyPolicyAllowed,
        termsOfServiceAllowed: data.termsOfServiceAllowed,
      });
      console.log(res);

      if (res.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error))
        alert(error?.response?.data?.result?.joinRequest);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full h-screen items-center gap-1"
      >
        <input placeholder="이름" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}

        <input placeholder="이메일" type="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          placeholder="비밀번호"
          type="password"
          {...register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <label>
          <input
            type="checkbox"
            value="AGREE"
            {...register("privacyPolicyAllowed")}
          />
          개인정보 처리 방침 동의
        </label>
        {errors.privacyPolicyAllowed && (
          <span>{errors.privacyPolicyAllowed.message}</span>
        )}

        <label>
          <input
            type="checkbox"
            value="AGREE"
            {...register("termsOfServiceAllowed")}
          />
          서비스 약관 동의
        </label>
        {errors.termsOfServiceAllowed && (
          <span>{errors.termsOfServiceAllowed.message}</span>
        )}

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
