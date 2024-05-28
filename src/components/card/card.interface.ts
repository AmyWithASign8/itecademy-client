export type CardData = {
  id: number
  title: string
  description: string
  videoLink: string
  userServices: {
    id: number
    userId: number
    serviceId: number
  }[]
}

export type CardProps = {
  data: CardData
}
