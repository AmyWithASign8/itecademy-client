import { Center, Tabs } from '@mantine/core'
import { observer } from 'mobx-react-lite'
import { CreateCourse } from './components/create-course'
import { EditCourse } from './components/edit-course'
import { DeleteCourse } from './components/delete-course'
import { ViewSubscribes } from './components/view-subscribes'
import { AdministrationReviews } from './components/administration-reviews'

export const AdminPanelPage = observer(() => {
  return (
    <Center>
      <Tabs defaultValue="gallery" w={'50%'}>
        <Tabs.List position="center" grow>
          <Tabs.Tab value="gallery">Создать курс</Tabs.Tab>
          <Tabs.Tab value="messages">Редактировать курс</Tabs.Tab>
          <Tabs.Tab value="settings">Удалить курс</Tabs.Tab>
          <Tabs.Tab value="subscribes">Просмотр записей</Tabs.Tab>
          <Tabs.Tab value="reviews">Администрирование отзывов</Tabs.Tab>
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
