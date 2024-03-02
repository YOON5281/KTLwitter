import styled from "styled-components";

export const Wrapper = styled.div`
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
width: 420px;
padding: 50px 0;
font-family: "Noto Sans KR", sans-serif;
`;
export const Title = styled.h1`
font-size: 42px;
color:#5882FA;
font-family: "Gugi", sans-serif;
text-align:center;
`;
export const Form = styled.form`
margin-top: 50px;
margin-bottom: 10px;
display: flex;
flex-direction: column;
gap: 10px;
width: 100%;
`;
export const Input = styled.input`
padding: 10px 20px;
border-radius: 50px;
border: none;
width:100%;
font-size:16px;
&[type="submit"]{
    background-color: #5882FA;
    color:#ffffff;
    cursor: pointer;
    &:hover{
        opacity: 0.8;
    }
}
`;
export const Error = styled.span`
font-weight: 600px;
color:tomato;
`;

export const Switcher = styled.span`
margin-top:20px;
color:#000000;
a{
    color: #5882FA;
}
`