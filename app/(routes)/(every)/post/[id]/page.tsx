"use client";
import styled from "styled-components";
import Image from "next/image";
import MaskLogo from "../../../../../src/maskbookLogo.png";
import useSWR from "swr";
import { Post } from "@/lib/generated/prisma";
import { Spinner } from "@/app/_components/loading-spinner";
import { formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";

interface PostResponse {
  ok: boolean;
  postList: Post[];
}

export default function PostDetail() {
  const params = useParams();
  const id = Number(params.id);

  return (
    <Wrap>
      <TopBar>
        <Logo src={MaskLogo} width={50} height={50} alt="Logo"></Logo>
        <SignIn>Sign In</SignIn>
      </TopBar>
      <Main>{id}</Main>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`;

const TopBar = styled.header`
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 2rem;
  background-color: #670d2f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  z-index: 10;
`;

const Logo = styled(Image)``;

const SignIn = styled.button`
  background-color: #ef88ad;
  color: #3a0519;
  font-size: 1rem;
  width: 6rem;
  height: 2rem;
  border-radius: 30px;
  border: 0;
`;

const Main = styled.main`
  flex-grow: 1;
  width: 100%;
  height: calc(100% - 3rem);

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 3fr;
  gap: 1rem;
`;
