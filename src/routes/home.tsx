import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";
import { Title } from "../components/auth-components";

const Wrapper =styled.div`
    display: grid;
    gap: 50px;
    grid-template-rows: 1fr 5fr;
    font-family: "Noto Sans KR", sans-serif;
`;


export default function Home(){

    return (
        <Wrapper>
            <Title>서준쓰위터</Title>
            <PostTweetForm />
            <Timeline />
        </Wrapper>
    );
}