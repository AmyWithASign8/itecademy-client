import { Center, Flex, Modal, Text } from '@mantine/core'
import { AuthModalProps } from './auth-modal.interface'
import { useState } from 'react'
import { LoginPage, RegistrationPage } from '../../pages'

export const AuthModal = ({ onClose, opened }: AuthModalProps) => {
  const [isSignIn, setIsSignIn] = useState(true)

  return (
    <Modal title={'Авторизация'} centered onClose={onClose} opened={opened}>
      {isSignIn ? (
        <LoginPage onLogin={onClose} />
      ) : (
        <RegistrationPage onRegistration={onClose} />
      )}
      <Center>
        {!isSignIn ? (
          <Flex align={'center'}>
            <Text>У вас уже есть аккаунт?</Text>
            <Text
              color="blue"
              onClick={() => setIsSignIn(true)}
              style={{ cursor: 'pointer' }}
              underline
            >
              Войти
            </Text>
          </Flex>
        ) : (
          <Flex align={'center'}>
            <Text>У вас еще нет аккаунта?</Text>
            <Text
              color="blue"
              onClick={() => setIsSignIn(false)}
              style={{ cursor: 'pointer' }}
              underline
            >
              Зарегестрировать
            </Text>
          </Flex>
        )}
      </Center>
    </Modal>
  )
}
