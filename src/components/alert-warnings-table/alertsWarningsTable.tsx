import React from "react";
import Table from "../table";
import Pagination from "../tables/Pagination";
import { useAnomoliesData } from "@/hooks/useAnomoliesData";

export const AlertWarningsTable = ({
    facilityId,
    userId,
    buildingName = 'Building'
}: {
    facilityId: string;
    userId: string;
    buildingName?: string;
}) => {
    // Mock data with realistic alert/warning data
    // const { data: alerts, isLoading } = useAnomoliesData(facilityId, userId);
    console.log("data here>>>>>>>>>>>>>>>>>", alerts)
    const mockData = [
        ['High Water Usage Detected', 'Water Meter 1', 'Building A', '2025-05-28 10:00 AM'],
        ['Leak Detected', 'Pipe Sensor 2', 'Building A', '2025-05-28 09:30 AM'],
        ['Low Pressure Alert', 'Pressure Sensor 1', 'Building A', '2025-05-28 09:15 AM'],
        ['High Flow Rate', 'Flow Meter 2', 'Building A', '2025-05-28 09:00 AM'],
        ['Temperature Alert', 'Temp Sensor 1', 'Building A', '2025-05-28 08:45 AM'],
        ['Leak Detected', 'Pipe Sensor 1', 'Building A', '2025-05-28 08:30 AM'],
        ['High Water Usage Detected', 'Water Meter 2', 'Building A', '2025-05-28 08:15 AM'],
        ['Low Pressure Alert', 'Pressure Sensor 2', 'Building A', '2025-05-28 08:00 AM']
    ];

    // Pagination logic
    const ITEMS_PER_PAGE = 2;
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);

    // Get current page data
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentData = mockData.slice(startIndex, endIndex);

    return (
        <div className='mb-8 border border-gray-200 rounded-lg overflow-hidden' >
            <div className="col-span-12 bg-[#001f38] rounded-tl-2xl rounded-tr-2xl">
                <h2 className="text-lg font-semibold text-white py-3 px-5">
                    Alerts & Warnings-{buildingName}
                </h2>
            </div>
            <Table
                headCells={['Description', 'Device name', 'Location', 'Reported']}
                bodyRows={currentData}
                className="text-sm text-gray-500 dark:text-gray-400"
            />
            <div className="flex justify-end p-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page: number) => setCurrentPage(page)}
                />
            </div>
        </div>
    )
}