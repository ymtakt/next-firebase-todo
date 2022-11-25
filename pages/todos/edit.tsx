import React, { useState } from 'react'
import { Header } from '../../src/components/Header'
import { Box, Flex, Stack } from '@chakra-ui/react'
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'

import { getAuth } from "firebase/auth";
import { db, app } from "../../src/firebase";

import { useRouter } from 'next/router';

const Create: React.FC = () => {
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

    const auth: any = getAuth(app);
    const { uid } = auth.currentUser;

    const usersRef = db.collection("todos")
    const id: any = router.query.id

    usersRef.doc(id).set({
      title: title,
      content: content,
      uid,
      createdAt: new Date(),
    });

    setTitle("")
    setContent("")
    router.push("/todos");
  }


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