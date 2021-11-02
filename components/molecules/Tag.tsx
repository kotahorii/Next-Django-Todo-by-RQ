import { ListItem, Text } from '@chakra-ui/layout'
import { VFC } from 'react'
import { ReadTag } from '../../types/tasks/tagTypes'
import Link from 'next/link'

type Props = {
  tag: ReadTag
}

export const Tag: VFC<Props> = ({ tag }) => {
  return (
    <Link href={`/tags/${tag.id}`} passHref>
      <ListItem>
        <Text as="span" cursor="pointer">
          {tag.name}
        </Text>
      </ListItem>
    </Link>
  )
}
