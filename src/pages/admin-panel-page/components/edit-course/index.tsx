import { Button, Flex, Select, TextInput, Textarea } from '@mantine/core'
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
import { TEACHERS_SELECT_DATA } from '../../../../common/consts/teachers'

export const EditCourse = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EditCourseData>()

  const { getCourses } = CourseStore

  const [isLoading, setIsLoading] = useState(false)

  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  const [titleValue, setTitleValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [videoLinkInputValue, setVideoLinkInputValue] = useState('')

  const handleEditCourse = async () => {
    if (selectedCourse) {
      setIsLoading(true)
      await updateCourse({
        title: titleValue,
        description: descriptionValue,
        videoLink: videoLinkInputValue,
        id: selectedCourse,
        teacher: selecteTeacher ?? ''
      }).finally(() => {
        setIsLoading(false)
        setCurrentCourse(null)
        setSelectedCourse(null)
        setSelectedTeacher(null)
      })
      await getAllCourses()
    }
  }

  const [currentCourse, setCurrentCourse] = useState<CourseType | null>(null)
  const [selecteTeacher, setSelectedTeacher] = useState<string | null>(null)

  useEffect(() => {
    setCurrentCourse(
      getCourses.find((course) => course.id === selectedCourse) ?? null
    )
    if (currentCourse) {
      setTitleValue(currentCourse.title)
      setDescriptionValue(currentCourse.description)
      setVideoLinkInputValue(currentCourse.videoLink)
      setSelectedTeacher(currentCourse.teacher)
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
        value={String(selectedCourse)}
        onChange={(course) => setSelectedCourse(Number(course))}
        size="md"
      />
      {currentCourse && selectedCourse && (
        <form onSubmit={handleSubmit(handleEditCourse)}>
          <Flex direction={'column'} gap={'lg'}>
            <TextInput
              label={'название курса'}
              {...register('title', {
                required: 'Поле обязательно для заполнения'
              })}
              error={errors.title?.message}
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              size="md"
            />
            <Textarea
              label={'описание курса'}
              {...register('description')}
              error={errors.description?.message}
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
              autosize
              maxRows={25}
              size="md"
            />
            <TextInput
              label={'ссылка на видео'}
              {...register('videoLink')}
              error={errors.videoLink?.message}
              value={videoLinkInputValue}
              onChange={(e) => setVideoLinkInputValue(e.target.value)}
              size="md"
            />
            <Select
              label={'Выберите учителя'}
              data={TEACHERS_SELECT_DATA}
              size="md"
              value={selecteTeacher}
              onChange={(value) => setSelectedTeacher(value)}
            />
            <Button fullWidth type="submit" loading={isLoading} size="md">
              Обновить
            </Button>
          </Flex>
        </form>
      )}
    </>
  )
})
