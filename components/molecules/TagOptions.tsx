import { ReadTag } from '../../types/tasks/tagTypes'
import { Select } from '@chakra-ui/select'
import { VFC } from 'react'
import { useQuery } from 'react-query'
import styles from '../../styles/TagOption.module.css'
import { getTags } from '../../lib/tag'
import { useQueryTags } from '../../hooks/task/useQueryTags'
import { useRecoilValue } from 'recoil'
import { editedTaskState } from '../../hooks/task/useEditedTask'

export const TagOptions: VFC = () => {
  const { data: tags } = useQueryTags()
  const editedTask = useRecoilValue(editedTaskState)
  return (
    <Select
      name="tag"
      value={editedTask.tag}
      color="gray.500"
      placeholder="Tag"
    >
      {tags?.map((tag) => (
        <option key={tag.id} className={styles.option} value={tag.id}>
          {tag.name}
        </option>
      ))}
    </Select>
  )
}
