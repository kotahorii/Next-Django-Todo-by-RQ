import { ListItem } from '@chakra-ui/layout'
import { VFC } from 'react'
import { ReadTag } from '../../types/tasks/tagTypes'

type Props = {
  tag: ReadTag
}

export const Tag: VFC<Props> = ({ tag }) => {
  return <ListItem>{tag.name}</ListItem>
}
