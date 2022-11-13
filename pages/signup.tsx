import { useState } from 'react';
import Link from 'next/link'
import { Box, Flex, Heading, Divider, Stack, Input, Button } from '@chakra-ui/react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { app } from "../src/firebase";

import { Header } from '../src/components/Header'

const Signup: React.FC = () => {
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        router.push("/todos");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <Box bg="gray.100" minH="100vh">
      <Header />

      <Flex align="center" justify="center" height="100vh">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            新規登録
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

          <Link href="/login">アカウントをお持ちの方はこちら</Link>
        </Box>
      </Flex>
    </Box>
  )
}

export default Signup;