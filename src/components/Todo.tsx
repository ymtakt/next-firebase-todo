import { Flex, Box, Text, ListItem } from '@chakra-ui/react'
import { EditIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons'
import moment from 'moment';
import 'moment/locale/ja';

import Link from 'next/link';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const Todo: React.FC<any> = (props: any) => {

  const onClickDelete = async (id: string | undefined) => {

    const userDocumentRef = doc(db, 'todos', id);
    await deleteDoc(userDocumentRef);

    // db.collection("todos").doc(id).delete();


    // console.log(id);
    // await deleteDoc(doc(db, "todos", id));
  };


  return (
    <ListItem key={props.id}>
      <Box boxShadow='sm' p='6' rounded='md' bg='white' >
        <Text fontSize='sm'>{moment(props.timestamp).format('YYYY-MM-DD')}</Text>
        <Text fontSize='xl' as='b' pb={4}>{props.title}</Text>
        <Flex align="center" justify="flex-end">
          <Link
            as={`/todos/${props.title}`}
            href={{ pathname: `/todos/[id]`, query: props.todoInfo }}
          >
            <SearchIcon boxSize={6} mr={4} />
          </Link>
          <Link
            as={`/todos/edit`}
            href={{ pathname: `/todos/edit`, query: props.todoInfo }}
          >
            <EditIcon boxSize={6} mr={4} />
          </Link>
          <DeleteIcon boxSize={6} onClick={() => onClickDelete(props.id)} />
        </Flex>
      </Box>
    </ListItem>
  )
}
export default Todo;