import { React } from 'react'
import CountUp from 'react-countup'

const donation = {
  display: 'flex',
  fontSize: '26px',
  paddingBottom: '15px',
  paddingLeft: '10px',
  paddingTop: '12px',
  color: '#8aa290',
  textAlign: 'center',
  flexWrap: 'nowrap'
}

const Counter = () => {
  return (
    <div style={donation}>
      <p>Fondos recuadado: $</p>
      <CountUp start={0} end={4568220} />
    </div>
  )
}
export default Counter
