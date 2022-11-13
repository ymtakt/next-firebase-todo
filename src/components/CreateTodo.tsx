import React, { useState } from 'react'

import { getAuth } from "firebase/auth";
import { db, app } from "../../src/firebase";
import firebase from 'firebase/compat/app';


import { collection, doc } from "firebase/firestore"
import { useRouter } from 'next/router';

export const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
    <form action="" onSubmit={onClickTodo}>
      <div>
        <label htmlFor="">タイトル</label>
        <input
          type="text"
          value={title}
          onChange={handleChangeTitle} />
      </div>
      <div>
        <label htmlFor="">内容コンテンツ</label>
        <input
          type="text"
          value={content}
          onChange={handleChangeContent} />
      </div>
      <button type="submit">送信</button>
    </form>
  )
}
