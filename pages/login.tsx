import { useState } from 'react';
import Link from 'next/link'
import {
  Box, Flex, Heading, Divider, Stack, Input, Button, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { app } from "../src/firebase";

import { Header } from '../src/components/Header'
import { useAuthContext } from '../src/context/AuthContext';
import React from 'react';

const Login: React.FC = () => {
  const cancelRef = React.useRef<any>()

  //ユーザー情報の監視(ログイン)
  const { user } = useAuthContext();
  const isLoggedIn = !!user;

  const { isOpen, onOpen, onClose } = useDisclosure()


  const auth = getAuth(app);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }
  const handleOnClick = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log(user)
        router.push("/mypage");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const handleClose = async () => {
    await router.push("/mypage");
  }

  return (
    <>
      <AlertDialog
        isOpen={isLoggedIn}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              ログインしています
            </AlertDialogHeader>

            <AlertDialogBody>
              あなたはログインしていますよ
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='red' onClick={handleClose} ml={3}>
                戻る
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Box bg="gray.100" minH="100vh">
        <Header />

        <Flex align="center" justify="center" height="100vh">
          <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
            <Heading as="h1" size="lg" textAlign="center">
              ログイン
            </Heading>
            <Divider my={4} />
            <Stack spacing={6} py={4} px={10}>
              <Input
                name="email"
                type="email"
                placeholder="メールアドレス"
                onChange={handleChangeEmail}
              />
              <Input
                name="password"
                type="password"
                placeholder="パスワード"
                onChange={handleChangePassword}
              />
              <Button onClick={handleOnClick}>登録</Button>
            </Stack>

            <Link href="/signup">新規登録はこちら</Link>
          </Box>
        </Flex>
      </Box>
    </>
  )
}
export default Login;