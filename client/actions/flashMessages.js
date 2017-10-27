import { ADD_FLASH_MEESAGE } from './types'

export function addFlashMessages(message) {
  return (
    type: ADD_FLASH_MEESAGE,
    message
  );
}
