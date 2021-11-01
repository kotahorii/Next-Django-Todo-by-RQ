import { Flex } from '@chakra-ui/layout'
import { ReactNode, VFC } from 'react'
import Head from 'next/head'

type Props = {
  title: string
  children: ReactNode
}

export const Layout: VFC<Props> = ({ title, children }) => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      minH="100vh"
      color="white"
      bg="gray.800"
      fontSize="sm"
      fontFamily="mono"
    >
      <Head>
        <title>{title}</title>
      </Head>
      <Flex
        direction="column"
        flex="1"
        w="full"
        justify="center"
        align="center"
      >
        {children}
      </Flex>
      <Flex
        w="full"
        h="12"
        justify="center"
        align="center"
        borderTop="1px"
        borderColor="gray.600"
      >
        RQ + Chakra + Recoil
      </Flex>
    </Flex>
  )
}
