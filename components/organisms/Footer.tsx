import { Flex } from '@chakra-ui/layout'
import React, { VFC } from 'react'

export const Footer: VFC = () => {
  return (
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
  )
}
