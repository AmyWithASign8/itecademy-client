import { Button, Card, Flex, Text } from '@mantine/core'
import { ReviewCardProps } from './review-card.interface'
import { IconUserCircle } from '@tabler/icons-react'
import { observer } from 'mobx-react-lite'
import {
  deleteReview,
  getAllReviews
} from '../../common/services/review/review'

export const ReviewCard = observer(
  ({ data, administration = false }: ReviewCardProps) => {
    const handleDeleteReview = () => {
      deleteReview(data.id).finally(() => getAllReviews())
    }

    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder w={800}>
        <Flex justify={'space-between'} align={'center'}>
          <div
            style={{
              wordWrap: 'break-word',
              overflow: 'auto',
              overflowWrap: 'break-word',
              maxHeight: 500
            }}
          >
            <Flex align={'center'} gap={'lg'}>
              <Flex gap={'xs'} align={'center'}>
                <IconUserCircle />
                <Text fw={'bold'}>{data.user.email}</Text>
              </Flex>
              <Text>оставил отзыв:</Text>
            </Flex>
            <Text>{data.review}</Text>
          </div>
          {administration && (
            <Button color="red" onClick={handleDeleteReview}>
              Удалить
            </Button>
          )}
        </Flex>
      </Card>
    )
  }
)
