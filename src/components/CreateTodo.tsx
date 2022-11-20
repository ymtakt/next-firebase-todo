import React, { useState } from 'react'
import { FormControl, FormLabel, Input, Button, Stack } from '@chakra-ui/react'

import { getAuth } from "firebase/auth";
import { db, app } from "../../src/firebase";
import firebase from 'firebase/compat/app';

import { useRouter } from 'next/router';

import { useRecoilState } from "recoil";
import { todoTitleState, todoContentState } from "../../src/context/atom"

export const CreateTodo = () => {
  const [title, setTitle] = useRecoilState(todoTitleState);
  const [content, setContent] = useRecoilState(todoContentState);


  const [todo, setTodo] = useState([]);

  const router = useRouter();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }
  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  }

  const onClickTodo = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth(app);
    const { uid } = auth.currentUser;

    db.collection("todos").add({
      title: title,
      content: content,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    setTitle("")
    setContent("")
    router.push("/todos");
  }

  return (
    <form onSubmit={onClickTodo}>
      <FormControl>
        <Stack>
          <div>
            <FormLabel htmlFor="">タイトル</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={handleChangeTitle} />
          </div>
          <div>
            <FormLabel htmlFor="">内容コンテンツ</FormLabel>
            <Input
              type="text"
              value={content}
              onChange={handleChangeContent} />
          </div>
        </Stack>
        <Button type="submit" colorScheme='teal' size='lg' mt={6}>送信</Button>
      </FormControl>
    </form>
  )
}
