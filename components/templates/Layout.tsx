import { Flex } from '@chakra-ui/layout'
import { ReactNode, useEffect, VFC } from 'react'
import Head from 'next/head'
import Cookie from 'universal-cookie'
import { useRouter } from 'next/router'
import { Header } from '../organisms/Header'
import { Footer } from '../organisms/Footer'

type Props = {
  title: string
  children: ReactNode
}

const cookie = new Cookie()

export const Layout: VFC<Props> = ({ title, children }) => {
  const router = useRouter()
  useEffect(() => {
    if (!cookie.get('access_token')) {
      router.push('/')
    }
  }, [cookie.get('access_token')])
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      minH="100vh"
      color="white"
      bg="gray.800"
      fontSize="md"
      fontFamily="mono"
    >
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <Flex
        direction="column"
        flex="1"
        w="full"
        justify="center"
        align="center"
      >
        {children}
      </Flex>
      <Footer />
    </Flex>
  )
}
