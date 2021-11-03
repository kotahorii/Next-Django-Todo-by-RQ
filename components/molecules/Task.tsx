import Icon from '@chakra-ui/icon'
import { Flex, ListItem, Stack, Text } from '@chakra-ui/layout'
import { VFC } from 'react'
import { ReadTask } from '../../types/tasks/taskTypes'
import { MdDeleteOutline } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import Link from 'next/link'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { useAppMutation } from '../../hooks/task/useAppMutate'
import { useAppDispatch } from '../../app/hooks'
import { setEditedTask } from '../../features/tasks/taskSlice'

type Props = {
  task: ReadTask
}

export const Task: VFC<Props> = ({ task }) => {
  const { deleteTaskMutation } = useAppMutation()
  const dispatch = useAppDispatch()
  return (
    <ListItem>
      <Stack align="center" direction="row" spacing="3">
        <Link href={`/tasks/${task.id}`} passHref>
          <Button color="white" variant="link" _focus={{ boxShadow: 'none' }}>
            {task.title}
          </Button>
        </Link>

        <Icon
          as={MdDeleteOutline}
          fontSize="xl"
          onClick={() => {
            deleteTaskMutation.mutate(task.id)
          }}
          cursor="pointer"
        />
        <Icon
          as={FiEdit}
          fontSize="xl"
          onClick={() =>
            dispatch(
              setEditedTask({
                id: task.id,
                title: task.title,
                content: task.content,
                tag: task.tag,
              })
            )
          }
          cursor="pointer"
        />
      </Stack>
      <Stack></Stack>
    </ListItem>
  )
}
