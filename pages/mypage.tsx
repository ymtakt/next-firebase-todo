import { Box, Button, Flex, Stack } from '@chakra-ui/react'
import Link from 'next/link'

import { Header } from '../src/components/Header'
const Mypage: React.FC = () => {
  return (
    <Box bg="gray.100" minH="100vh">
      <Header />
      <h2>マイページ</h2>
      <Box textAlign="center" mb={10}>
        <Flex>
          <Button colorScheme='teal' size='lg' py={4} px={10} display="block" margin="0 auto">
            <Link href="/todos">Todo一覧はこちら</Link>
          </Button>
          <Button colorScheme='teal' size='lg' py={4} px={10} display="block" margin="0 auto">
            <Link href="/todos/create">Todoの新規登録はこちら</Link>
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}
export default Mypage;