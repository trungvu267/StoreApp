import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
export const selectedCartItemIdAtom = atom('')
export const cartItemsAtom = atomWithStorage('cartItems', [])
