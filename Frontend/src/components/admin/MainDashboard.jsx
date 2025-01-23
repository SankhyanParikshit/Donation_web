import React from 'react';
import { useTable } from 'react-table';
import { FaUser, FaDollarSign } from 'react-icons/fa';
import { MdCampaign } from 'react-icons/md';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MainDashboard = () => {
    const cardData = [
        {
            id: 1,
            title: 'Total Campaigns',
            value: '56',
            icon: <MdCampaign size={80} />
        },
        {
            id: 2,
            title: 'Total Revenue',
            value: '$12,345',
            icon: <FaDollarSign size={80} />
        },
        {
            id: 3,
            title: 'Total Users',
            value: '1,234',
            icon: <FaUser size={80} />
        },
    ];

    // Line chart data
    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Revenue',
                data: [3000, 4000, 3200, 5000, 4500, 4800, 6000],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    // Sample data and columns for recent users table with images
    const data = React.useMemo(
        () => [
            { id: 1, name: 'John Doe', email: 'john@example.com', date: '2024-08-23', image: 'https://i.pinimg.com/originals/28/6b/0a/286b0ad467e37bfe95546256c67a59c4.jpg' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', date: '2024-08-22', image: 'https://wallpaperaccess.com/full/2563039.jpg' },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', date: '2024-08-21', image: 'https://wallpapercave.com/wp/wp1821886.jpg' },
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Photo',
                accessor: 'image',
                Cell: ({ cell: { value } }) => (
                    <img src={value} alt="User" className="w-10 h-10 rounded-full object-cover" />
                ),
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <section className="flex flex-col h-screen">
            {/* First Section - 30% Height */}
            <div className="p-4 m-6 rounded-3xl" style={{ height: '33%' }}>
                <div className="flex h-full gap-4">
                    {cardData.map((card) => (
                        <div key={card.id} className="bg-gray-900 text-white rounded-3xl p-6 flex flex-col items-center justify-between flex-grow" style={{ backgroundColor: '#250902' }}>
                            <div className="mb-4">{card.icon}</div>
                            <div>
                                <h3 className="text-xl font-semibold text-center">{card.title}</h3>
                                <p className="text-3xl mt-2 text-center">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Second Section - 70% Height */}
            <div className="p-4 m-6 rounded-3xl flex gap-6" style={{ height: '54%' }}>
                <div className="w-3/5 bg-gray-800 p-4 rounded-3xl">
                    {/* Revenue Chart */}
                    <div className="flex-1 bg-gray-800 p-4 rounded-lg flex items-center justify-center">
                        <Line data={lineChartData} className="w-full h-full" />
                    </div>
                </div>

                <div className="w-2/5 bg-gray-800 p-4 rounded-3xl">
                    <div className="flex-1 bg-gray-800 p-4 rounded-lg overflow-auto">
                        <h2 className="text-white mb-4 text-center">Recent Users</h2>
                        <table {...getTableProps()} className="min-w-full text-white">
                            <thead className="bg-gray-700">
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()} className="px-4 py-2">
                                                {column.render('Header')}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map(row => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} className="bg-gray-600">
                                            {row.cells.map(cell => (
                                                <td {...cell.getCellProps()} className="border px-4 py-2">
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainDashboard;
