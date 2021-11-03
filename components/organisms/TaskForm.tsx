import { Input } from '@chakra-ui/input'
import { Stack } from '@chakra-ui/layout'
import { FormEvent, VFC } from 'react'
import { TagOptions } from '../molecules/TagOptions'
import { useEditedTask } from '../../hooks/task/useEditedTask'
import { Button } from '@chakra-ui/button'
import { useAppMutation } from '../../hooks/task/useAppMutate'

export const TaskForm: VFC = () => {
  const { handleInputChange, editedTask, handleSubmit, updateTaskMutation } =
    useEditedTask()
  return (
    <form onSubmit={handleSubmit}>
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
          isLoading={updateTaskMutation.isLoading}
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
