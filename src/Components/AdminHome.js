import React, { PureComponent, useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import AdminService from '../Services/admin_service';

const renderCustomizedLabel = (props) => {
  const { x, y, width, value } = props;

  return (
    <text x={x + width / 2} y={y} fill="#fff" textAnchor="middle" dominantBaseline="middle">
      {value}
    </text>
  );
};

const AdminHome = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const data = await AdminService.getMonthlyDataForCurrentYear();
        setMonthlyData(data);
      } catch (error) {
        console.error('Error fetching monthly data: ', error);
      }
    };

    fetchMonthlyData();
  }, []);

  return (
    <div classname="AdminHome" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center',color: 'red'  }}>
        <h1> Registration Level For Customer & Supplier </h1>

        <ResponsiveContainer width={800} height={500}>
          <BarChart
            width={500}
            height={300}
            data={monthlyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Customer" fill="#8884d8" minPointSize={5}>
              <LabelList dataKey="Customer" content={renderCustomizedLabel} />
            </Bar>
            <Bar dataKey="Supplier" fill="#82ca9d" minPointSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminHome;
