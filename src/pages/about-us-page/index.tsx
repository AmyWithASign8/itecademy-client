import { Box, Center, List, Text, Title } from '@mantine/core'

export const AboutUsPage = () => {
  return (
    <Center>
      <Box w={900} bg={'rgb(0, 0, 0, 0.5)'} p={20} style={{ borderRadius: 10 }}>
        <Title order={2}>Добро пожаловать на ITECADEMY!</Title>
        <Text>
          Мы рады приветствовать вас на нашем сайте, где каждый желающий может
          получить качественное образование в сфере информационных технологий.
          Наша миссия — помочь вам освоить необходимые навыки и знания для
          успешной карьеры в IT.
        </Text>
        <Title order={3}>Кто мы?</Title>
        <Text>
          Мы — команда профессионалов с многолетним опытом работы в
          IT-индустрии. Наши преподаватели — эксперты в различных областях,
          таких как программирование, веб-разработка, кибербезопасность, анализ
          данных и многое другое. Мы стремимся делиться своими знаниями и
          опытом, чтобы вы могли достичь новых высот в своей карьере.
        </Text>
        <Title order={3}>Что мы предлагаем?</Title>
        <List>
          <List.Item>
            Широкий выбор курсов: У нас вы найдете курсы для начинающих и
            продвинутых пользователей. Мы предлагаем программы обучения по самым
            востребованным направлениям IT.
          </List.Item>
          <List.Item>
            Онлайн и офлайн обучение: Вы можете выбирать между удобным форматом
            онлайн-обучения и классическими занятиями в аудитории.
          </List.Item>
          <List.Item>
            Сертификаты: По окончании курсов вы получите сертификаты, которые
            подтвердят ваши навыки и знания, и помогут вам в трудоустройстве.
          </List.Item>
          <List.Item>
            Поддержка и консультации: Мы всегда готовы помочь вам с выбором
            курсов и предоставить консультации по любым вопросам.
          </List.Item>
        </List>
        <Title order={3}>Почему выбирают нас?</Title>
        <List>
          <List.Item>
            Качественное образование: Наши курсы разработаны с учетом актуальных
            требований рынка труда и включают практические задания и проекты.
          </List.Item>
          <List.Item>
            Опытные преподаватели: Наши преподаватели — практикующие
            специалисты, которые знают, что требуется для успешной работы в IT.
          </List.Item>
          <List.Item>
            Гибкость и удобство: Мы предлагаем гибкий график занятий и
            возможность обучаться в удобное для вас время.
          </List.Item>
          <List.Item>
            Сообщество единомышленников: На наших курсах вы встретите таких же
            увлеченных IT, как и вы. Вместе учиться и развиваться гораздо
            интереснее!
          </List.Item>
        </List>
        <Title order={3}>Отзывы наших студентов</Title>
        <Text>
          Мы гордимся успехами наших студентов и благодарны им за доверие.
          Ознакомьтесь с отзывами, чтобы узнать, как наши курсы помогли им
          добиться поставленных целей.
        </Text>
      </Box>
    </Center>
  )
}
