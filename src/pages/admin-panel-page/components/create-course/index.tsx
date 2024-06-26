import {
  Alert,
  Button,
  Flex,
  TextInput,
  Textarea,
  Text,
  Select
} from '@mantine/core'
import { useForm } from 'react-hook-form'
import { CreateCourseData } from './create-course.interface'
import {
  createCourse,
  getAllCourses
} from '../../../../common/services/course/course'
import { useState } from 'react'
import { IconAlertCircle } from '@tabler/icons-react'
import { ErrorResponse } from '../../../../common/types/auth.interface'
import { TEACHERS_SELECT_DATA } from '../../../../common/consts/teachers'

export const CreateCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCourseData>()

  const [isLoading, setIsLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [titleInputValue, setTitleInputValue] = useState('')
  const [descriptionInputValue, setDescriptionInputValue] = useState('')
  const [videoLinkInputValue, setVideoLinkInputValue] = useState('')
  const [selecteTeacher, setSelectedTeacher] = useState<string | null>(null)

  const handleCreateCourse = async (data: CreateCourseData) => {
    setIsLoading(true)
    try {
      await createCourse({ ...data, teacher: selecteTeacher ?? '' })
      setErrorMessage(null)
      setTitleInputValue('')
      setDescriptionInputValue('')
      setVideoLinkInputValue('')
      setSelectedTeacher(null)
    } catch (error) {
      if ((error as ErrorResponse).response.data.message) {
        setErrorMessage((error as ErrorResponse).response.data.message)
      }
    } finally {
      setIsLoading(false)
    }
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
          value={titleInputValue}
          onChange={(e) => setTitleInputValue(e.target.value)}
          size="md"
        />
        <Textarea
          label={'описание курса'}
          {...register('description')}
          error={errors.description?.message}
          autosize
          maxRows={25}
          value={descriptionInputValue}
          onChange={(e) => setDescriptionInputValue(e.target.value)}
          size="md"
        />
        <TextInput
          label={'ссылка на видео'}
          {...register('videoLink', {
            pattern: {
              // eslint-disable-next-line no-useless-escape
              value: /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
              message: 'неверный формат'
            }
          })}
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
          Создать
        </Button>
        {errorMessage && (
          <Alert
            mt={100}
            icon={<IconAlertCircle size="1rem" />}
            title="Ошибка!"
            color="red"
          >
            <Text>{errorMessage}</Text>
          </Alert>
        )}
      </Flex>
    </form>
  )
}
