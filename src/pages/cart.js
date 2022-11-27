import React from 'react'
import Layout from '../components/Layout'
import { Box } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import QuantityEditModal from '../components/QuantityEditModal'
import {
  GridRowModes,
  DataGridPro,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro'
import {
  selectedCartItemIdAtom,
  cartItemsAtom,
} from '../states/selectedCardItem'
import { useAtom } from 'jotai'

export default function Cart() {
  const [rows, setRows] = useAtom(cartItemsAtom)
  const [rowModesModel, setRowModesModel] = React.useState({})
  const [open, setOpen] = React.useState(false)
  const [, setSelectedCartItemId] = useAtom(selectedCartItemIdAtom)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleEditClick = (id) => () => {
    setOpen(true)
    setSelectedCartItemId(id)
  }

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id))
  }

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  const columns = [
    {
      field: 'productName',
      headerName: 'ProductName',
      width: 180,
      editable: true,
    },
    { field: 'price', headerName: 'Price', type: 'number', editable: true },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 180,
      editable: true,
    },
    {
      field: 'lineTotal',
      headerName: 'Line total',
      type: 'number',
      width: 220,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ]
      },
    },
  ]

  return (
    <div>
      <Layout />
      <div className="max-w-5xl mx-auto mt-16">
        <Box
          sx={{
            height: 500,
            width: '100%',
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}
        >
          <DataGridPro
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            componentsProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </Box>
        <QuantityEditModal open={open} handleClose={handleClose} />
      </div>
    </div>
  )
}

export const Head = () => <title>Cart</title>
