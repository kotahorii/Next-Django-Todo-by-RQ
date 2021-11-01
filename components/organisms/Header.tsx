import { Button } from '@chakra-ui/button'
import { Stack } from '@chakra-ui/layout'
import React, { VFC } from 'react'
import { useAuth } from '../../hooks/auth/useAuth'
import Link from 'next/link'

export const Header: VFC = () => {
  const { logout } = useAuth()

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
        onClick={logout}
        bg="transparent"
        fontWeight="bold"
        _hover={{ bg: 'gray.600' }}
        _focus={{ boxShadow: 'none' }}
      >
        Logout
      </Button>
      <Stack direction="row">
        <Link href="/tasks" passHref>
          <Button
            bg="transparent"
            _hover={{ bg: 'gray.600' }}
            _focus={{ boxShadow: 'none' }}
          >
            Tasks
          </Button>
        </Link>

        <Link href="/tags" passHref>
          <Button
            bg="transparent"
            _hover={{ bg: 'gray.600' }}
            _focus={{ boxShadow: 'none' }}
          >
            Tags
          </Button>
        </Link>
      </Stack>
    </Stack>
  )
}
