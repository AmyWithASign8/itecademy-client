import { IconWriting } from '@tabler/icons-react'
import { CardProps } from './card.interface'
import { Button, Card as MantineCard, Text } from '@mantine/core'
import { getAllCourses, subscribe } from '../../common/services/course/course'
import { observer } from 'mobx-react-lite'
import UserStore from '../../common/store/user'

export const Card = observer(({ data }: CardProps) => {
  const { title, description } = data

  const { getUser, getIsAuth } = UserStore

  const handleSubscribe = () => {
    subscribe({ userId: getUser!.id, serviceId: data.id })
    getAllCourses()
  }

  const currentData = data.userServices.find(
    (obj) => obj.userId === getUser?.id
  )

  console.log(currentData)

  return (
    <MantineCard shadow="sm" padding="lg" radius="md" withBorder>
      <MantineCard.Section p={'sm'}>
        <Text fw={'bold'} size={'lg'}>
          {title}
        </Text>
      </MantineCard.Section>
      <MantineCard.Section p={'md'}>
        <Text fw={'bold'}>{description}</Text>
      </MantineCard.Section>
      {currentData ? (
        <Button leftIcon={<IconWriting />} color="green" fullWidth disabled>
          {'Вы уже записаны'}
        </Button>
      ) : (
        <Button
          leftIcon={<IconWriting />}
          color="green"
          fullWidth
          disabled={!getIsAuth}
          onClick={handleSubscribe}
        >
          {'Записаться'}
        </Button>
      )}
    </MantineCard>
  )
})
