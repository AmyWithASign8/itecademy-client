import { Alert, Button, Flex, PasswordInput, TextInput } from '@mantine/core'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthDataType, ErrorResponse } from '../../common/types/auth.interface'
import { IconAlertCircle, IconAt, IconLock } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserStore from '../../common/store/user'
import { login } from '../../common/services/user/user'
import { User } from '../../common/store/user/user.interface'

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthDataType>()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit: SubmitHandler<AuthDataType> = async (data) => {
    setLoading(true)
    setErrorMessage('')
    try {
      const response = await login(data)

      UserStore.setUser = response as User
      UserStore.setIsAuth = true
      navigate('/')
    } catch (error) {
      console.error(error)
      if ((error as ErrorResponse).response.data.message) {
        setErrorMessage((error as ErrorResponse).response.data.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex justify={'center'}>
        <Flex direction={'column'} w={350} gap={'sm'}>
          <TextInput
            error={errors.email?.message}
            {...register('email', {
              required: 'email обязателен для заполнения',
              maxLength: 60,
              pattern: {
                value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                message: 'Неверный формат email'
              }
            })}
            label="email"
            placeholder="example@mail.com"
            icon={<IconAt />}
          />
          <PasswordInput
            error={errors.password?.message}
            {...register('password', {
              required: 'Пароль обязателен для заполнения',
              minLength: {
                value: 8,
                message: 'не менее 8 символов'
              },
              maxLength: {
                value: 12,
                message: 'не более 12 символов'
              },
              pattern: /[^А-Яа-я0-9]/
            })}
            placeholder="Введите ваш пароль"
            icon={<IconLock size="1rem" />}
          />
          <Button fullWidth color={'gray'} type="submit" loading={loading}>
            {'Войти'}
          </Button>
          {errorMessage && (
            <Alert
              icon={<IconAlertCircle size="1rem" />}
              title="Ошибка!"
              color="red"
            >
              {'Неправильный логин или пароль'}
            </Alert>
          )}
        </Flex>
      </Flex>
    </form>
  )
}
