import '../styles/globals.css' 
import '../styles/header.css' 
import type { AppProps } from 'next/app'
import { extendTheme } from "@chakra-ui/react"
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}
const theme = extendTheme({ colors })
// import theme from '../utils/theme'
import { ChakraProvider } from '@chakra-ui/react'
function MyApp({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
}
export default MyApp
