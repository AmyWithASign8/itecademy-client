import { Center, SimpleGrid, Text } from '@mantine/core'
import { Card } from '../../components/card/card'

export const GeneralPage = () => {
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
        <Card
          data={{
            id: 1,
            title: 'Frontend',
            description: 'Тестовый курс по веб разработке, для начинающих.'
          }}
        />
      </SimpleGrid>
    </>
  )
}
