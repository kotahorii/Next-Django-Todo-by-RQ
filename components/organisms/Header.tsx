import { Button } from '@chakra-ui/button'
import { Stack } from '@chakra-ui/layout'
import React, { VFC } from 'react'

export const Header: VFC = () => {
  return (
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
      <Stack direction="row">
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
      </Stack>
    </Stack>
  )
}
