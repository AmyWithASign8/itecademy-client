import { Button, Flex, TextInput } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { CreateCourseData } from './create-course.interface'
import {
  createCourse,
  getAllCourses
} from '../../../../common/services/course/course'
import { useState } from 'react'

export const CreateCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCourseData>()

  const [isLoading, setIsLoading] = useState(false)

  const handleCreateCourse = async (data: CreateCourseData) => {
    setIsLoading(true)
    await createCourse(data).finally(() => setIsLoading(false))
    await getAllCourses()
  }

  return (
    <form onSubmit={handleSubmit(handleCreateCourse)}>
      <Flex direction={'column'} gap={'lg'}>
        <TextInput
          label={'название курса'}
          {...register('title', {
            required: 'Название обязательно для заполнения'
          })}
          error={errors.title?.message}
        />
        <TextInput
          label={'описание курса'}
          {...register('description')}
          error={errors.description?.message}
        />
        <Button fullWidth type="submit" loading={isLoading}>
          Создать
        </Button>
      </Flex>
    </form>
  )
}
