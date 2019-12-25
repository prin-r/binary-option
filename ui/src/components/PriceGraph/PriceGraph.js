import React, { useEffect, useRef, useState } from 'react'
import { usePriceContextState } from '../../context/Price'
import { useOpenOrderContextState } from '../../context/OpenOrder'
import ChartAnnotationsPlugin from 'chartjs-plugin-annotation'
import Chart from 'chart.js'
import moment from 'moment'
import './style.css'

Chart.defaults.global.animation.duration = 5000
Chart.plugins.register(ChartAnnotationsPlugin)

const annotations = []

export default props => {
  const chartRef = useRef(null)
  const [chart, setChart] = useState(null)
  const { height, width, graphColor } = props
  const [{ init }, _] = usePriceContextState()
  const { strikePrice, isCall } = useOpenOrderContextState()

  useEffect(() => {
    const canvas = chartRef.current
    if (!canvas || !init.length) return
    const ctx = canvas.getContext('2d')
    const gradientStroke = ctx.createLinearGradient(0, 0, width, 0)
    gradientStroke.addColorStop(0, '#ff7c00')
    gradientStroke.addColorStop(1, '#00ffba')

    const data = []
    for (const { ts, px } of init) {
      if (ts >= moment().unix() - 450) {
        data.push({
          t: ts * 1000,
          y: parseFloat(px) / 1e18,
        })
      }
    }

    const annotation = {
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-0',
      value: data[data.length - 1] ? data[data.length - 1].y : 0,
      borderColor: 'rgb(75, 192, 192)',
      borderWidth: 1,
    }

    const cfg = {
      type: 'bar',
      data: {
        datasets: [
          {
            borderColor: gradientStroke,
            data: data,
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              distribution: 'series',
              ticks: {
                source: 'data',
                autoSkip: true,
                display: false,
              },
              gridLines: {
                display: false,
                drawBorder: false,
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                // display: true,
                labelString: 'BTC-USD',
              },
              ticks: {
                fontFamily: 'Source Code Pro',
              },
              gridLines: {
                display: false,
                // drawBorder: false,
              },
            },
          ],
        },
        annotation: {
          annotations: [annotation],
        },
        tooltips: {
          enabled: false,
        },
      },
    }

    const cht = new Chart(ctx, cfg)
    annotations.push(annotation)
    setChart(cht)

    window.socket.on('update', ({ px, ts }) => {
      data.push({
        t: ts * 1000,
        y: parseFloat(px) / 1e18,
        pointBackgroundColor: 'red',
      })
      while (
        data &&
        data.length > 0 &&
        data[0].t <= (moment().unix() - 450) * 1000
      ) {
        data.shift()
      }
      annotation.value = data[data.length - 1].y
      cht.annotation.elements = []
      cht.options.annotation.annotations = annotations
      cht.update()
    })
  }, [init.length, chartRef])

  useEffect(() => {
    if (!annotations || !chart) return
    if (strikePrice) {
      const content = isCall ? 'Call 📈' : 'PUT 📉' // + ' at ' + pretty
      if (annotations.length === 1) {
        annotations.push({
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: parseFloat(strikePrice) / 1e18,
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 2,
          label: {
            xAdjust: 15,
            position: 'left',
            fontSize: 16,
            fontColor: 'black',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            enabled: true,
            content: content,
          },
        })
      } else {
        annotations[1].value = parseFloat(strikePrice) / 1e18
        if (annotations[1].label) {
          annotations[1].label.content = content
        }
      }
    } else {
      if (annotations.length == 2) {
        annotations.pop()
      }
    }
    chart.annotation.elements = []
    chart.options.annotation.annotations = annotations
    chart.update()
  }, [strikePrice])

  return (
    <div style={{ width, height }}>
      <canvas style={{ width, height }} ref={chartRef} />
    </div>
  )
}
