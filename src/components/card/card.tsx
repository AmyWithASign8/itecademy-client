import { IconBasket } from '@tabler/icons-react'
import { CardProps } from './card.interface'
import { Button, Card as MantineCard, Text } from '@mantine/core'

export const Card = ({ data }: CardProps) => {
  const { title, description } = data

  return (
    <MantineCard shadow="sm" padding="lg" radius="md" withBorder>
      <MantineCard.Section p={'sm'}>
        <Text fw={'bold'} size={'lg'}>
          {title}
        </Text>
      </MantineCard.Section>
      <MantineCard.Section p={'md'}>
        <Text fw={'bold'}>{description}</Text>
      </MantineCard.Section>
      <Button leftIcon={<IconBasket />} color="green" fullWidth>
        {'Заказать'}
      </Button>
    </MantineCard>
  )
}
