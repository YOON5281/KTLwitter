import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin: 10px 0;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.6);
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: #000000;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
  color: #000000;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 400;
  border: 0;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px;
`;

const EditButton = styled.span`
  background-color: blue;
  font-weight: 400;
  border: 0;
  font-size: 12px;
  border-radius: 5px;
  padding: 5px;
  margin-left: 5px;
`;
export const LinkItem = styled(Link)`
  color: white;
  font-size: 12px;
  text-decoration: none;
  cursor: pointer;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = confirm("정말 이 게시물을 삭제하실건가요???");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "ktlweets", id));
      if (photo) {
        const photoRef = ref(
          storage,
          `ktlweets/${user.uid}-${user.displayName}/${id}`
        );
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <div>
            <DeleteButton onClick={onDelete}>삭제하기</DeleteButton>
            <EditButton>
              <LinkItem to={"/editTweets/" + id}>수정하기</LinkItem>
            </EditButton>
          </div>
        ) : null}
      </Column>
      {photo ? (
        <Column>
          <Photo src={photo} />
        </Column>
      ) : null}
    </Wrapper>
  );
}
