import { useMutation, useQueryClient } from 'react-query'
import Cookie from 'universal-cookie'
import { client } from '../../lib/templateUrl'
import { PostTask, ReadTask } from '../../types/tasks/taskTypes'

const cookie = new Cookie()

export const useAppMutation = () => {
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation(
    (task: PostTask) =>
      client.delete(`tasks/`, {
        json: {
          task,
        },
        headers: {
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      }),
    {
      onSuccess: (res: any, variables) => {
        const previousTasks = queryClient.getQueryData<ReadTask[]>('tasks')
        if (previousTasks) {
          queryClient.setQueryData('tasks', [
            ...previousTasks,
            res.json() as ReadTask,
          ])
        }
      },
    }
  )

  const updateTaskMutation = useMutation(
    (task: PostTask) =>
      client.delete(`tasks/${task.id}/`, {
        json: {
          task,
        },
        headers: {
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      }),
    {
      onSuccess: (res: any, variables) => {
        const previousTasks = queryClient.getQueryData<ReadTask[]>('tasks')
        if (previousTasks) {
          queryClient.setQueryData<ReadTask[]>(
            'tasks',
            previousTasks.map((task) =>
              task.id === variables.id ? (res.json() as ReadTask) : task
            )
          )
        }
      },
    }
  )

  const deleteTaskMutation = useMutation(
    (id: string) =>
      client.delete(`tasks/${id}/`, {
        headers: {
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      }),
    {
      onSuccess: (res, variables) => {
        const previousTasks = queryClient.getQueryData<ReadTask[]>('tasks')
        if (previousTasks) {
          queryClient.setQueryData<ReadTask[]>(
            'tasks',
            previousTasks.filter((task) => task.id !== variables)
          )
        }
      },
    }
  )

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation }
}
