import { Center, SimpleGrid, Text } from '@mantine/core'
import { Card } from '../../components/card/card'
import CourseStore from '../../common/store/course'
import { observer } from 'mobx-react-lite'

export const GeneralPage = observer(() => {
  const { getCourses } = CourseStore

  return (
    <>
      <Center>
        <Text align="center" size={'xl'} fw={'bold'} w={700}>
          ITECADEMY гарантирует трудоустройство студентам, которые освоили
          программу обучения. Если у вас не получится найти работу, мы вернем
          деньги за программу
        </Text>
      </Center>
      <SimpleGrid cols={4} mt={100} p={'md'}>
        {getCourses.map((course) => (
          <Card data={course} />
        ))}
      </SimpleGrid>
    </>
  )
})
