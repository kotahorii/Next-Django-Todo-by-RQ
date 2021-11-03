import { Input } from '@chakra-ui/input'
import { Stack } from '@chakra-ui/layout'
import { Textarea } from '@chakra-ui/textarea'
import { VFC } from 'react'
import { TagOptions } from '../molecules/TagOptions'
import { Heading } from '@chakra-ui/layout'
import { useRecoilValue } from 'recoil'
import { editedTaskState } from '../../hooks/task/useEditedTask'
import { Button } from '@chakra-ui/button'

export const TaskForm: VFC = () => {
  const editedTask = useRecoilValue(editedTaskState)
  return (
    <Stack
      align="center"
      bg="gray.700"
      boxShadow="lg"
      spacing="3"
      pt="3"
      pb="5"
      px="5"
      borderRadius="lg"
    >
      <Button bg="blue.500" _hover={{ bg: 'blue.400' }} fontSize="xl">
        {editedTask.id ? 'Update' : 'Create'}
      </Button>
      <Stack direction="row" align="center">
        <Stack>
          <Input
            name="title"
            value={editedTask.title}
            variant="flushed"
            placeholder="title"
          />
          <TagOptions />
        </Stack>
        <Textarea
          name="content"
          value={editedTask.content}
          placeholder="content"
        />
      </Stack>
    </Stack>
  )
}
