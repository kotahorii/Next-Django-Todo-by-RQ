import { Box, Flex, Stack, Text } from '@chakra-ui/layout'
import Head from 'next/head'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import { useAuth } from '../../hooks/auth/useAuth'

export const Auth = () => {
  const {
    isLogin,
    username,
    password,
    handlePassword,
    handleUsername,
    toggleIsLogin,
    authUser,
  } = useAuth()

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
        <title>Login</title>
      </Head>
      <Flex>
        <Box
          rounded="lg"
          bg="gray.700"
          boxShadow="lg"
          p="8"
          w={{ md: 'sm', base: 'xs' }}
          minW="xs"
        >
          <form onSubmit={authUser}>
            <Stack spacing="4">
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  value={username}
                  onChange={handleUsername}
                  type="text"
                  borderColor="gray.500"
                  focusBorderColor="gray.400"
                  variant="flushed"
                  placeholder="Username"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  value={password}
                  onChange={handlePassword}
                  type="password"
                  borderColor="gray.500"
                  focusBorderColor="gray.400"
                  variant="flushed"
                  placeholder="Password"
                />
              </FormControl>

              <Flex justify="start">
                <Text
                  onClick={toggleIsLogin}
                  as="span"
                  color="blue.300"
                  cursor="pointer"
                  _hover={{ color: 'blue.200' }}
                >
                  {isLogin ? 'Create New account ?' : 'Back to Login'}
                </Text>
              </Flex>
              <Button type="submit" bg="blue.600" _hover={{ bg: 'blue.500' }}>
                {isLogin ? 'Sign in' : 'Sign up'}
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>
    </Flex>
  )
}
