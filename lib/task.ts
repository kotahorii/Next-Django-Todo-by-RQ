import { ReadTask } from '../types/tasks/taskTypes'
import { client } from './templateUrl'

export const getTasks = async () => {
  const tasks = (await client.get('list-task/').json()) as ReadTask[]
  return tasks
}
export const getTaskIds = async () => {
  const tasks = (await client.get('list-task/').json()) as ReadTask[]
  return tasks.map((task) => {
    return {
      params: {
        id: task.id,
      },
    }
  })
}
export const getTask = async (id: string | string[]) => {
  const task = (await client.get(`detail-task/${id}`).json()) as ReadTask
  return task
}
