import React from "react";
import Table from "../table";
import Pagination from "../tables/Pagination";
import { useEcoValueData } from "@/hooks/useEcoValueData";

export const EcoValueTable = ({
    facilityId,
    weekInterval = 4,
    buildingName = 'Building'
}: {
    facilityId: string;
    weekInterval?: number;
    buildingName?: string;
}) => {

    // const { data, isLoading, error } = useEcoValueData(facilityId);
    // console.log("Eco value Data>>>>>>>>>>>", data)

    // Mock data for now
    const mockData = [
        ['John Doe', '30', 'Building', 'Open', 'Edit'],
        ['Jane Smith', '25', 'Building', 'Closed', 'Edit'],
        ['John Doe', '30', 'Building', 'Open', 'Edit'],
        ['John Doe', '30', 'Building', 'Closed', 'Edit'],
        ['John Doe', '30', 'Building', 'Open', 'Edit'],
        ['Jane Smith', '25', 'Building', 'Closed', 'Edit'],
        ['John Doe', '30', 'Building', 'Open', 'Edit'],
        ['John Doe', '30', 'Building', 'Open', 'Edit']
    ];

    // Pagination logic
    const ITEMS_PER_PAGE = 8;
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);

    // Get current page data
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentData = mockData.slice(startIndex, endIndex);

    return (
        <div className='my-8 border border-gray-200 rounded-lg overflow-hidden' >
            <div className="col-span-12 bg-[#001f38] rounded-tl-2xl rounded-tr-2xl">
                <h2 className="text-lg font-semibold text-white py-3 px-5">Current Value Status</h2>
            </div>
            <Table
                headCells={['Device Name', 'Level', 'Location', 'Status', 'Action']}
                bodyRows={currentData.map((row) => {
                    const [name, level, location, status, action] = row;
                    return [
                        name,
                        level,
                        location,
                        <span
                            key={status}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'Open' ? 'bg-green-500 text-white' :
                                status === 'Closed' ? 'bg-red-500 text-white' :
                                    'bg-gray-500 text-white'
                                }`}
                        >
                            {status}
                        </span>,
                        <button
                            key={action}
                            className="text-brand-500 hover:text-brand-600 px-2 py-1 rounded"
                            onClick={() => console.log('Edit clicked for:', row)}
                        >
                            {action}
                        </button>
                    ];
                })}
                className=" w-full text-sm text-gray-500 dark:text-gray-400"
            />
            <div className="flex justify-end p-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page: number) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};