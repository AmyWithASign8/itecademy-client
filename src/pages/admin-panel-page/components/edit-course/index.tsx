import { Button, Flex, Select, TextInput } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import CourseStore from '../../../../common/store/course'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CourseType } from '../../../../common/store/course/course.interface'
import {
  getAllCourses,
  updateCourse
} from '../../../../common/services/course/course'
import { EditCourseData } from './edit-course.interface'

export const EditCourse = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditCourseData>()

  const { getCourses } = CourseStore

  const [isLoading, setIsLoading] = useState(false)

  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  const handleEditCourse = async (data: EditCourseData) => {
    if (selectedCourse) {
      setIsLoading(true)
      await updateCourse({ ...data, id: selectedCourse }).finally(() =>
        setIsLoading(false)
      )
      await getAllCourses()
    }
  }

  const [currentCourse, setCurrentCourse] = useState<CourseType | null>(null)

  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')

  useEffect(() => {
    setCurrentCourse(
      getCourses.find((course) => course.id === selectedCourse) ?? null
    )
    if (currentCourse) {
      setTitleValue(currentCourse.title)
      setDescriptionValue(currentCourse.description)
    }
  }, [selectedCourse, getCourses, currentCourse])

  return (
    <>
      <Select
        label={'Выберите курс'}
        data={getCourses.map((course) => ({
          value: String(course.id),
          label: course.title
        }))}
        onChange={(course) => setSelectedCourse(Number(course))}
      />
      {currentCourse && selectedCourse && (
        <form onSubmit={handleSubmit(handleEditCourse)}>
          <Flex direction={'column'} gap={'lg'}>
            <TextInput
              label={'название курса'}
              {...register('title', {
                required: 'Название обязательно для заполнения'
              })}
              error={errors.title?.message}
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
            <TextInput
              label={'описание курса'}
              {...register('description')}
              error={errors.description?.message}
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
            />
            <Button fullWidth type="submit" loading={isLoading}>
              Обновить
            </Button>
          </Flex>
        </form>
      )}
    </>
  )
})
