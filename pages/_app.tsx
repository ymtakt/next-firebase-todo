import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from "recoil";
import { ChakraProvider } from '@chakra-ui/react'

import { AuthProvider } from '../src/context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <ChakraProvider >
          <Component  {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default MyApp
