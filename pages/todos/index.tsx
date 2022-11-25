import React, { useEffect, useState } from 'react'
import { Box, Button, List, Stack } from '@chakra-ui/react'
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from 'firebase/firestore';

import { db, app } from "../../src/firebase";
import { Header } from '../../src/components/Header'
import Todo from '../../src/components/Todo';
import { CreateTodo } from '../../src/components/CreateTodo';
import Link from 'next/link';
import { todoListState, useAuth } from "../../src/context/atom";
import { useRecoilState } from 'recoil';
import { useAuthContext } from '../../src/context/AuthContext';
import { NextPage } from "next/types";

const Todos: NextPage = () => {

  const auth = getAuth(app);
  const user = useAuth();

  const [todos, setTodos] = useRecoilState<any>(todoListState);

  useEffect(() => {
    const todoData = collection(db, "todos");
    /**リアルタイム */
    onSnapshot(todoData, (todo) => {
      setTodos(todo.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }, []);

  // console.log(todos)

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