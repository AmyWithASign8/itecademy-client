import { Alert, Button, Center, Flex, SimpleGrid, Text } from '@mantine/core'
import { Card } from '../../components/card/card'
import CourseStore from '../../common/store/course'
import UserStore from '../../common/store/user'
import { observer } from 'mobx-react-lite'
import { IconAlertCircle } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export const GeneralPage = observer(() => {
  const { getCourses } = CourseStore
  const { getIsAuth } = UserStore

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
      <SimpleGrid cols={4} mt={100} p={'md'}>
        {getCourses.map((course) => (
          <Card data={course} />
        ))}
      </SimpleGrid>
    </>
  )
})
