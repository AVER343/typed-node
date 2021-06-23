import '../styles/globals.css' 
import '../styles/header.css' 
import type { AppProps } from 'next/app'
// import theme from '../utils/theme'
import { ChakraProvider } from '@chakra-ui/react'
function MyApp({ Component, pageProps }: AppProps) {
  return <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
}
export default MyApp
