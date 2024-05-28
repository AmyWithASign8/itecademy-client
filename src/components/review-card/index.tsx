import { Card, Center, Flex, Text } from '@mantine/core'
import { ReviewCardProps } from './review-card.interface'
import { IconUser } from '@tabler/icons-react'

export const ReviewCard = ({ data }: ReviewCardProps) => {
  console.log('review card', data)
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w={400}>
      <Flex align={'center'} gap={'lg'}>
        <Flex>
          <IconUser size={20} />
          <Text fw={'bold'}>{data.user.email}</Text>
        </Flex>
        <Text>оставил отзыв:</Text>
      </Flex>
      <Text>{data.review}</Text>
    </Card>
  )
}
