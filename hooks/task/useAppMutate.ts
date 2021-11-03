import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import Cookie from 'universal-cookie'
import { useAppDispatch } from '../../app/hooks'
import { resetEditedTask } from '../../features/tasks/taskSlice'
import { apiUrl, client } from '../../lib/templateUrl'
import { PostTask, ReadTask } from '../../types/tasks/taskTypes'

const cookie = new Cookie()

export const useAppMutation = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

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
        dispatch(resetEditedTask())
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
        dispatch(resetEditedTask())
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
        dispatch(resetEditedTask())
      },
    }
  )

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation }
}
