import { useState } from 'react'

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
    status: 'In Relationship',
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
  }),
  columnHelper.accessor('lastName',{
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('age',{
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('visits',{
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('status',{
    cell: info => info.getValue(),
  }),
]


function Test() {

  const [data] = useState(() => [...defaultData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return <div>Test</div>
}

export default Test
