"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from "recharts";
import PageTitle from "../PageTitle";
import { PiCurrencyCircleDollarBold } from "react-icons/pi";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-md shadow-md p-2 text-sm text-gray-700">
        <p className="font-medium">Index : {payload[0].payload.time}</p>
        <p>Prix : ${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

const CryptoChart = ({ sparkline }: { sparkline: number[][] }) => {
  if (!sparkline.length) return null;

  const formattedData = sparkline[0].map((price, index) => ({
    time: index,
    price,
  }));

  return (
    <div className="w-full h-[500px] mt-12 mb-10 rounded-2xl bg-white">
      <PageTitle
        title="Tendance des prix"
        icon={<PiCurrencyCircleDollarBold className="w-5 h-5" />}
      />

      <ResponsiveContainer width="100%" height="100%" className="mt-6">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12 }}
            stroke="#6b7280"
          ></XAxis>
          <YAxis tick={{ fontSize: 12 }} stroke="#6b7280"></YAxis>
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart;
