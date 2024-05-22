import { Button, Flex, Image } from '@mantine/core'
import LogoImg from '../../assets/logo1.png'
import LogoText from '../../assets/image1.png'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <Flex
      justify={'space-between'}
      align={'center'}
      style={{ padding: 10, width: '100%' }}
      bg={'#000'}
      pos={'fixed'}
    >
      <Link to={'/'}>
        <Flex>
          <Image src={LogoImg} width={50} />
          <Image src={LogoText} width={200} />
        </Flex>
      </Link>
      <Flex gap={'sm'}>
        <Button>{'Войти'}</Button>
        <Button>{'Зарегистрироваться'}</Button>
      </Flex>
    </Flex>
  )
}
