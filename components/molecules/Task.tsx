import { ListItem } from '@chakra-ui/layout'
import { VFC } from 'react'
import { ReadTask } from '../../types/tasks/taskTypes'

type Props = {
  task: ReadTask
}

export const Task: VFC<Props> = ({ task }) => {
  return <ListItem>{task.title}</ListItem>
}
