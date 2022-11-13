
import React, { useEffect, useState } from 'react'
import { Box, List, Stack } from '@chakra-ui/react'
import { CreateTodo } from '../../src/components/CreateTodo';
import { useRouter } from 'next/router';
import { Header } from '../../src/components/Header';

const Create: React.FC = () => {
  return (
    <Box bg="gray.100" minH="100vh">
      <Header />
      <h1>Todo新規作成</h1>
      <CreateTodo />
    </Box>
  )
}
export default Create; 