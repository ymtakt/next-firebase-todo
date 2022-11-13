import { Header } from '../../src/components/Header'
import { Box, List, Stack } from '@chakra-ui/react'

const Create: React.FC = () => {
  return (
    <Box bg="gray.100" minH="100vh">
      <Header />
      <h1>Todo編集</h1>
    </Box>
  )
}
export default Create; 