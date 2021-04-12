import Link from 'next/link'
import { Line } from 'react-chartjs-2'
import { bestMonthIndex, getLabel } from './index'

export const state = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56],
    },
  ],
}

export type StateType = typeof state

const About = () => {
  return (
    <div>
      Welcome to the about page. Go to the{' '}
      <Link href="/">
        <a>Home</a>
      </Link>{' '}
      page. <br />
      <div>The best month is: {getLabel(bestMonthIndex)}</div>
      <Line
        data={state}
        options={{
          title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'right',
          },
        }}
      />
    </div>
  )
}

export default About
