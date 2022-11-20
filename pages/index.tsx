import type { NextPage } from 'next'
import Link from 'next/link'
import { Text, Box, Flex, Heading, Button } from '@chakra-ui/react'

import { Header } from '../src/components/Header';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      {/* <Head><Link href={"/todos"}>Todo一覧はこちら</Link></Head> */}
      <Box bg="gray.100" minH="100vh">
        <Header />
        <Heading as="h1" size="lg" textAlign="center" mt={10} mb={10}>Todoアプリ</Heading>
        <Flex align="flex-start" justify="center">
          <Flex justify="center" mr={8}>
            <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
              <Heading as="h1" size="md" textAlign="center" mb={8}>
                アカウントお持ちでない方
              </Heading>
              <Button py={4} px={10} display="block" margin="0 auto">
                <Link href="/signup">新規登録はこちら</Link>
              </Button>
            </Box>
          </Flex>
          <Flex justify="center">
            <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
              <Heading as="h1" size="md" textAlign="center" mb={8}>
                アカウントをお持ちの方
              </Heading>
              <Button py={4} px={10} display="block" margin="0 auto">
                <Link href="/login">ログインはこちら</Link>
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default Home
