import React from 'react'
import { Chart } from 'react-charts'
import './Panel.css'

function Panel () {

  return (
    <div className='body-panel'>
      <ChartExample/>
      <PasswordSecurities/>
    </div>
  );
}

function ChartExample () {
  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
      {
        label: 'Series 2',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      }
    ],
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
  return (
    <div className='conteiner-card-chart'>
      <div className='card-chart'>
        <h2>Data 1</h2>
        <div className='conteiner-chart'>
          <div className='dimension-chart'>
            <Chart data={data} axes={axes} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PasswordSecurities () {
  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
      {
        label: 'Series 2',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      }
    ],
    []
  )

  const series = React.useMemo(
    () => ({
      type: 'bar',
    }),
    []
  )

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'left' },
      { position: 'bottom', type: 'linear' }
    ],
    []
  )
  return (
    <div className='conteiner-card-chart'>
      <div className='card-chart'>
        <h2>Data 2</h2>
        <div className='conteiner-chart'>
          <div className='dimension-chart'>
            <Chart data={data} series={series} axes={axes} tooltip />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Panel;