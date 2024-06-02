import { Center, Tabs, Text } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import { CreateCourse } from './components/create-course'
import { EditCourse } from './components/edit-course'
import { DeleteCourse } from './components/delete-course'
import { ViewSubscribes } from './components/view-subscribes'
import { AdministrationReviews } from './components/administration-reviews'

export const AdminPanelPage = observer(() => {
  return (
    <Center>
      <Tabs defaultValue="gallery" w={'95%'}>
        <Tabs.List position="center" grow>
          <Tabs.Tab value="gallery">
            <Text size={'md'} fw={'bold'}>
              Создать курс
            </Text>
          </Tabs.Tab>
          <Tabs.Tab value="messages">
            <Text size={'md'} fw={'bold'}>
              Редактировать курс
            </Text>
          </Tabs.Tab>
          <Tabs.Tab value="settings">
            <Text size={'md'} fw={'bold'}>
              Удалить курс
            </Text>
          </Tabs.Tab>
          <Tabs.Tab value="subscribes">
            <Text size={'md'} fw={'bold'}>
              Просмотр записей
            </Text>
          </Tabs.Tab>
          <Tabs.Tab value="reviews">
            <Text size={'md'} fw={'bold'}>
              Администрирование отзывов
            </Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="xs">
          <CreateCourse />
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          <EditCourse />
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          <DeleteCourse />
        </Tabs.Panel>

        <Tabs.Panel value="subscribes" pt="xs">
          <ViewSubscribes />
        </Tabs.Panel>

        <Tabs.Panel value="reviews" pt="xs">
          <AdministrationReviews />
        </Tabs.Panel>
      </Tabs>
    </Center>
  )
})
