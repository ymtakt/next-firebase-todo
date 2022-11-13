import { Box } from '@chakra-ui/react'

import { Header } from '../src/components/Header'
const Mypage: React.FC = () => {
  return (
    <Box bg="gray.100" minH="100vh">
      <Header />
      <h2>マイページ</h2>
    </Box>
  )
}
export default Mypage;