import React, { useState } from 'react'
import { FormControl, FormLabel, Input, Button, Stack } from '@chakra-ui/react'

import { getAuth } from "firebase/auth";
import { db, app, auth } from "../../src/firebase";
import firebase from 'firebase/compat/app';

import { useRouter } from 'next/router';

import { useRecoilState, useRecoilValue } from "recoil";
import { todoTitleState, todoContentState, userState } from "../../src/context/atom"
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

export const CreateTodo = () => {
  const [title, setTitle] = useRecoilState(todoTitleState);
  const [content, setContent] = useRecoilState(todoContentState);

  const user = useRecoilValue(userState);

  const [todo, setTodo] = useState([]);

  const router = useRouter();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }
  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  }

  // const usersRef = collection(db, "todos")
  // const id = router.query.id as string
  // console.log(usersRef, id);


  const onClickTodo = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usersRef = collection(db, "todos")
    const id = router.query.id as string

    await addDoc(usersRef, {
      // db.collection("todos").add({
      title: title,
      content: content,
      uid: user?.uid,
      createdAt: new Date(),
      // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // .then(function (docRef) {
    //   // console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function (error) {
    //   console.error("Error adding document: ", error);
    // });
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
