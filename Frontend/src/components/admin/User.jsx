import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';

const User = () => {
  const [data, setData] = useState([
    {
      sNo: 1,
      image: 'https://via.placeholder.com/50',
      name: 'John Doe',
      email: 'john@example.com',
      contact: '123-456-7890',
    },
    {
      sNo: 2,
      image: 'https://via.placeholder.com/50',
      name: 'Jane Doe',
      email: 'jane@example.com',
      contact: '234-567-8901',
    },
    {
      sNo: 2,
      image: 'https://via.placeholder.com/50',
      name: 'Jane Doe',
      email: 'jane@example.com',
      contact: '234-567-8901',
    },
    {
      sNo: 2,
      image: 'https://via.placeholder.com/50',
      name: 'Jane Doe',
      email: 'jane@example.com',
      contact: '234-567-8901',
    },
    {
      sNo: 2,
      image: 'https://via.placeholder.com/50',
      name: 'Jane Doe',
      email: 'jane@example.com',
      contact: '234-567-8901',
    },
    {
      sNo: 2,
      image: 'https://via.placeholder.com/50',
      name: 'Jane Doe',
      email: 'jane@example.com',
      contact: '234-567-8901',
    },
    {
      sNo: 2,
      image: 'https://via.placeholder.com/50',
      name: 'Jane Doe',
      email: 'jane@example.com',
      contact: '234-567-8901',
    },
    {
      sNo: 2,
      image: 'https://via.placeholder.com/50',
      name: 'Jane Doe',
      email: 'jane@example.com',
      contact: '234-567-8901',
    },
    {
      sNo: 2,
      image: 'https://via.placeholder.com/50',
      name: 'Jane Doe',
      email: 'jane@example.com',
      contact: '234-567-8901',
    },
    
    // Add more initial data here
  ]);

  const [editingRow, setEditingRow] = useState(null);

  const columns = React.useMemo(
    () => [
      {
        Header: 'S.No',
        accessor: 'sNo',
      },
      {
        Header: 'Image',
        accessor: 'image',
        Cell: ({ value }) => <img src={value} alt="User" className="w-12 h-12 rounded-full" />,
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ value, row }) => (
          editingRow === row.index ? (
            <input
              value={value}
              onChange={(e) => handleChange(e, row.index, 'name')}
              className="w-full px-2 py-1 rounded bg-gray-800 text-white"
            />
          ) : (
            value
          )
        ),
      },
      {
        Header: 'Email',
        accessor: 'email',
        Cell: ({ value, row }) => (
          editingRow === row.index ? (
            <input
              value={value}
              onChange={(e) => handleChange(e, row.index, 'email')}
              className="w-full px-2 py-1 rounded bg-gray-800 text-white"
            />
          ) : (
            value
          )
        ),
      },
      {
        Header: 'Contact',
        accessor: 'contact',
        Cell: ({ value, row }) => (
          editingRow === row.index ? (
            <input
              value={value}
              onChange={(e) => handleChange(e, row.index, 'contact')}
              className="w-full px-2 py-1 rounded bg-gray-800 text-white"
            />
          ) : (
            value
          )
        ),
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            {editingRow === row.index ? (
              <>
                <button onClick={() => handleSave(row.index)} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                <button onClick={handleCancel} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => handleEdit(row.index)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(row.index)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </>
            )}
          </div>
        ),
      },
    ],
    [data, editingRow]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 5 } }, usePagination);

  const handleEdit = (index) => {
    setEditingRow(index);
  };

  const handleSave = (index) => {
    setEditingRow(null);
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const handleChange = (e, index, field) => {
    const updatedData = [...data];
    updatedData[index][field] = e.target.value;
    setData(updatedData);
  };

  return (
    <section className='flex h-screen gap-6'>
      <div className='w-[95%] h-[90%] bg-gray-800 m-10 rounded-3xl'>
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="bg-gray-800 divide-y divide-gray-600">
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="py-3 flex justify-between">
          <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-blue-500 text-white px-3 py-1 rounded ml-4">Previous</button>
          <div>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </div>
          <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-blue-500 text-white px-3 py-1 mr-4 rounded">Next</button>
        </div>
      </div>
    </section>
  );
};

export default User;
