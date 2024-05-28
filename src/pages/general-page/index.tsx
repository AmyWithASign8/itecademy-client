import {
  Alert,
  Button,
  Center,
  Flex,
  Modal,
  SimpleGrid,
  Tabs,
  Text,
  TextInput
} from '@mantine/core'
import { Card } from '../../components/card/card'
import CourseStore from '../../common/store/course'
import UserStore from '../../common/store/user'
import ReviewStore from '../../common/store/review'
import { observer } from 'mobx-react-lite'
import { IconAlertCircle } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { AuthModal } from '../../components/auth-modal'
import { useForm } from 'react-hook-form'
import { createReview } from '../../common/services/review/review'
import { ReviewCard } from '../../components/review-card'

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

  const handleCreateReview = () => {
    if (!getIsAuth) {
      setIsOpenAuthModal(true)
      return
    }

    setIsOpenReviewModal(true)
  }

  const sendReview = async (data: { review: string }) => {
    await createReview({ review: data.review, userId: getUser!.id })
  }

  return (
    <>
      <Center>
        <Text align="center" size={'xl'} fw={'bold'} w={700}>
          ITECADEMY гарантирует трудоустройство студентам, которые освоили
          программу обучения. Если у вас не получится найти работу, мы вернем
          деньги за программу
        </Text>
      </Center>
      {!getIsAuth && (
        <Center>
          <Alert
            mt={100}
            icon={<IconAlertCircle size="1rem" />}
            title="Внимание!"
            color="gray"
            w={'50%'}
          >
            <Text>
              Авторизованный пользователь получает повышенную безопасность,
              доступ к персонализированному контенту и функциям. Это улучшает
              удобство и качество взаимодействия с платформой.
            </Text>
            <Flex justify={'space-around'} mt={30}>
              <Button w={'35%'} component={Link} to={'/login'} color="gray">
                {'Войти'}
              </Button>
              <Button
                w={'35%'}
                component={Link}
                to={'/registration'}
                color="gray"
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
            <Tabs.Tab value="all-courses">Все курсы</Tabs.Tab>

            <Tabs.Tab value="my-courses" disabled={!myCourses.length}>
              Мои курсы
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all-courses">
            <SimpleGrid cols={4} p={'md'}>
              {getCourses.map((course) => (
                <Card data={course} />
              ))}
            </SimpleGrid>
          </Tabs.Panel>
          <Tabs.Panel value="my-courses">
            <SimpleGrid cols={4} p={'md'}>
              {myCourses.map((course) => (
                <Card data={course} />
              ))}
            </SimpleGrid>
          </Tabs.Panel>
        </Tabs>
      ) : (
        <SimpleGrid cols={4} p={'md'} mt={100}>
          {getCourses.map((course) => (
            <Card data={course} />
          ))}
        </SimpleGrid>
      )}
      <Center>
        <Flex direction={'column'}>
          {getReviews.map((review) => (
            <ReviewCard data={review} />
          ))}
        </Flex>
      </Center>
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
            <TextInput
              label={'сообщение'}
              placeholder="введите сообщение"
              {...register('review', {
                required: 'обязательно для заполнения'
              })}
              error={errors.review?.message}
            />
            <Button color={'green'} fullWidth type="submit">
              Отправить
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  )
})
