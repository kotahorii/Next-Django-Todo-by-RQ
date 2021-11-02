import { useQuery } from 'react-query'
import { getTasks } from '../../lib/task'
import { ReadTask } from '../../types/tasks/taskTypes'

export const useQueryTasks = (tasks: ReadTask[]) => {
  const data = useQuery<ReadTask[], Error>({
    queryKey: 'tasks',
    queryFn: getTasks,
    staleTime: 0,
    initialData: tasks,
  })
  return data
}
