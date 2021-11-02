import { useQuery } from 'react-query'
import { getTask } from '../../lib/task'
import { ReadTask } from '../../types/tasks/taskTypes'

export const useQueryTask = (task: ReadTask) => {
  const data = useQuery<ReadTask, Error>({
    queryKey: 'task',
    queryFn: () => getTask(task.id),
    staleTime: 0,
    initialData: task,
  })
  return data
}
