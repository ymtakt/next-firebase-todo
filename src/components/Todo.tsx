import { Flex, Box, Text, ListItem } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import moment from 'moment';
import 'moment/locale/ja';

import Link from 'next/link';
import { db } from '../firebase';

const Todo: React.FC = (props) => {

  const onClickDelete = (id: string | undefined) => {
    db.collection("todos").doc(id).delete();
  };



  return (
    <ListItem key={props.id}>
      <Box boxShadow='sm' p='6' rounded='md' bg='white' >
        <Text fontSize='sm'>{moment(props.timestamp).format('YYYY-MM-DD')}</Text>
        <Text fontSize='xl' as='b' pb={4}>{props.title}</Text>
        <Text fontSize='md'>{props.content}</Text>
        <Flex align="center" justify="flex-end">
          <Link href="/todos/edit"><EditIcon boxSize={6} mr={4} /></Link>
          <DeleteIcon boxSize={6} onClick={() => onClickDelete(props.id)} />
        </Flex>
      </Box>
    </ListItem>
  )
}
export default Todo;