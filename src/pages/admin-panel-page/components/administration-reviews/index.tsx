import { observer } from 'mobx-react-lite'
import ReviewStore from '../../../../common/store/review'
import { ReviewCard } from '../../../../components/review-card'
import { Center, SimpleGrid, Text } from '@mantine/core'

export const AdministrationReviews = observer(() => {
  const { getReviews } = ReviewStore

  return (
    <Center>
      <SimpleGrid>
        {getReviews.length ? (
          getReviews.map((review) => (
            <ReviewCard data={review} administration />
          ))
        ) : (
          <Text>Нет ни одного отзыва</Text>
        )}
      </SimpleGrid>
    </Center>
  )
})
