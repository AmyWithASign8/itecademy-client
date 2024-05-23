import { Button, Flex, Image, Menu, Modal, Text } from '@mantine/core'
import LogoImg from '../../assets/logo1.png'
import LogoText from '../../assets/image1.png'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import UserStore from '../../common/store/user'
import {
  IconCircleCheck,
  IconLogout,
  IconPlaystationX,
  IconSettings,
  IconTrash,
  IconUser
} from '@tabler/icons-react'
import { useState } from 'react'

export const Header = observer(() => {
  const { getIsAuth, getUser } = UserStore

  const [openConfirmModal, setOpenConfirmModal] = useState(false)

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
          >
            {'Да'}
          </Button>
          <Button leftIcon={<IconPlaystationX size={20} />} color="red" w={120}>
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
        <Flex gap={'sm'}>
          {getUser?.role === 'admin' && (
            <Button color="gray" leftIcon={<IconSettings />}>
              {'Админ. панель'}
            </Button>
          )}
          {getIsAuth ? (
            <Menu>
              <Menu.Target>
                <Button leftIcon={<IconUser size={20} />} color={'gray'}>
                  {getUser?.email}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Flex direction={'column'}>
                  <Menu.Item
                    icon={<IconLogout size={20} />}
                    onClick={UserStore.reset}
                  >
                    {'Выйти'}
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    icon={<IconTrash size={20} />}
                    onClick={() => setOpenConfirmModal(true)}
                  >
                    {'Удалить аккаунт'}
                  </Menu.Item>
                </Flex>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <>
              <Button component={Link} to={'/login'} color="gray">
                {'Войти'}
              </Button>
              <Button component={Link} to={'/registration'} color="gray">
                {'Зарегистрироваться'}
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </>
  )
})
