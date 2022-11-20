import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from "recoil";
import { ChakraProvider } from '@chakra-ui/react'

import { AuthProvider } from '../src/context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RecoilRoot>
        <ChakraProvider >
          <Component  {...pageProps} />
        </ChakraProvider>
      </RecoilRoot>
    </AuthProvider>
  );
}

export default MyApp
