import { useQuery } from 'react-query'
import { getTasks } from '../../lib/task'
import { ReadTask } from '../../types/tasks/taskTypes'

export const useQueryTask = (tasks: ReadTask[]) => {
  const data = useQuery<ReadTask[], Error>({
    queryKey: 'tasks',
    queryFn: getTasks,
    staleTime: Infinity,
    initialData: tasks,
  })
  return data
}
