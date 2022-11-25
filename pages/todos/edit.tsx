import React, { useEffect, useState } from 'react'
import { Header } from '../../src/components/Header'
import { Box, Flex, Stack } from '@chakra-ui/react'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'

import { getAuth } from "firebase/auth";
import { db, app, auth } from "../../src/firebase";

import { useRouter } from 'next/router';
import { collection, setDoc, doc } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { userState } from '../../src/context/atom';

const Create: React.FC = () => {
  const user = useRecoilValue(userState);

  const router = useRouter();
  console.log(router.query.todoInfo);

  const [title, setTitle] = useState(router.query.title);
  const [content, setContent] = useState(router.query.content);


  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }
  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.currentTarget.value);
  }

  const onClickTodo = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const auth = getAuth(app);
    // const { uid } = user;

    const usersRef = collection(db, "todos")
    const id = router.query.id as string

    setDoc(doc(usersRef, id), {
      title: title,
      content: content,
      uid: user?.uid,
      createdAt: new Date(),
    });

    // usersRef.doc(id).set({
    //   title: title,
    //   content: content,
    //   uid,
    //   createdAt: new Date(),
    // });

    setTitle("")
    setContent("")
    router.push("/todos");
  }

  console.log(user);

  // console.log(auth.currentUser);
  // useEffect(() => {
  //   console.log(auth)
  // }, [auth]);

  return (
    <Box bg="gray.100" minH="100vh">
      <Header />
      <h1>Todo編集</h1>
      <Box maxW="900px" m="90px auto 0">
        <Box bg="#fff" p={4}>
          <form onSubmit={onClickTodo}>
            <FormControl>
              <Stack>
                <div>
                  <FormLabel htmlFor="">タイトル:{router.query.title}</FormLabel>
                  <Input
                    type="text"
                    value={title}
                    onChange={handleChangeTitle} />
                </div>
                <div>
                  <FormLabel htmlFor="">内容コンテンツ{router.query.content}</FormLabel>
                  <Input
                    type="text"
                    value={content}
                    onChange={handleChangeContent} />
                </div>
              </Stack>
              <Flex align="center">
                <Button type="submit" colorScheme='teal' size='lg' mt={6}>送信</Button>
                <Button size='lg' ml={4} mt={6} onClick={() => router.back()}>キャンセル</Button>
              </Flex>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Box>
  )
}
export default Create; 