import { Heading, Stack, Text } from '@chakra-ui/layout'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { VFC } from 'react'
import { Layout } from '../../components/templates/Layout'
import { getTask, getTaskIds } from '../../lib/task'
import { ReadTask } from '../../types/tasks/taskTypes'
import Link from 'next/link'
import { Button } from '@chakra-ui/button'
import { useQueryTask } from '../../hooks/task/useQueryTask'

type Props = {
  task: ReadTask
}

const Task: VFC<Props> = ({ task }) => {
  const router = useRouter()
  if (router.isFallback || !task) {
    return <div>Loading...</div>
  }
  return (
    <Layout title={task.title}>
      <Stack spacing="3" align="center">
        <Heading>{task.title}</Heading>
        <Text>{task.username}</Text>
        <Text>{task.tag_name}</Text>
        <Text>{task.content}</Text>
        <Link href={'/tasks'} passHref>
          <Button size="sm" bg="blue.500" _hover={{ bg: 'blue.400' }}>
            Back to Tags Page
          </Button>
        </Link>
      </Stack>
    </Layout>
  )
}

export default Task

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getTaskIds()

  return {
    paths,
    fallback: true,
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const task = await getTask(params.id)
  return {
    props: {
      task,
    },
    revalidate: 3,
  }
}
