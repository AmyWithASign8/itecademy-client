import { Box, Button, Flex, Text } from '@mantine/core'

export const Footer = () => {
  return (
    <Box bg={'#000'} pos={'fixed'} style={{ bottom: 0 }} w={'100%'} p={5}>
      <Flex align={'center'} gap={'md'}>
        <Text>Контакты:</Text>
        <Button
          color="gray"
          component={'a'}
          href={'tel:+79999999999'}
          variant="subtle"
        >
          +7 (999) 999-99-99
        </Button>
        <Button
          color="gray"
          variant="subtle"
          component={'a'}
          href="mailto:itecademy@gmail.com"
        >
          itecademy@gmail.com
        </Button>
      </Flex>
    </Box>
  )
}
