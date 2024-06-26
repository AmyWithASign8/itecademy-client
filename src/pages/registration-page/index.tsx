import {
  Alert,
  Button,
  Flex,
  PasswordInput,
  Text,
  TextInput
} from '@mantine/core'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthDataType, ErrorResponse } from '../../common/types/auth.interface'
import { IconAlertCircle, IconAt, IconLock } from '@tabler/icons-react'
import { registration } from '../../common/services/user/user'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import UserStore from '../../common/store/user'
import { User } from '../../common/store/user/user.interface'
import { useNavigate } from 'react-router-dom'
import { RegistrationPageProps } from './registration-page.interface'
import { setUserToLc } from '../../common/helpers/set-user-to-lc'

export const RegistrationPage = observer(
  ({ onRegistration }: RegistrationPageProps) => {
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<AuthDataType>()

    const [loading, setLoading] = useState(false)

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const [errorRepeatPasswordValidation, setErrorRepeatPasswordValidation] =
      useState(false)

    const [passwordInput, setPasswordInput] = useState('')
    const [repeatPasswordInput, setRepeatPasswordInput] = useState('')

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<AuthDataType> = async (data) => {
      if (passwordInput !== repeatPasswordInput) {
        setErrorRepeatPasswordValidation(true)
      } else {
        setErrorRepeatPasswordValidation(false)
        setLoading(true)
        setErrorMessage('')
        try {
          const response = await registration(data)

          UserStore.setUser = response as User
          UserStore.setIsAuth = true

          setUserToLc(response as User)
          navigate('/')
        } catch (error) {
          console.error(error)
          if ((error as ErrorResponse).response.data.message) {
            setErrorMessage((error as ErrorResponse).response.data.message)
          }
        } finally {
          setLoading(false)
          onRegistration?.()
        }
      }
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justify={'center'}>
          <Flex direction={'column'} w={550} gap={'sm'}>
            <TextInput
              size="md"
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
              label={'пароль'}
              size="md"
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
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <PasswordInput
              label={'повтор пароля'}
              size="md"
              error={errors.password?.message}
              placeholder="Повторите ваш пароль"
              icon={<IconLock size="1rem" />}
              value={repeatPasswordInput}
              onChange={(e) => setRepeatPasswordInput(e.target.value)}
            />
            <Button
              fullWidth
              color={'gray'}
              type="submit"
              loading={loading}
              size="md"
            >
              {'Зарегистрироваться'}
            </Button>
            {errorRepeatPasswordValidation && (
              <Alert icon={<IconAlertCircle />} title="Ошибка!" color="red">
                <Text size={'lg'}>Пароли должны совпадать!</Text>
              </Alert>
            )}
            {errorMessage && (
              <Alert icon={<IconAlertCircle />} title="Ошибка!" color="red">
                <Text size={'lg'}>{errorMessage}</Text>
              </Alert>
            )}
          </Flex>
        </Flex>
      </form>
    )
  }
)
