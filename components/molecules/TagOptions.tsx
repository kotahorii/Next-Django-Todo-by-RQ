import { Select } from '@chakra-ui/select'
import { VFC } from 'react'
import styles from '../../styles/TagOption.module.css'
import { useQueryTags } from '../../hooks/task/useQueryTags'
import { useEditedTask } from '../../hooks/task/useEditedTask'

export const TagOptions: VFC = () => {
  const { data: tags } = useQueryTags()
  const { handleSelectTag, editedTask } = useEditedTask()
  return (
    <Select
      name="tag"
      value={editedTask.tag}
      onChange={handleSelectTag}
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
