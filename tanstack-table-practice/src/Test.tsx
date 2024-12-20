import { useState } from 'react'
import './App.css'

import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  ColumnResizeDirection,
  createColumnHelper,
} from '@tanstack/react-table'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'あああああああ　あああああああああああ　ああああああああああああああ　あああああああああああああ',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('firstName',{
    cell: info => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor('lastName',{
    cell: info => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor('age',{
    cell: info => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor('visits',{
    cell: info => info.getValue(),
    size: 400,
  }),
  columnHelper.accessor('status',{
    cell: info => info.getValue(),
    size: 100,
  }),
]


function Test() {

  const [data] = useState(() => [...defaultData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
  })

  return (
    <table {
      ...{
        style: {
          width: table.getCenterTotalSize()
        }
      }
    }>
      <thead>
        {table.getHeaderGroups().map((headerGroup)=>{
          return (
            <tr key={headerGroup.id}  {...{
              className: 'border-1 border'
            }}>
            {headerGroup.headers.map((header)=>{
              return (
                <th 
                  key={header.id}
                  {...{
                    className: 'border-1 border px-3 py-2',
                    style: {
                      width: header.getSize()
                    }
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${
                            table.options.columnResizeDirection
                          } ${
                            header.column.getIsResizing() ? 'isResizing' : ''
                          }`,
                        }}
                      />

                </th>
              )
            })}
          </tr>
          )
        })}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row)=>{
          return (
            <tr
              key={row.id}
              {...{
                className: ''
              }
            }>
              {
                row.getVisibleCells().map((cell)=>{
                  return(
                    <td
                      key={cell.id}
                      {...{
                        className: 'border-1 border px-3 py-2 max-w-0',
                        style: {
                          width: cell.column.getSize()
                        }
                      }}
                    >
                      <div className='text-line-clamp-1'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  )
                })
              }
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Test
