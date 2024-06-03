import {
  Alert,
  Button,
  Center,
  Flex,
  Modal,
  SimpleGrid,
  Tabs,
  Text,
  Textarea,
  Title
} from '@mantine/core'
import { Card } from '../../components/card/card'
import CourseStore from '../../common/store/course'
import UserStore from '../../common/store/user'
import ReviewStore from '../../common/store/review'
import { observer } from 'mobx-react-lite'
import { IconAlertCircle, IconHeartFilled } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AuthModal } from '../../components/auth-modal'
import { useForm } from 'react-hook-form'
import {
  createReview,
  getAllReviews
} from '../../common/services/review/review'
import { ReviewCard } from '../../components/review-card'
import { notifications } from '@mantine/notifications'

export const GeneralPage = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ review: string }>()

  const { getCourses } = CourseStore
  const { getIsAuth, getUser } = UserStore
  const { getReviews } = ReviewStore

  const myCourses = getCourses.filter((course) =>
    course.userServices.find(
      (userService) => userService.userId === getUser?.id
    )
  )

  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false)
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false)

  const [reviewInput, setReviewInput] = useState('')

  const handleCreateReview = () => {
    if (!getIsAuth) {
      setIsOpenAuthModal(true)
      return
    }

    setIsOpenReviewModal(true)
  }

  const sendReview = async (data: { review: string }) => {
    await createReview({ review: data.review, userId: getUser!.id }).finally(
      () => {
        setReviewInput('')
        setIsOpenReviewModal(false)
        notifications.show({
          title: 'Спасибо!',
          message: 'Спасибо за ваш отзыв!',
          color: 'gray',
          icon: <IconHeartFilled color="red" />
        })
      }
    )
    await getAllReviews()
  }

  return (
    <>
      <Center>
        <Title
          order={2}
          align="center"
          w={700}
          bg={'rgb(0, 0, 0, 0.5)'}
          p={20}
          style={{ borderRadius: 10 }}
        >
          ITECADEMY гарантирует трудоустройство студентам, которые освоили
          программу обучения. Если у вас не получится найти работу, мы вернем
          деньги за программу
        </Title>
      </Center>
      {!getIsAuth && (
        <Center>
          <Alert
            mt={100}
            icon={<IconAlertCircle />}
            title="Внимание!"
            color="cyan"
            w={'50%'}
          >
            <Text size={'lg'}>
              Авторизованный пользователь получает повышенную безопасность,
              доступ к персонализированному контенту и функциям. Это улучшает
              удобство и качество взаимодействия с платформой.
            </Text>
            <Flex justify={'space-around'} mt={30}>
              <Button
                w={'35%'}
                component={Link}
                to={'/login'}
                color="cyan"
                size="md"
              >
                {'Войти'}
              </Button>
              <Button
                w={'35%'}
                component={Link}
                to={'/registration'}
                color="cyan"
                size="md"
              >
                {'Зарегистрироваться'}
              </Button>
            </Flex>
          </Alert>
        </Center>
      )}

      {getIsAuth ? (
        <Tabs defaultValue="all-courses" mt={50} variant="pills" color="gray">
          <Tabs.List position="center">
            <Tabs.Tab value="all-courses">
              <Text size={'lg'}>Все курсы</Text>
            </Tabs.Tab>

            <Tabs.Tab value="my-courses" disabled={!myCourses.length}>
              <Text size={'lg'}>Мои курсы</Text>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all-courses">
            <SimpleGrid cols={3} p={'md'}>
              {getCourses.map((course) => (
                <Card data={course} />
              ))}
            </SimpleGrid>
          </Tabs.Panel>
          <Tabs.Panel value="my-courses">
            <SimpleGrid cols={3} p={'md'}>
              {myCourses.map((course) => (
                <Card data={course} />
              ))}
            </SimpleGrid>
          </Tabs.Panel>
        </Tabs>
      ) : (
        <SimpleGrid cols={3} p={'md'} mt={100}>
          {getCourses.map((course) => (
            <Card data={course} />
          ))}
        </SimpleGrid>
      )}

      {getReviews.length ? (
        <Center>
          <SimpleGrid mt={20}>
            <Title order={1}>Отзывы:</Title>
            {getReviews.map((review) => (
              <ReviewCard data={review} />
            ))}
          </SimpleGrid>
        </Center>
      ) : null}
      <Center mt={10}>
        <Button color="gray" onClick={handleCreateReview} size="lg">
          Оставить отзыв
        </Button>
      </Center>
      <AuthModal
        opened={isOpenAuthModal}
        onClose={() => setIsOpenAuthModal(false)}
      />
      <Modal
        opened={isOpenReviewModal}
        onClose={() => setIsOpenReviewModal(false)}
        centered
        title={'Создание отзыва'}
      >
        <form onSubmit={handleSubmit(sendReview)}>
          <Flex direction={'column'} gap={'xl'}>
            <Textarea
              label={'сообщение'}
              placeholder="введите сообщение"
              {...register('review', {
                required: 'обязательно для заполнения'
              })}
              error={errors.review?.message}
              autosize
              maxRows={20}
              value={reviewInput}
              onChange={(e) => setReviewInput(e.target.value)}
              size="md"
            />
            <Button color={'green'} fullWidth type="submit" size="md">
              Отправить
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  )
})
