import { atom } from 'jotai'
import { randomTraderName, randomId } from '@mui/x-data-grid-generator'

const initialRows = [
  {
    id: randomId(),
    productName: randomTraderName(),
    price: 25,
    quantity: 2,
    lineTotal: 1,
  },
  {
    id: randomId(),
    productName: randomTraderName(),
    price: 25,
    quantity: 2,
    lineTotal: 1,
  },
  {
    id: randomId(),
    productName: randomTraderName(),
    price: 25,
    quantity: 2,
    lineTotal: 1,
  },
]

export const selectedCartItemIdAtom = atom('')
export const cartItemsAtom = atom([])
