'use client';

import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import BuildingSearchWrapper from "@/components/building/BuildingSearchWrapper";

// Metadata is handled in layout.tsx for client components

export default function Ecommerce() {
  // Handle building selection
  const handleBuildingSelect = (building: any) => {
    // Just for notification purposes, actual state is managed in SearchBuildings component
    console.log('Building selected in Home component:', building.name);
  };

  return (
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <BuildingSearchWrapper onBuildingSelect={handleBuildingSelect} />
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
  );
}
