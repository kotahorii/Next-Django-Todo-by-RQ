import { ChangeEvent } from 'react'
import { atom, useRecoilState } from 'recoil'

export const editedTaskState = atom({
  key: 'editedState',
  default: { id: '', title: '', content: '', tag: '' },
})

export const useEditedTask = () => {
  const [editedTask, setEditedTask] = useRecoilState(editedTaskState)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name
    let value = e.target.value
    setEditedTask({ ...editedTask, [name]: value })
  }
  const resetInput = () => {
    setEditedTask({ id: '', title: '', content: '', tag: '' })
  }
  return { handleInputChange, resetInput, editedTask, setEditedTask }
}
