import { Modal } from '@mantine/core'
import { AuthModalProps } from './auth-modal.interface'

export const AuthModal = ({ onClose, opened }: AuthModalProps) => {
  return (
    <Modal onClose={onClose} opened={opened}>
      {'auth'}
    </Modal>
  )
}
