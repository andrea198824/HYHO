import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ title, data, dataKey, grid }) => {

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
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



