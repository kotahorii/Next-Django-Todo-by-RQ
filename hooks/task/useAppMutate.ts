import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Cookie from 'universal-cookie'
import { apiUrl, client } from '../../lib/templateUrl'
import { PostTask, ReadTask } from '../../types/tasks/taskTypes'

const cookie = new Cookie()

export const useAppMutation = () => {
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation(
    (task: Omit<PostTask, 'id'>) =>
      axios.post<ReadTask>(`${apiUrl}/tasks/`, task, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      }),
    {
      onSuccess: (res) => {
        const previousTasks = queryClient.getQueryData<ReadTask[]>('tasks')
        if (previousTasks) {
          queryClient.setQueryData('tasks', [...previousTasks, res.data])
        }
      },
    }
  )

  const updateTaskMutation = useMutation(
    (task: PostTask) =>
      axios.put<ReadTask>(`${apiUrl}/tasks/${task.id}/`, task, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      }),
    {
      onSuccess: (res, variables) => {
        const previousTasks = queryClient.getQueryData<ReadTask[]>('tasks')
        if (previousTasks) {
          queryClient.setQueryData<ReadTask[]>(
            'tasks',
            previousTasks.map((task) =>
              task.id === variables.id ? res.data : task
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
