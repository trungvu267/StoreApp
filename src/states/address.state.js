import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'

export const addressesAtom = atomWithStorage('addresses', [])
export const selectedAddressAtom = atomWithStorage('selectedAddress', null)
export const editAddressAtom = atom(null)
