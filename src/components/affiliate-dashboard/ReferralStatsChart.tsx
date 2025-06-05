import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  DotProps,
} from 'recharts';
import axios from 'axios';
import { API } from '../../App';

// ✅ Extend DotProps to include 'index'
interface CustomDotProps extends DotProps {
  index?: number;
}

interface ChartData {
  day: string;
  profit: number;
}

interface ReferralStatsChartProps {
  onBalanceUpdate: (balance: number) => void;
}

// Custom animated dot for the last point
const ActiveDot = (props: CustomDotProps) => {
  const { cx, cy, index } = props;
  if (!cx || !cy) return null;

  return (
    <g>
      <circle className="pulse-dot" cx={cx} cy={cy} r={6} fill="#007bff" />
      <circle cx={cx} cy={cy} r={3} fill="#fff" />
    </g>
  );
};

const ReferralStatsChart: React.FC<ReferralStatsChartProps> = ({ onBalanceUpdate }) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [weeklyProfit, setWeeklyProfit] = useState(0);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
         const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userEmail = userData.email;

        if (!userEmail) {
          console.warn('No user email found');
          return;
        }
        const res = await axios.get(`${API}/api/affiliate/referral-stats?email=${userEmail}`); // Replace this URL
        const { chart, users, total, weekly , balance } = res.data;
        setData(chart);
        setTotalUsers(users);
        setTotalProfit(total);
        setWeeklyProfit(weekly);
        onBalanceUpdate(balance); // or weekly if you want weekly profit instead
      } catch (err) {
        console.error('Failed to fetch chart data:', err);
      }
    };

    fetchChartData();
  }, [onBalanceUpdate]);

  const chartContent =
    data.length > 0 ? (
      <Line
        type="monotone"
        dataKey="profit"
        stroke="#007bff"
        strokeWidth={2}
        dot={(dotProps) => (
          <ActiveDot {...dotProps} index={dotProps.index} />
        )}
      />
    ) : null;

  return (
    <section className="mb-5 text-center">
      <div className="container">
        <div className="d-flex justify-content-around mb-4">
          <div>
            <h4 className="text-primary">Total Users</h4>
            <p className="fw-semibold">{totalUsers}</p>
          </div>
          <div>
            <h4 className="text-success">Total Profit</h4>
            <p className="fw-semibold">${totalProfit.toFixed(2)}</p>
          </div>
          <div>
            <h4 className="text-warning">Profit (Last 7 Days)</h4>
            <p className="fw-semibold">${weeklyProfit.toFixed(2)}</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.length > 0 ? data : Array(7).fill({ day: '', profit: 0 })}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            {chartContent}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <style>{`
        .pulse-dot {
          stroke: #007bff;
          stroke-width: 3;
          animation: pulse 1.5s infinite ease-in-out;
        }

        @keyframes pulse {
          0% {
            r: 6;
            opacity: 1;
          }
          50% {
            r: 10;
            opacity: 0.4;
          }
          100% {
            r: 6;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default ReferralStatsChart;
