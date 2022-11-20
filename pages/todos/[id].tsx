import React from 'react'
import { useRouter } from "next/router";

import { Header } from '../../src/components/Header'
import { Box, Flex, Stack } from '@chakra-ui/react'
import { FormControl, Text, Button } from '@chakra-ui/react'

const Name = () => {
  const router = useRouter();

  return (
    <Box bg="gray.100" minH="100vh">
      <Header />
      <h1>Todoの詳細:
        {router.query.id}
      </h1>
      <Box maxW="900px" m="90px auto 0">
        <Box bg="#fff" p={4}>
          <form >
            <FormControl>
              <Stack>
                <div>
                  <Text>タイトル</Text>
                  <Text>{router.query.title}</Text>
                </div>
                <div>
                  <Text>内容</Text>
                  <Text>{router.query.content}</Text>
                </div>
              </Stack>
              <Flex>
                <Button onClick={() => router.back()}>戻る</Button>
              </Flex>
            </FormControl>
          </form>
        </Box>
      </Box>
    </Box>
  );
};


export default Name