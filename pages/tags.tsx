import { OrderedList } from '@chakra-ui/layout'
import { GetStaticProps } from 'next'
import { VFC } from 'react'
import { dehydrate, QueryClient, useQueryClient } from 'react-query'
import { Tag } from '../components/molecules/Tag'
import { Layout } from '../components/templates/Layout'
import { getTags } from '../lib/tag'
import { ReadTag } from '../types/tasks/tagTypes'
const Tags: VFC = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<ReadTag[]>('tags')
  return (
    <Layout title="tags">
      <OrderedList>
        {data.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </OrderedList>
    </Layout>
  )
}

export default Tags

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('tags', getTags)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      fallback: true,
    },
    revalidate: 3,
  }
}
