import { ReadTag } from '../../types/tasks/tagTypes'
import { useQuery } from 'react-query'
import { getTags } from '../../lib/tag'

export const useQueryTags = () => {
  const data = useQuery<ReadTag[], Error>({
    queryKey: 'tags',
    queryFn: getTags,
    staleTime: Infinity,
  })
  return data
}
