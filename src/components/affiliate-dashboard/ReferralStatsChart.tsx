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
  TooltipProps,
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


const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="custom-tooltip">
        <div className="tooltip-header">
          <div className="tooltip-indicator"></div>
          <span className="tooltip-day">{label}</span>
        </div>
        <div className="tooltip-content">
          <div className="tooltip-label">Daily Profit</div>
          <div className="tooltip-value">${data.value?.toFixed(2) || '0.00'}</div>
        </div>
      </div>
    );
  }
  return null;
};

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
           <Tooltip content={<CustomTooltip />} />
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

         .custom-tooltip {
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          padding: 0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1);
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          min-width: 180px;
          backdrop-filter: blur(10px);
          transform: translateY(-10px);
          animation: tooltipFadeIn 0.3s ease-out;
        }

        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(-10px) scale(1);
          }
        }

        .tooltip-header {
          display: flex;
          align-items: center;
          padding: 12px 16px 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .tooltip-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff6b6b, #feca57);
          margin-right: 8px;
          box-shadow: 0 0 8px rgba(255, 107, 107, 0.5);
        }

        .tooltip-day {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: rgba(255, 255, 255, 0.9);
        }

        .tooltip-content {
          padding: 8px 16px 12px;
        }

        .tooltip-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .tooltip-value {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

       

        /* Hover effect for the entire chart area */
        .recharts-wrapper:hover .custom-tooltip {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2), 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        /* Alternative tooltip styles for variety */
        .custom-tooltip.variant-2 {
          background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
        }

        .custom-tooltip.variant-3 {
          background: linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%);
        }

        .custom-tooltip.variant-4 {
          background: linear-gradient(135deg, #fc466b 0%, #3f5efb 100%);
        }

        .custom-tooltip.variant-5 {
          background: linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%);
        }
      `}</style>
    </section>
  );
};

export default ReferralStatsChart;
