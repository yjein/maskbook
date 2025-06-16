"use client";
import styled from "styled-components";
import Image from "next/image";
import MaskLogo from "@/src/maskbookLogo.png";
import SIcon from "@/src/searchIcon.png";
import useSWR from "swr";
import { Post } from "@/lib/generated/prisma";
import { Spinner } from "@/app/_components/loading-spinner";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface PostResponse {
  ok: boolean;
  postList: Post[];
}

export default function Home() {
  const { data, error, isLoading } = useSWR<PostResponse>("/api/post");

  return (
    <Wrap>
      <TopBar>
        <Logo src={MaskLogo} width={50} height={50} alt="Logo"></Logo>
        <SignIn>Sign In</SignIn>
      </TopBar>
      <Main>
        <SearchBox>
          <SearchIcon
            src={SIcon}
            width={50}
            height={50}
            alt="SearchIcon"
          ></SearchIcon>
          <SearchInput placeholder="키워드로 검색하세요."></SearchInput>
        </SearchBox>
        <LeftPanel>
          <PopularArea>
            <PopularHeading>Popular Posts</PopularHeading>
            <PopularList>
              {isLoading && (
                <SpinnerWrapper>
                  <Spinner />
                </SpinnerWrapper>
              )}
              {!isLoading &&
                !error &&
                data?.postList.map(({ id, title, createAt, updateAt }) => (
                  <SLink href={`post/${id}`} key={id}>
                    <ListRow>
                      <ListTitle>{title}</ListTitle>
                      <span>{formatDate(createAt)}</span>
                    </ListRow>
                  </SLink>
                ))}
            </PopularList>
          </PopularArea>
        </LeftPanel>
        <RightPanel></RightPanel>
      </Main>
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

const SearchBox = styled.form`
  grid-column: 1/3;
  justify-self: center;
  width: 60%;
  height: 2rem;
  background-color: #ffffff;
  border: 2px solid black;
  border-radius: 30px;
  /* margin-top: 7rem; */
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(Image)`
  margin: 1rem;
`;

const SearchInput = styled.input`
  margin-right: 1rem;
  width: 100%;
  border: none;
  background: none;

  &:focus {
    border: none;
  }
`;

const LeftPanel = styled.div``;

const PopularArea = styled.div``;

const PopularHeading = styled.h1``;

const PopularList = styled.li``;

const ListRow = styled.li``;

const ListTitle = styled.li``;

const SpinnerWrapper = styled.li`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const RightPanel = styled.div``;

const SLink = styled(Link)`
  text-decoration: none;
`;
