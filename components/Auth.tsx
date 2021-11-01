import { Box, Flex, Stack, Text } from '@chakra-ui/layout'
import Head from 'next/head'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'

export const Auth = () => {
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
          <Stack spacing="4">
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
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
                type="password"
                borderColor="gray.500"
                focusBorderColor="gray.400"
                variant="flushed"
                placeholder="Password"
              />
            </FormControl>
            <Flex justify="start">
              <Text
                as="span"
                color="blue.300"
                cursor="pointer"
                _hover={{ color: 'blue.200' }}
              >
                Create New account ?
              </Text>
            </Flex>
            <Button bg="blue.600" _hover={{ bg: 'blue.500' }}>
              Submit
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Flex>
  )
}
