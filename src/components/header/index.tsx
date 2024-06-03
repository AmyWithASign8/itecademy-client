import {
  Burger,
  Button,
  Drawer,
  Flex,
  Image,
  Menu,
  Modal,
  Text
} from '@mantine/core'
import LogoImg from '../../assets/logo1.png'
import LogoText from '../../assets/image1.png'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import UserStore from '../../common/store/user'
import {
  IconBrain,
  IconCircleCheck,
  IconInfoCircle,
  IconLogout,
  IconPlaystationX,
  IconSettings,
  IconTrash,
  IconUser
} from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import { deleteAccount } from '../../common/services/user/user'
import { useScreenSize } from '../../common/hooks/use-screen-size'

export const Header = observer(() => {
  const { getIsAuth, getUser } = UserStore

  const navigate = useNavigate()

  const screenSize = useScreenSize()

  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false)

  const isAdapted = useMemo(() => {
    if (screenSize < 1200) {
      return true
    }

    return false
  }, [screenSize])

  const [openConfirmModal, setOpenConfirmModal] = useState(false)

  const logout = () => {
    UserStore.reset()
    navigate('/')
  }

  const deleteAcc = async () => {
    await deleteAccount(getUser!.id)
    UserStore.reset()
    setOpenConfirmModal(false)
  }

  return (
    <>
      <Modal
        opened={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        title={'Подтвердите действие'}
        centered
      >
        <Text>
          {
            'Вы уверены что хотите удалить свой аккаунт? Отменить это действие будет невозможно'
          }
        </Text>
        <Flex justify={'space-around'} mt={10}>
          <Button
            leftIcon={<IconCircleCheck size={20} />}
            color="green"
            w={120}
            onClick={deleteAcc}
          >
            {'Да'}
          </Button>
          <Button
            leftIcon={<IconPlaystationX size={20} />}
            color="red"
            w={120}
            onClick={() => setOpenConfirmModal(false)}
          >
            {'Нет'}
          </Button>
        </Flex>
      </Modal>
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
        {isAdapted ? (
          <>
            <Drawer
              opened={isOpenBurgerMenu}
              onClose={() => setIsOpenBurgerMenu(false)}
            >
              <Flex gap={'sm'} direction={'column'}>
                <Button
                  color="gray"
                  leftIcon={<IconBrain />}
                  component={Link}
                  to={'/teachers'}
                  size="md"
                >
                  Преподаватели
                </Button>
                <Button
                  color="gray"
                  leftIcon={<IconInfoCircle />}
                  component={Link}
                  to={'/about-us'}
                  size="md"
                >
                  О нас
                </Button>
                {getUser?.role === 'admin' && (
                  <Button
                    color="gray"
                    leftIcon={<IconSettings />}
                    component={Link}
                    to={'/admin-panel'}
                    size="md"
                  >
                    Админ. панель
                  </Button>
                )}
                {getIsAuth ? (
                  <Menu>
                    <Menu.Target>
                      <Button
                        leftIcon={<IconUser size={20} />}
                        color={'gray'}
                        size="md"
                      >
                        {getUser?.email}
                      </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Flex direction={'column'}>
                        <Menu.Item icon={<IconLogout />} onClick={logout}>
                          <Text size="md">Выйти</Text>
                        </Menu.Item>
                        {getUser?.role === 'user' && (
                          <Menu.Item
                            color="red"
                            icon={<IconTrash />}
                            onClick={() => setOpenConfirmModal(true)}
                          >
                            <Text size={'md'}>Удалить аккаунт</Text>
                          </Menu.Item>
                        )}
                      </Flex>
                    </Menu.Dropdown>
                  </Menu>
                ) : (
                  <>
                    <Button
                      component={Link}
                      to={'/login'}
                      color="gray"
                      size="md"
                    >
                      Войти
                    </Button>
                    <Button
                      component={Link}
                      to={'/registration'}
                      color="gray"
                      size="md"
                    >
                      Зарегистрироваться
                    </Button>
                  </>
                )}
              </Flex>
            </Drawer>
            <Burger
              opened={isOpenBurgerMenu}
              onClick={() => setIsOpenBurgerMenu((prev) => !prev)}
            />
          </>
        ) : (
          <Flex gap={'sm'}>
            <Button
              color="gray"
              leftIcon={<IconBrain />}
              component={Link}
              to={'/teachers'}
              size="md"
            >
              Преподаватели
            </Button>
            <Button
              color="gray"
              leftIcon={<IconInfoCircle />}
              component={Link}
              to={'/about-us'}
              size="md"
            >
              О нас
            </Button>
            {getUser?.role === 'admin' && (
              <Button
                color="gray"
                leftIcon={<IconSettings />}
                component={Link}
                to={'/admin-panel'}
                size="md"
              >
                Админ. панель
              </Button>
            )}
            {getIsAuth ? (
              <Menu>
                <Menu.Target>
                  <Button
                    leftIcon={<IconUser size={20} />}
                    color={'gray'}
                    size="md"
                  >
                    {getUser?.email}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Flex direction={'column'}>
                    <Menu.Item icon={<IconLogout />} onClick={logout}>
                      <Text size="md">Выйти</Text>
                    </Menu.Item>
                    {getUser?.role === 'user' && (
                      <Menu.Item
                        color="red"
                        icon={<IconTrash />}
                        onClick={() => setOpenConfirmModal(true)}
                      >
                        <Text size={'md'}>Удалить аккаунт</Text>
                      </Menu.Item>
                    )}
                  </Flex>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <>
                <Button component={Link} to={'/login'} color="gray" size="md">
                  Войти
                </Button>
                <Button
                  component={Link}
                  to={'/registration'}
                  color="gray"
                  size="md"
                >
                  Зарегистрироваться
                </Button>
              </>
            )}
          </Flex>
        )}
      </Flex>
    </>
  )
})
