import { Heading, Stack } from '@chakra-ui/layout'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { VFC } from 'react'
import { Layout } from '../../components/templates/Layout'
import { getTag, getTagIds } from '../../lib/tag'
import { ReadTag } from '../../types/tasks/tagTypes'
import Link from 'next/link'
import { Button } from '@chakra-ui/button'

type Props = {
  tag: ReadTag
}

const Tag: VFC<Props> = ({ tag }) => {
  return (
    <Layout title={tag.name}>
      <Stack spacing="5" align="center">
        <Heading>{tag.name}</Heading>
        <Link href={'/tags'}>
          <Button size="sm" bg="blue.500">
            Back to Tags Page
          </Button>
        </Link>
      </Stack>
    </Layout>
  )
}

export default Tag

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getTagIds()

  return {
    paths,
    fallback: true,
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = await getTag(params.id)
  return {
    props: {
      tag,
    },
    revalidate: 3,
  }
}
