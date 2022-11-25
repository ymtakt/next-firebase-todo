import React from 'react'
import { Box, Flex, Heading, Button } from '@chakra-ui/react'
import Link from 'next/link'
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";

import { app, auth } from "../../src/firebase";
import { useAuth } from "../context/atom";

export const Header = () => {
  // const auth = getAuth(app);
  // const user = useAuth();
  const user = useAuth();

  const router = useRouter();


  const handleOnSignout = () => {
    signOut(auth).then(() => {
      alert("ログアウト完了！")
      router.push("/login");
    }).catch((error) => {
      alert("エラーです");
    });;
  }


  return (
    <>
      <Box w="100%" p={4} bg="teal.600">
        <Flex justify="space-between">
          <Heading as='h1' size='md' color="white">
            <Link href="/">
              TODOアプリ
            </Link>
          </Heading>
          {user !== null && <Button onClick={handleOnSignout}>ログアウト</Button>}
        </Flex>
      </Box>
    </>
  )
}
