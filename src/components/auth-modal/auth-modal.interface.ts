import { Dispatch, SetStateAction } from 'react'

export type AuthModalProps = {
  opened: boolean
  onClose: () => Dispatch<SetStateAction<boolean>>
}
