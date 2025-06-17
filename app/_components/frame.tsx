"use client";
import MaskLogo from "@/src/maskbookLogo.png";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

interface FrameProps {
  children: React.ReactNode;
}

export default function Frame({ children }: FrameProps) {
  return (
    <Wrap>
      <TopBar>
        <Link href={"/"}>
          <Logo src={MaskLogo} width={50} height={50} alt="Logo"></Logo>
        </Link>
        <SignIn>Sign In</SignIn>
      </TopBar>
      {children}
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: 0;
  overflow-x: hidden;
`;

const TopBar = styled.header`
  flex: 0 0 4rem;
  /* position: fixed;
  top: 0;
  left: 0; */
  width: 100%;
  background-color: #670d2f;
  padding: 1rem 2rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  z-index: 10;
`;

const Logo = styled(Image)`
  cursor: pointer;
`;

const SignIn = styled.button`
  background-color: #ef88ad;
  color: #3a0519;
  font-size: 1rem;
  font-weight: 600;
  width: 6rem;
  height: 2rem;
  border-radius: 30px;
  border: 0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f7a3c0;
    transform: scale(1.02);
  }
`;
