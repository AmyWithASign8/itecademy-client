import { Button, Flex, PasswordInput, TextInput } from '@mantine/core'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AuthDataType } from '../../common/types/auth.interface'
import { IconAt, IconLock } from '@tabler/icons-react'

export const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthDataType>()

  const onSubmit: SubmitHandler<AuthDataType> = (data) => console.log(data)

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
          <Button fullWidth color={'gray'} type="submit">
            {'Зарегистрироваться'}
          </Button>
        </Flex>
      </Flex>
    </form>
  )
}
