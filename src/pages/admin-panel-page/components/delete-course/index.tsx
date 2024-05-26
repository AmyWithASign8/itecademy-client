import { Button, Flex, Select } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import CourseStore from '../../../../common/store/course'
import {
  deleteCourse,
  getAllCourses
} from '../../../../common/services/course/course'

export const DeleteCourse = observer(() => {
  const { getCourses } = CourseStore

  const [isLoading, setIsLoading] = useState(false)

  const [selectedCourse, setSelectedCourse] = useState<number | null>(null)

  const handleDeleteCourse = async () => {
    if (selectedCourse) {
      setIsLoading(true)
      await deleteCourse(selectedCourse).finally(() => setIsLoading(false))
      await getAllCourses()
      setSelectedCourse(null)
    }
  }

  return (
    <Flex direction={'column'} gap={'xl'}>
      <Select
        label={'Выберите курс'}
        data={getCourses.map((course) => ({
          value: String(course.id),
          label: course.title
        }))}
        value={String(selectedCourse)}
        onChange={(course) => setSelectedCourse(Number(course))}
      />
      <Button
        color={'red'}
        disabled={!selectedCourse}
        fullWidth
        loading={isLoading}
        onClick={handleDeleteCourse}
      >
        Удалить
      </Button>
    </Flex>
  )
})
