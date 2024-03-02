import { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import {  doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { Title } from "../components/auth-components";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
display: flex;
flex-direction: column;
gap: 10px;
`;

const TextArea = styled.textarea`
border: 2px solid transparent;
padding: 20px;
border-radius: 20px;
font-size: 16px;
color: black;
background-color:white;
width: 100%;
resize: none;
&::placeholder{
    font-size: 16px;
    font-family: "Noto Sans KR", sans-serif;
}
&:focus{
    outline: none;
    border-color: #5882FA;
}
margin-top: 30px;
`;

const AttachFileButton = styled.label`
    padding: 10px 0px;
    color: #5882FA;
    text-align: center;
    border-radius: 20px;
    border: 0.5px solid #5882FA;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: "Noto Sans KR", sans-serif;
    &:hover{
        color: white;
        background-color: #5882FA;
    }
`;
const AttachFileInput = styled.input`
  display:none;
`;

const SubmitBtn = styled.input`
background-color: #5882FA;
color: white;
border: none;
padding: 10px 0px;
border-radius: 20px;
font-family: "Noto Sans KR", sans-serif;
cursor: pointer;
&:hover,
&:active{
    opacity: 0.8;
}
`;
export default function editTweets(){

    const user = auth.currentUser;
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const docRef = doc(db, "ktlweets", id);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
        //console.log(tweet);
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0]);
        }
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        if (!user || tweet === "" || tweet.length > 180) return;
        e.preventDefault();
        await updateDoc(docRef,{
            tweet : tweet,
        });

        if (file) {
            const locationRef = ref(
                storage, 
                `ktlweets/${user.uid}-${user.displayName}/${id}`
                );
            const result = await uploadBytes(locationRef, file);
            const url = await getDownloadURL(result.ref);
           // console.log(url);
            await updateDoc(docRef,{
                photo: url,
            })
        }

        navigate('/');
    }

    
    const fetchTweet = async() => {
        const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  //console.log("Document data:", docSnap.data());
  setTweet(docSnap.data().tweet);

} else {
  // docSnap.data() will be undefined in this case
  console.log("데이터가 없습니다.");
}
           
        }
        
    useEffect( ()=>{
        fetchTweet();
    }, [])
    
return  <Form onSubmit={onSubmit}>
    <Title>게시물 수정하기</Title>
    <TextArea rows={6} maxLength={180} value={tweet} onChange={onChange} placeholder="내용을 수정해주세요~!" required />
    <AttachFileButton htmlFor="file">{file ? "사진 업로드됨✅" : "사진 업로드 하기"}</AttachFileButton>
    <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
    <SubmitBtn type="submit" value="수정하기" />
</Form>
}