import { observer } from 'mobx-react-lite'
import CourseStore from '../../../../common/store/course'
import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  SimpleGrid,
  Text
} from '@mantine/core'
import { IconBook, IconUser } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { getAllUsers } from '../../../../common/services/user/user'
import { RegistrationUserResponse } from '../../../../common/services/user/user.interface'

export const ViewSubscribes = observer(() => {
  const [allUsers, setAllUsers] = useState<RegistrationUserResponse[]>([])

  const getAllUsersPromise = async () => {
    const res = await getAllUsers()

    setAllUsers(res as unknown as RegistrationUserResponse[])
  }

  useEffect(() => {
    getAllUsersPromise()
  }, [])

  const { getCourses } = CourseStore

  const [isOpenCollapse, setIsOpenCollapse] = useState<number | null>(null)

  const filteredCourses = getCourses.filter(
    ({ userServices }) => userServices.length
  )

  const getCurrentUser = (id: number) => {
    return allUsers.find((user) => user.id === id)
  }

  return (
    <Center>
      <Flex gap={'lg'} direction={'column'} w={500}>
        {filteredCourses.map(({ id, title, userServices }) => (
          <>
            <Button
              color="gray"
              leftIcon={<IconBook />}
              fullWidth
              onClick={() =>
                setIsOpenCollapse((prev) => (prev !== id ? id : null))
              }
            >
              {title}
            </Button>

            <Collapse in={isOpenCollapse === id}>
              <SimpleGrid cols={2}>
                {userServices.map((data) => (
                  <Box bg={'gray'} p={3} style={{ borderRadius: 10 }}>
                    <Flex align={'center'} justify={'center'} gap={4}>
                      <IconUser size={20} />
                      <Text>{getCurrentUser(data.userId)?.email}</Text>
                    </Flex>
                  </Box>
                ))}
              </SimpleGrid>
            </Collapse>
          </>
        ))}
      </Flex>
    </Center>
  )
})
