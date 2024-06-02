import { Box, Flex, Image, Title } from '@mantine/core'
import { TeacherCardProps } from './teacher-card.interface'

export const TeacherCard = ({ data }: TeacherCardProps) => {
  return (
    <Box bg={'rgb(0, 0, 0, 0.7)'}>
      <Flex gap={'xl'} align={'center'}>
        <Image width={300} src={data.img} radius={'md'} />
        <Flex direction={'column'} gap={'xl'}>
          <Title order={3}>{data.fullName}</Title>
          <>{data.description}</>
        </Flex>
      </Flex>
    </Box>
  )
}
