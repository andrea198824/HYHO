import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const Chart = ({ title, data, dataKey, grid }) => {
    const chartData = useSelector(state => state.chartDetails )
    chartData.name = 'Ene'
  return (
    <div className="chat">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data.concat(chartData)}>
          <XAxis dataKey="name" stroke="#6a7c6e" />
          <Line type="monotone" dataKey={dataKey} stroke="#6a7c6e" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#6a7c6e" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
  </div>
  )
}

export default Chart



