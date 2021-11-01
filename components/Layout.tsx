import { Flex, Stack, Text } from '@chakra-ui/layout'
import { ReactNode, useEffect, VFC } from 'react'
import Head from 'next/head'
import Cookie from 'universal-cookie'
import { useRouter } from 'next/router'
import { Button } from '@chakra-ui/button'
import { useAuth } from '../hooks/auth/useAuth'

type Props = {
  title: string
  children: ReactNode
}

const cookie = new Cookie()

export const Layout: VFC<Props> = ({ title, children }) => {
  const { logout } = useAuth()
  const router = useRouter()
  // useEffect(() => {
  //   if (!cookie.get('access_token')) {
  //     router.push('/')
  //   }
  // }, [cookie.get('access_token')])
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
      <Stack
        px="3"
        direction="row"
        h="60px"
        w="full"
        borderBottom="1px"
        borderColor="gray.600"
        fontSize="xl"
        justify={{ md: 'start', base: 'space-between' }}
        align="center"
      >
        <Button
          bg="transparent"
          fontWeight="bold"
          _hover={{ bg: 'gray.600' }}
          _focus={{ boxShadow: 'none' }}
        >
          Logout
        </Button>
        <Flex direction="row">
          <Button
            bg="transparent"
            _hover={{ bg: 'gray.600' }}
            _focus={{ boxShadow: 'none' }}
          >
            Tasks
          </Button>
          <Button
            bg="transparent"
            _hover={{ bg: 'gray.600' }}
            _focus={{ boxShadow: 'none' }}
          >
            Tags
          </Button>
        </Flex>
      </Stack>
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
