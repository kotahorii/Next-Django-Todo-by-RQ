import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  resetEditedTask,
  selectEditedBook,
  setEditedTask,
} from '../../features/tasks/taskSlice'

export const useEditedTask = () => {
  const dispatch = useAppDispatch()
  const editedTask = useAppSelector(selectEditedBook)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name
    let value = e.target.value
    dispatch(setEditedTask({ ...editedTask, [name]: value }))
  }
  const resetInput = () => {
    dispatch(resetEditedTask())
  }
  const handleSelectTag = (e: ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as string
    const name = e.target.value as number
    dispatch(setEditedTask({ ...editedTask, [name]: value }))
  }
  return {
    handleInputChange,
    handleSelectTag,
    resetInput,
    editedTask,
    dispatch
  }
}
