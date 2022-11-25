import React, { useEffect } from 'react'
import { Box, Button, List, Stack } from '@chakra-ui/react'
import { collection, onSnapshot } from 'firebase/firestore';

import { db } from "../../src/firebase";
import { Header } from '../../src/components/Header'
import Todo from '../../src/components/Todo';
import Link from 'next/link';
import { todoListState, useAuth } from "../../src/context/atom";
import { useRecoilState } from 'recoil';
import { NextPage } from "next/types";

const Todos: NextPage = () => {
  const user = useAuth();

  const [todos, setTodos] = useRecoilState<any>(todoListState);

  useEffect(() => {
    const todoData = collection(db, "todos");
    /**リアルタイム */
    onSnapshot(todoData, (todo) => {
      setTodos(todo.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }, []);
  return (
    <Box bg="gray.100" minH="100vh">
      <Header />
      <List maxW="900px" m="90px auto 0">
        <Stack>
          {todos.map((todo: any) => {
            const todoInfo = { id: todo.id, title: todo.title, content: todo.content };
            return (
              user !== null && user.uid === todo.uid && (
                < Todo
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  content={todo.content}
                  timestamp={todo.createdAt}
                  todoInfo={todoInfo}
                />
              )
            )
          })}
        </Stack>
      </List>
      <Box textAlign="center" mt={10} mb={10}>
        <Button colorScheme='teal' size='lg'>
          <Link href="/todos/create"  >Todoの新規作成</Link>
        </Button>
      </Box>
    </Box>


  )
}
export default Todos;