import { OrderedList } from '@chakra-ui/layout'
import { GetStaticProps } from 'next'
import React, { VFC } from 'react'
import { Task } from '../components/molecules/Task'
import { Layout } from '../components/templates/Layout'
import { useQueryTask } from '../hooks/task/useQueryTask'
import { getTasks } from '../lib/task'
import { ReadTask } from '../types/tasks/taskTypes'

type Props = {
  tasks: ReadTask[]
}

const Tasks: VFC<Props> = ({ tasks }) => {
  const { data } = useQueryTask(tasks)
  return (
    <Layout title="Task">
      <OrderedList>
        {data?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </OrderedList>
    </Layout>
  )
}

export default Tasks

export const getStaticProps: GetStaticProps = async () => {
  const tasks = await getTasks()
  return {
    props: {
      tasks,
    },
    revalidate: 3,
  }
}
