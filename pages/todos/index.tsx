import React, { useEffect, useState } from 'react'
import { Box, List, Stack } from '@chakra-ui/react'
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from 'firebase/firestore';

import { db, app } from "../../src/firebase";
import { Header } from '../../src/components/Header'
import Todo from '../../src/components/Todo';
import { CreateTodo } from '../../src/components/CreateTodo';
import Link from 'next/link';

const Todos: React.FC = () => {
  const auth = getAuth(app);
  const user = useAuthState(auth);

  const [todos, setTodos] = useState<Array<any>>([]);


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
          {todos.map((todo: any) => (
            // eslint-disable-next-line react/jsx-key
            <Todo
              id={todo.id}
              title={todo.title}
              content={todo.content}
              timestamp={todo.createdAt}
            />
          ))}
        </Stack>
      </List>
      <Box textAlign="center" mb={10}>
        <Link href="/todos/create" size="md">Todoの新規作成</Link>
      </Box>
    </Box>


  )
}
export default Todos;