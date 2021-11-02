import Icon from '@chakra-ui/icon'
import { ListItem, Stack, Text } from '@chakra-ui/layout'
import { VFC } from 'react'
import { ReadTask } from '../../types/tasks/taskTypes'
import { MdDeleteOutline } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import Link from 'next/link'
import { Button } from '@chakra-ui/button'

type Props = {
  task: ReadTask
}

export const Task: VFC<Props> = ({ task }) => {
  return (
    <ListItem>
      <Stack align="center" direction="row" spacing="3">
        <Link href={`/tasks/${task.id}`} passHref>
          <Button color="white" variant="link" _focus={{ boxShadow: 'none' }}>
            {task.title}
          </Button>
        </Link>
        <Icon as={MdDeleteOutline} fontSize="xl" />
        <Icon as={FiEdit} fontSize="xl" />
      </Stack>
    </ListItem>
  )
}
