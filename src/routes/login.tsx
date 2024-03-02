
    import { useState } from "react";
    import { auth } from "../firebase";
    import { Link, useNavigate } from "react-router-dom";
    import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";
    

    export default function Login() {
    
        const navigate = useNavigate();
        const [isLoading, setIsLoading] = useState(false);
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
            if (name === "email") {
                setEmail(value);
            } else if (name === "password") {
                setPassword(value);
            }
        };
        const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setError("");
            if(isLoading || email === "" || password === "" ) return;
            try{
                setIsLoading(true);  
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/");
    
            } catch(e){
    
                if(e instanceof FirebaseError){
                    setError(e.message);
                }
                
            }finally{
                setIsLoading(false);
            }
            console.log(email,password);
        }
    
        return <Wrapper>
            <Title>서준쓰위터 로그인</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="email" value={email} placeholder="이메일" type="email" required />
                <Input onChange={onChange} name="password" value={password} placeholder="비밀번호" type="password" required />
                <Input onChange={onChange} type="submit" value= {isLoading ? "로딩 중..." : "로그인"} />
            </Form>
            {error != "" ? <Error>{error}</Error> : null}
            <Switcher>
                계정이 없으세요?{" "}
                <Link to="/create-account">새로 만드세요 &rarr;</Link> 
            </Switcher>
            <GithubButton/>
        </Wrapper>;
    }
