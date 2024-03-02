import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components"
import { auth, db, storage } from "../firebase";
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

export default function PostTweetForm() {

    const [isLoading, setIsLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0]);
        }
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (!user || isLoading || tweet === "" || tweet.length > 180) return;

        try {
            setIsLoading(true);
            const doc = await addDoc(collection(db, "ktlweets"), {
                tweet,
                createdAt: Date.now(),
                username: user.displayName || "익명",
                userId: user.uid,
            });
            if (file) {
                const locationRef = ref(
                    storage, 
                    `ktlweets/${user.uid}-${user.displayName}/${doc.id}`
                    );
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
               // console.log(url);
                await updateDoc(doc,{
                    photo: url,
                })
            }
            setTweet("")
            setFile(null);
        } catch (error) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }

    };

    return <Form onSubmit={onSubmit}>
        <TextArea rows={6} maxLength={180} onChange={onChange} value={tweet} placeholder="어떻게 지내시나요???" required />
        <AttachFileButton htmlFor="file">{file ? "사진 업로드됨✅" : "사진 업로드 하기"}</AttachFileButton>
        <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
        <SubmitBtn type="submit" value={isLoading ? "게시 중..." : "게시하기"} />
    </Form>
}