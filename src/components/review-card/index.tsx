import { Button, Card, Flex, Text, Title } from '@mantine/core'
import { ReviewCardProps } from './review-card.interface'
import { IconUserCircle } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import {
  deleteReview,
  getAllReviews
} from '../../common/services/review/review'
import { useMemo } from 'react'

export const ReviewCard = observer(
  ({ data, administration = false }: ReviewCardProps) => {
    const handleDeleteReview = () => {
      deleteReview(data.id).finally(() => getAllReviews())
    }

    const normalizeDateTime = useMemo(() => {
      const date = new Date(data.createdAt)

      const time = date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      })

      const formattedDate = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })

      return `${time} ${formattedDate}`
    }, [data.createdAt])

    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder w={800}>
        <Flex gap={'lg'} direction={'column'}>
          <Flex align={'center'} gap={'lg'} justify={'space-between'}>
            <Flex gap={'md'}>
              {data.user.role === 'admin' ? (
                <Title order={3}>Адмнинистрация</Title>
              ) : (
                <Flex gap={'xs'}>
                  <IconUserCircle size={'30px'} />
                  <Title order={3}>{data.user.email}</Title>
                </Flex>
              )}

              {data.user.role === 'user' && (
                <Text size={'lg'}>оставил отзыв:</Text>
              )}
            </Flex>
            <Text>{normalizeDateTime}</Text>
          </Flex>
          <div
            style={{
              wordWrap: 'break-word',
              overflow: 'auto',
              overflowWrap: 'break-word',
              maxHeight: 500
            }}
          >
            <Text size={'lg'}>{data.review}</Text>
          </div>
          {administration && (
            <Button color="red" onClick={handleDeleteReview} size="md">
              Удалить
            </Button>
          )}
        </Flex>
      </Card>
    )
  }
)
