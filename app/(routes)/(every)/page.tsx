"use client";
import styled from "styled-components";
import Image from "next/image";
import useSWR from "swr";
import { Post } from "@/lib/generated/prisma";
import { Spinner } from "@/app/_components/loading-spinner";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

import MaskLogo from "@/src/maskbookLogo.png";
import SIcon from "@/src/searchIcon.png";
import PIcon from "@/src/postIcon.png";
import AdImg from "@/src/ad.png";
import Frame from "@/app/_components/frame";

interface PostResponse {
  ok: boolean;
  postList: Post[];
}

export default function Home() {
  const { data, error, isLoading } = useSWR<PostResponse>("/api/post");

  return (
    <Frame>
      <Main>
        <SearchBox>
          <SearchIcon
            src={SIcon}
            width={20}
            height={20}
            alt="SearchIcon"
          ></SearchIcon>
          <SearchInput placeholder="키워드로 검색하세요."></SearchInput>
        </SearchBox>
        <LeftPanel>
          <PopularArea>
            <PopularHeading>
              <PostIcon src={PIcon} width={20} height={20} alt="postIcon" />
              <span>Popular Posts</span>
            </PopularHeading>
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
        <RightPanel>
          <AdBanner src={AdImg} width={0} height={300} alt="AdImg" />
        </RightPanel>
      </Main>
    </Frame>
  );
}

const Main = styled.main`
  flex: 1;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;

  display: grid;
  grid-template-areas:
    "search search"
    "left right";
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 2rem;
`;

const SearchBox = styled.form`
  grid-area: search;
  justify-self: center;
  margin: 1rem 0;
  width: 60%;
  height: 3rem;
  background-color: #ffffff;
  border: 2px solid #3a0519;
  border-radius: 30px;

  display: flex;
  align-items: center;
`;

const SearchIcon = styled(Image)`
  margin: 1rem;
  display: table;
`;

const SearchInput = styled.input`
  /* margin-right: 1rem; */
  padding: 0;
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  color: #3a0519;
  text-align: justify;

  &:focus {
    outline: none;
  }
`;

const LeftPanel = styled.div`
  grid-area: left;
`;

const PopularArea = styled.div``;

const PopularHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #3a0519;

  span {
    color: #3a0519;
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const PostIcon = styled(Image)``;

const PopularList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const ListRow = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListTitle = styled.span`
  flex: 1;
  color: #3a0519;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: #3a0519;
  display: block;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
  border-bottom: 2px solid #8c6372;

  &:hover {
    background-color: #fef2f5;
    transform: translateX(4px);
  }
`;

const RightPanel = styled.div`
  grid-area: right;
`;

const AdBanner = styled(Image)``;
