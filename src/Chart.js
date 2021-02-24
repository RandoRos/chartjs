import React from 'react';
import { Chart } from 'chart.js';

const MyChart = (props) => {
    const [chart, setChart] = React.useState();
    const chartRef = React.useRef();
    const [data, setData] = React.useState(props.data);

    React.useEffect(() => {
        setChart(
            new Chart(chartRef.current.getContext("2d"), {
                type: "line",
                data: {
                    datasets: [{
                        data: [],
                        label: 'Dataset 1',
                        fill: false,
                        borderColor: 'rgb(54, 162, 235)',
                        lineTension: .1,
                      }]
                },
                options: {
                    scales: {
                        xAxes: [{
                          type: 'realtime',
                          time: {
                            unit: 'minute',
                            parser: {
                                second: 'HH:mm:ss',
                                minute: 'HH:mm'
                            }
                          },
                          realtime: {
                            duration: 5 * 60 * 1000,
                            refresh: 3000,
                            delay: 3000,
                            onRefresh: function(chart) {
                                chart.data.datasets[0].data = data;
                                // chart.data.datasets.forEach(function(dataset) {
                                //   dataset.data.push({
                                //     x: Date.now(),
                                //     y: Math.random()
                                //   });
                                // });
                              },
                        }
                        }]
                      },
                      plugins: {
                        datalabels: {
                            display: true,
                            clamp: true,
                            anchor: 'start',
                            backgroundColor: function(context) {
                              return context.dataset.borderColor;
                            },
                            borderRadius: 4,
                            clip: true,
                            color: 'white',
                            font: {
                                weight: 'bold'
                            },
                            formatter: function(value, context) {
                                return value.y.toFixed(2);
                            },
                          }
                    },
                    pan: {
                        enabled: true,
                        mode: 'x',
                        rangeMax: {
                            x: 5 * 60 * 1000
                        },
                        rangeMin: {
                            x: 0
                        }
                    },
                    zoom: {
                        enabled: true,
                        mode: 'x',
                        rangeMax: {
                            x: 5 * 60 * 1000
                        },
                        rangeMin: {
                            x: 1000
                        }
                    },
                }
            })
        );
    }, []);

    return (
        <canvas
            ref={chartRef}
            style={{ maxWidth: '900px' }}
        />
    );
};

export default MyChart;