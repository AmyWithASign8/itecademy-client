import { Button, Flex, Input, PasswordInput } from '@mantine/core'

export const RegistrationPage = () => {
  return (
    <>
      <Flex justify={'center'}>
        <div style={{ width: 350 }}>
          <Input.Wrapper label={'email'}>
            <Input placeholder="example@mail.com" />
          </Input.Wrapper>
          <Input.Wrapper label={'пароль'}>
            <PasswordInput />
          </Input.Wrapper>
          <Button mt={20} fullWidth color={'gray'}>
            {'Зарегистрироваться'}
          </Button>
        </div>
      </Flex>
    </>
  )
}
