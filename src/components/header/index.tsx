import { Button, Flex, Image } from '@mantine/core'
import LogoImg from '../../assets/logo1.png'
import LogoText from '../../assets/image1.png'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <Flex
      justify={'space-between'}
      align={'center'}
      style={{ padding: 10, width: '100%', zIndex: 2, top: 0 }}
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
        <Button component={Link} to={'/login'} color="gray">
          {'Войти'}
        </Button>
        <Button component={Link} to={'/registration'} color="gray">
          {'Зарегистрироваться'}
        </Button>
      </Flex>
    </Flex>
  )
}
