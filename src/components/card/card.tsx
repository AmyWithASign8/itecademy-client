import { IconWriting } from '@tabler/icons-react'
import { CardProps } from './card.interface'
import {
  Box,
  Button,
  Flex,
  Card as MantineCard,
  Modal,
  Text
} from '@mantine/core'
import { getAllCourses, subscribe } from '../../common/services/course/course'
import { observer } from 'mobx-react-lite'
import UserStore from '../../common/store/user'
import { useState } from 'react'
import { AuthModal } from '../auth-modal'

export const Card = observer(({ data }: CardProps) => {
  const { title, description } = data

  const { getUser, getIsAuth } = UserStore

  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false)
  const [isOpenFullCardModal, setIsOpenFullCardModal] = useState(false)

  const handleSubscribe = async () => {
    if (!getIsAuth) {
      setIsOpenFullCardModal(false)
      setIsOpenAuthModal(true)
      return
    }

    await subscribe({ userId: getUser!.id, serviceId: data.id }).finally(() =>
      setIsOpenFullCardModal(false)
    )
    await getAllCourses()
  }

  const currentData = data.userServices.find(
    (obj) => obj.userId === getUser?.id
  )

  return (
    <>
      <AuthModal
        onClose={() => setIsOpenAuthModal(false)}
        opened={isOpenAuthModal}
      />
      <Modal
        onClose={() => setIsOpenFullCardModal(false)}
        opened={isOpenFullCardModal}
        centered
        title={'Карточка курса'}
        size={'xl'}
      >
        <Flex direction={'column'}>
          <Text fw={'bold'} size={'lg'}>
            {title}
          </Text>
          <Text fw={'bold'} style={{ wordWrap: 'break-word' }}>
            {description}
          </Text>
          {getIsAuth && currentData ? (
            <Button leftIcon={<IconWriting />} color="green" fullWidth disabled>
              {'Вы уже записаны'}
            </Button>
          ) : (
            <Button
              leftIcon={<IconWriting />}
              color="green"
              fullWidth
              // disabled={!getIsAuth}
              onClick={handleSubscribe}
            >
              {'Записаться'}
            </Button>
          )}
        </Flex>
      </Modal>
      <MantineCard shadow="sm" padding="lg" radius="md" withBorder>
        <MantineCard.Section p={'sm'}>
          <Text fw={'bold'} size={'lg'}>
            {title}
          </Text>
        </MantineCard.Section>
        <MantineCard.Section p={'md'}>
          <Text
            fw={'bold'}
            style={{ width: 400, textOverflow: 'ellipsis', overflow: 'hidden' }}
          >
            {description}
          </Text>
        </MantineCard.Section>
        <Button
          color="gray"
          fullWidth
          // disabled={!getIsAuth}
          onClick={() => setIsOpenFullCardModal(true)}
        >
          {'Открыть'}
        </Button>
      </MantineCard>
    </>
  )
})
