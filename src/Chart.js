import React from 'react';
import { Chart } from 'chart.js';
import { Menu, MenuItem } from '@material-ui/core';

const MyChart = (props) => {
    const [chart, setChart] = React.useState();
    const chartRef = React.useRef();
    const [data, setData] = React.useState(props.data);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [legend, setLegend] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        console.log('OPEN EDIT');
    };

    const legendMarkup = (chart) => {
        const updateDataset = (e, index) => {
            const meta = chart.getDatasetMeta(index);

            // See controller.isDatasetVisible comment
            meta.hidden = meta.hidden === null? !chart.data.datasets[index].hidden : null;

            const el = document.getElementById('legend').querySelector('li').querySelector('#text');

            if (el.classList.contains("disable-legend")) {
                el.classList.remove("disable-legend");
            } else {
                el.classList.add("disable-legend");
            }
            chart.update();
        };

        return (
            <div id="legend">
                {
                    chart.data.datasets.map((set, i) => {
                        console.log(set);
                        return (
                        <li
                            id={i}
                            className="dropdown"
                            style={{ cursor: 'pointer' }}
                        >
                            <span className="dropdown-btn">
                                <span style={{ 
                                    display: 'inline-block', 
                                    backgroundColor: set.borderColor, 
                                    width: '20px',
                                    height: '10px',
                                    marginRight: '5px',
                                }}></span>
                                <span id="text">{ set.label }</span>
                            </span>
                            <div class="dropdown-content">
                                <a href="#" onClick={handleEditClick}>Edit</a>
                                <a href="#" onClick={(e) => updateDataset(e, i)}>Hide</a>
                            </div>
                        </li>
                    )
                    })
                }
            </div>
        )
    };

    React.useEffect(() => {
        setChart(
            new Chart(chartRef.current.getContext("2d"), {
                type: "line",
                data: {
                    datasets: [{
                        data: [],
                        label: 'Külmamasin, Võimsus',
                        fill: false,
                        borderColor: 'rgb(54, 162, 235)',
                        lineTension: .1,
                      }]
                },
                options: {
                    legend: {
                        display: false,
                        position: 'top'
                    },
                    legendCallback: legendMarkup,
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

    React.useEffect(() => {
        if (chart) {
            setLegend(chart.generateLegend());  
        }
    }, [chart]);

    React.useEffect(() => {
        document.querySelectorAll("#legend li").forEach((item, index) => {
            item.addEventListener("click", e => handleClick(e, index));
        });
    }, [legend])

    return (
        <React.Fragment>
            { legend }
            <canvas
                ref={chartRef}
                style={{ maxWidth: '900px' }}
            />
        </React.Fragment>
    );
};

export default MyChart;