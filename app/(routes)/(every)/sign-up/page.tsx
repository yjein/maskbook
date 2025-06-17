"use client";

import Frame from "@/app/_components/frame";
import useMutation from "@/lib/client/use-mutation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}
interface SignUpResponse {
  ok: boolean;
}

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({ mode: "onChange" });

  const watchedPassword = watch("password"); // 변하는 값을 추적할 수 있음

  const onValid = (data: SignUpForm) => {
    callSignUp({ email: data.email, password: data.password });
    router.replace("/"); // history에 안 남음
    // router.push("/") // history에 남음
  };
  const [callSignUp, { loading, data, error }] =
    useMutation<SignUpResponse>("/api/user/sign-up");

  return (
    <Frame>
      <Main>
        {/* 값이 유효할 때 확인하기 위함 */}
        <FormContainer onSubmit={handleSubmit(onValid)}>
          <FormTitle>
            New <br /> Account
          </FormTitle>
          <Label>Email Address</Label>
          <Input
            type="email"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "올바른 이메일 형식이 아닙니다.",
              },
            })}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          <Label>Password</Label>
          <Input
            type="password"
            {...register("password", {
              required: "비밀번호는 필수입니다.",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다.",
              },
            })}
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

          <Label>Confirm Password</Label>
          <Input
            type="password"
            {...register("confirmPassword", {
              required: "비밀번호는 재확인이 필요합니다.",
              validate: (value: string) =>
                watchedPassword === value || "비밀번호가 일치하지 않습니다.",
            })}
          />
          {errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword.message}</ErrorText>
          )}

          <AgreementText>
            가입 시 <Link href={"/"}>이용약관</Link> 및 정보제공에 동의하게
            됩니다.
          </AgreementText>
          <SubmitBtn>Sign Up</SubmitBtn>
        </FormContainer>
      </Main>
    </Frame>
  );
}

const Main = styled.main`
  flex: 1;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #f1cfdc;
`;

const FormTitle = styled.div``;

const ErrorText = styled.div``;

const Label = styled.label``;

const Input = styled.input``;

const AgreementText = styled.div``;

const SubmitBtn = styled.button``;
