import { Input } from '@chakra-ui/input'
import { Stack } from '@chakra-ui/layout'
import { Textarea } from '@chakra-ui/textarea'
import { FormEvent, VFC } from 'react'
import { TagOptions } from '../molecules/TagOptions'
import { Heading } from '@chakra-ui/layout'
import { useEditedTask } from '../../hooks/task/useEditedTask'
import { Button } from '@chakra-ui/button'
import { useAppMutation } from '../../hooks/task/useAppMutate'

export const TaskForm: VFC = () => {
  const { updateTaskMutation, createTaskMutation } = useAppMutation()
  const { resetInput, handleInputChange, editedTask } = useEditedTask()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (editedTask.id) {
      updateTaskMutation.mutate(editedTask)
    } else {
      createTaskMutation.mutate({
        title: editedTask.title,
        content: editedTask.content,
        tag: editedTask.tag,
      })
      resetInput()
    }
  }
  return (
    <form>
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
        <Button
          type="submit"
          bg="blue.500"
          _hover={{ bg: 'blue.400' }}
          fontSize="xl"
        >
          {editedTask.id ? 'Update' : 'Create'}
        </Button>
        <Stack direction="row" align="center">
          <Stack>
            <Input
              name="title"
              value={editedTask.title}
              onChange={handleInputChange}
              variant="flushed"
              placeholder="title"
            />
            <TagOptions />
          </Stack>
          <Input
            name="content"
            onChange={handleInputChange}
            value={editedTask.content}
            placeholder="content"
          />
        </Stack>
      </Stack>
    </form>
  )
}
