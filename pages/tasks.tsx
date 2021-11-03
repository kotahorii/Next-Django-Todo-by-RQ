import { OrderedList, Stack } from '@chakra-ui/layout'
import { GetStaticProps } from 'next'
import React, { VFC } from 'react'
import { Task } from '../components/molecules/Task'
import { TaskForm } from '../components/organisms/TaskForm'
import { Layout } from '../components/templates/Layout'
import { useQueryTasks } from '../hooks/task/useQueryTasks'
import { getTasks } from '../lib/task'
import { ReadTask } from '../types/tasks/taskTypes'

type Props = {
  tasks: ReadTask[]
}

const Tasks: VFC<Props> = ({ tasks }) => {
  const { data } = useQueryTasks(tasks)
  return (
    <Layout title="Task">
      <Stack spacing="5" align="center">
        <TaskForm />
        <OrderedList>
          {data?.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </OrderedList>
      </Stack>
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
