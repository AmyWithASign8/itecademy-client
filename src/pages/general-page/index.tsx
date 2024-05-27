import {
  Alert,
  Button,
  Center,
  Flex,
  SimpleGrid,
  Tabs,
  Text
} from '@mantine/core'
import { Card } from '../../components/card/card'
import CourseStore from '../../common/store/course'
import UserStore from '../../common/store/user'
import { observer } from 'mobx-react-lite'
import { IconAlertCircle } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export const GeneralPage = observer(() => {
  const { getCourses } = CourseStore
  const { getIsAuth, getUser } = UserStore

  const myCourses = getCourses.filter((course) =>
    course.userServices.find(
      (userService) => userService.userId === getUser?.id
    )
  )

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
        <Tabs defaultValue="all-courses" mt={50} variant="pills">
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
    </>
  )
})
