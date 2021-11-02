import { ReadTag } from '../types/tasks/tagTypes'
import { client } from './templateUrl'

export const getTags = async () => {
  const tags = (await client.get('list-tag/').json()) as ReadTag[]
  return tags
}
export const getTagIds = async () => {
  const tags = (await client.get('list-tag/').json()) as ReadTag[]
  return tags.map((tag) => {
    return {
      params: {
        id: tag.id,
      },
    }
  })
}
export const getTag = async (id: string | string[]) => {
  const tag = (await client.get(`detail-tag/${id}`).json()) as ReadTag
  return tag
}
