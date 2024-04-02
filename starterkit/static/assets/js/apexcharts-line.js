(function () {
    "use strict";

    /* basic line chart */
    var options = {
        series: [{
            name: "Stock Price TL",
            data:  [152.5, 149.4, 156.0, 166.0, 160.3, 156.4, 160.7, 146.8, 139.3, 128.7, 132.3, 128.0, 128.5, 125.7, 128.3, 133.2, 136.6, 142.2, 137.4, 139.4, 141.5, 141.9, 151.7, 157.4, 165.0, 163.0, 156.7, 162.6, 162.5, 161.9, 156.2, 151.9, 158.1, 148.8, 152.4, 152.8, 154.7, 145.8, 130.0, 122.8, 111.5, 117.8, 104.4, 88.7, 90.0, 94.5, 90.0, 96.9, 112.9, 121.3, 118.0, 117.2, 122.6, 127.2, 134.5, 126.2, 117.2, 103.6, 94.9, 108.6, 113.6, 118.1, 96.2, 114.9, 112.2, 104.0, 100.0, 91.3, 91.1, 91.9, 83.4, 79.0, 81.1, 73.7, 73.3, 72.0, 71.5, 67.2, 71.7, 72.3, 73.5, 70.1, 71.7, 71.1, 68.7, 67.1, 64.9, 66.8, 65.6, 71.1, 73.0, 75.2, 77.5, 78.5, 82.6, 78.8, 69.4, 70.3, 68.0, 67.4, 69.3, 64.4, 63.0, 59.6, 57.8, 56.0, 54.9, 54.6, 55.6, 55.3, 56.3, 52.0, 51.5, 52.1, 53.8, 51.7, 48.4, 52.3, 49.6, 49.7, 46.3, 42.8, 41.1, 37.0, 35.7, 33.7, 33.6, 32.5, 32.0, 32.7, 31.9, 31.9, 32.2, 32.0, 32.1, 32.8, 33.1, 33.0, 33.0, 32.7, 33.4, 32.7, 32.4, 29.5, 29.2, 31.7, 31.3, 32.0, 32.4, 32.6, 32.8, 34.4, 31.3, 31.6, 32.9, 34.0, 34.8, 35.0, 36.2, 35.1, 33.2, 34.9, 33.7, 33.9, 33.0, 35.4, 33.1, 32.1, 30.4, 30.0, 29.6, 30.9, 28.4, 28.6, 29.4, 27.8, 28.4, 26.9, 28.2, 27.4, 25.0, 23.8, 23.2, 24.0, 22.8, 22.0, 21.6, 22.6, 21.6, 21.7, 23.1, 22.1, 21.3, 19.8, 18.9, 18.4, 17.5, 16.9, 16.7, 15.8, 15.5, 14.8, 15.4, 16.4, 15.3, 15.4, 15.2, 13.8, 13.4, 13.3, 15.3, 17.9, 18.6, 19.8, 20.5, 21.5, 20.9, 21.9, 22.0, 21.5, 21.2, 20.2, 19.7, 20.2, 20.1, 20.1, 20.5, 19.7, 18.5, 17.7, 18.4, 18.1, 18.0, 18.8, 18.9, 18.5, 18.1, 17.9, 17.1, 17.1, 16.7, 16.8, 17.2, 21.0, 20.1, 19.8, 19.4, 19.5, 19.4, 17.7, 17.9, 17.4, 16.2, 15.6, 16.7, 17.8, 17.3, 19.4, 18.1, 18.3, 16.9, 18.6] 
        }],
        chart: {
            height: 320,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        colors: ['#845adf'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: 3,
        },
        grid: {
            borderColor: '#f2f5f7',
        },
        title: {
            text: 'ARCLK Price Analysis by Month',
            align: 'left',
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#8c9097'
            },
        },
        xaxis: {
            categories : [
                '19.03.2024', '15.03.2024', '8.03.2024', '1.03.2024', '23.02.2024', '16.02.2024', '9.02.2024', '2.02.2024', '26.01.2024', '19.01.2024', '12.01.2024', '5.01.2024', '29.12.2023', '22.12.2023', '15.12.2023', '8.12.2023', '1.12.2023', '24.11.2023', '17.11.2023', '10.11.2023', '3.11.2023', '27.10.2023', '20.10.2023', '13.10.2023', '6.10.2023', '29.09.2023', '22.09.2023', '15.09.2023', '8.09.2023', '1.09.2023', '25.08.2023', '18.08.2023', '11.08.2023', '4.08.2023', '28.07.2023', '21.07.2023', '14.07.2023', '7.07.2023', '30.06.2023', '23.06.2023', '16.06.2023', '9.06.2023', '2.06.2023', '26.05.2023', '19.05.2023', '12.05.2023', '5.05.2023', '28.04.2023', '21.04.2023', '14.04.2023', '7.04.2023', '31.03.2023', '24.03.2023', '17.03.2023', '10.03.2023', '3.03.2023', '24.02.2023', '17.02.2023', '10.02.2023', '3.02.2023', '27.01.2023', '20.01.2023', '13.01.2023', '6.01.2023', '30.12.2022', '23.12.2022', '16.12.2022', '9.12.2022', '2.12.2022', '25.11.2022', '18.11.2022', '11.11.2022', '4.11.2022', '28.10.2022', '21.10.2022', '14.10.2022', '7.10.2022', '30.09.2022', '23.09.2022', '16.09.2022', '9.09.2022', '2.09.2022', '26.08.2022', '19.08.2022', '12.08.2022', '5.08.2022', '29.07.2022', '22.07.2022', '15.07.2022', '8.07.2022', '1.07.2022', '24.06.2022', '17.06.2022', '10.06.2022', '3.06.2022', '27.05.2022', '20.05.2022', '13.05.2022', '6.05.2022', '29.04.2022', '22.04.2022', '15.04.2022', '8.04.2022', '1.04.2022', '25.03.2022', '18.03.2022', '11.03.2022', '4.03.2022', '25.02.2022', '18.02.2022', '11.02.2022', '4.02.2022', '28.01.2022', '21.01.2022', '14.01.2022', '7.01.2022', '31.12.2021', '24.12.2021', '17.12.2021', '10.12.2021', '3.12.2021', '26.11.2021', '19.11.2021', '12.11.2021', '5.11.2021', '29.10.2021', '22.10.2021', '15.10.2021', '8.10.2021', '1.10.2021', '24.09.2021', '17.09.2021', '10.09.2021', '3.09.2021', '27.08.2021', '20.08.2021', '13.08.2021', '6.08.2021', '30.07.2021', '23.07.2021', '16.07.2021', '9.07.2021', '2.07.2021', '25.06.2021', '18.06.2021', '11.06.2021', '4.06.2021', '28.05.2021', '21.05.2021', '14.05.2021', '7.05.2021', '30.04.2021', '23.04.2021', '16.04.2021', '9.04.2021', '2.04.2021', '26.03.2021', '19.03.2021', '12.03.2021', '5.03.2021', '26.02.2021', '19.02.2021', '12.02.2021', '5.02.2021', '29.01.2021', '22.01.2021', '15.01.2021', '8.01.2021', '1.01.2021', '25.12.2020', '18.12.2020', '11.12.2020', '4.12.2020', '27.11.2020', '20.11.2020', '13.11.2020', '6.11.2020', '30.10.2020', '23.10.2020', '16.10.2020', '9.10.2020', '2.10.2020', '25.09.2020', '18.09.2020', '11.09.2020', '4.09.2020', '28.08.2020', '21.08.2020', '14.08.2020', '7.08.2020', '31.07.2020', '24.07.2020', '17.07.2020', '10.07.2020', '3.07.2020', '26.06.2020', '19.06.2020', '12.06.2020', '5.06.2020', '29.05.2020', '22.05.2020', '15.05.2020', '8.05.2020', '1.05.2020', '24.04.2020', '17.04.2020', '10.04.2020', '3.04.2020', '27.03.2020', '20.03.2020', '13.03.2020', '6.03.2020', '28.02.2020', '21.02.2020', '14.02.2020', '7.02.2020', '31.01.2020', '24.01.2020', '17.01.2020', '10.01.2020', '3.01.2020', '27.12.2019', '20.12.2019', '13.12.2019', '6.12.2019', '29.11.2019', '22.11.2019', '15.11.2019', '8.11.2019', '1.11.2019', '25.10.2019', '18.10.2019', '11.10.2019', '4.10.2019', '27.09.2019', '20.09.2019', '13.09.2019', '6.09.2019', '30.08.2019', '23.08.2019', '16.08.2019', '9.08.2019', '2.08.2019', '26.07.2019', '19.07.2019', '12.07.2019', '5.07.2019', '28.06.2019', '21.06.2019', '14.06.2019', '7.06.2019', '31.05.2019', '24.05.2019', '17.05.2019', '10.05.2019', '3.05.2019', '26.04.2019', '19.04.2019', '12.04.2019', '5.04.2019', '29.03.2019', '22.03.2019'
            ],
            
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-label',
                },
            }
        }
    };
    var chart = new ApexCharts(document.querySelector("#line-chart"), options);
    chart.render();

     /* basic line chart */
     var options = {
        series: [{
            name: "Stock Price USD",
            data:  [ 4.7, 4.6, 4.9, 5.3, 5.2, 5.1, 5.2, 4.8, 4.6, 4.3, 4.4, 4.3, 4.3, 4.3, 4.4, 4.6, 4.7, 4.9, 4.8, 4.9, 5.0, 5.0, 5.4, 5.7, 6.0, 5.9, 5.8, 6.0, 6.1, 6.1, 5.9, 5.6, 5.8, 5.5, 5.7, 5.7, 5.9, 5.6, 5.0, 4.9, 4.7, 5.0, 5.0, 4.4, 4.5, 4.8, 4.6, 5.0, 5.8, 6.3, 6.1, 6.1, 6.4, 6.7, 7.1, 6.7, 6.2, 5.5, 5.0, 5.8, 6.0, 6.3, 5.1, 6.1, 6.0, 5.6, 5.4, 4.9, 4.9, 4.9, 4.5, 4.3, 4.4, 4.0, 3.9, 3.9, 3.8, 3.6, 3.9, 4.0, 4.0, 3.8, 3.9, 3.9, 3.8, 3.7, 3.6, 3.8, 3.8, 4.1, 4.4, 4.5, 4.5, 4.6, 5.0, 4.9, 4.4, 4.5, 4.6, 4.5, 4.7, 4.4, 4.3, 4.1, 3.9, 3.8, 3.7, 3.8, 4.0, 4.0, 4.2, 3.8, 3.8, 3.9, 4.0, 3.7, 3.7, 4.9, 3.0, 3.6, 3.4, 3.5, 3.6, 3.7, 3.7, 3.5, 3.5, 3.5, 3.6, 3.7, 3.6, 3.7, 3.8, 3.9, 3.8, 3.9, 3.9, 3.8, 3.9, 3.8, 3.9, 3.8, 3.7, 3.4, 3.3, 3.8, 3.6, 3.7, 3.9, 3.9, 4.0, 4.2, 3.8, 3.9, 4.0, 4.2, 4.3, 4.9, 4.8, 4.6, 4.5, 5.0, 4.8, 4.8, 4.5, 4.8, 4.4, 4.4, 4.1, 4.0, 3.9, 4.0, 3.6, 3.7, 3.9, 3.7, 3.3, 3.2, 3.5, 3.5, 3.2, 3.1, 3.0, 3.2, 3.0, 3.0, 2.9, 3.1, 2.9, 3.0, 3.3, 3.2, 3.1, 2.9, 2.8, 2.7, 2.5, 2.5, 2.5, 2.3, 2.3, 2.1, 2.2, 2.3, 2.2, 2.2, 2.3, 2.0, 2.1, 2.0, 2.4, 2.9, 3.0, 3.2, 3.4, 3.6, 3.5, 3.7, 3.7, 3.7, 3.5, 3.4, 3.3, 3.5, 3.5, 3.5, 3.6, 3.4, 3.2, 3.1, 3.2, 3.1, 3.1, 3.3, 3.3, 3.2, 3.2, 3.1, 2.9, 3.0, 3.0, 3.0, 3.1, 3.7, 3.6, 3.5, 3.5, 3.4, 3.3, 3.0, 3.1, 3.0, 2.7, 2.6, 2.8, 3.0, 2.9, 3.3, 3.1, 3.2, 3.0, 3.2
            ] 
        }],
        chart: {
            height: 320,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        colors: ['#845adf'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight',
            width: 3,
        },
        grid: {
            borderColor: '#f2f5f7',
        },
        title: {
            text: 'ARCLK Price Analysis by Month',
            align: 'left',
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#8c9097'
            },
        },
        xaxis: {
            categories : [
                '19.03.2024', '15.03.2024', '8.03.2024', '1.03.2024', '23.02.2024', '16.02.2024', '9.02.2024', '2.02.2024', '26.01.2024', '19.01.2024', '12.01.2024', '5.01.2024', '29.12.2023', '22.12.2023', '15.12.2023', '8.12.2023', '1.12.2023', '24.11.2023', '17.11.2023', '10.11.2023', '3.11.2023', '27.10.2023', '20.10.2023', '13.10.2023', '6.10.2023', '29.09.2023', '22.09.2023', '15.09.2023', '8.09.2023', '1.09.2023', '25.08.2023', '18.08.2023', '11.08.2023', '4.08.2023', '28.07.2023', '21.07.2023', '14.07.2023', '7.07.2023', '30.06.2023', '23.06.2023', '16.06.2023', '9.06.2023', '2.06.2023', '26.05.2023', '19.05.2023', '12.05.2023', '5.05.2023', '28.04.2023', '21.04.2023', '14.04.2023', '7.04.2023', '31.03.2023', '24.03.2023', '17.03.2023', '10.03.2023', '3.03.2023', '24.02.2023', '17.02.2023', '10.02.2023', '3.02.2023', '27.01.2023', '20.01.2023', '13.01.2023', '6.01.2023', '30.12.2022', '23.12.2022', '16.12.2022', '9.12.2022', '2.12.2022', '25.11.2022', '18.11.2022', '11.11.2022', '4.11.2022', '28.10.2022', '21.10.2022', '14.10.2022', '7.10.2022', '30.09.2022', '23.09.2022', '16.09.2022', '9.09.2022', '2.09.2022', '26.08.2022', '19.08.2022', '12.08.2022', '5.08.2022', '29.07.2022', '22.07.2022', '15.07.2022', '8.07.2022', '1.07.2022', '24.06.2022', '17.06.2022', '10.06.2022', '3.06.2022', '27.05.2022', '20.05.2022', '13.05.2022', '6.05.2022', '29.04.2022', '22.04.2022', '15.04.2022', '8.04.2022', '1.04.2022', '25.03.2022', '18.03.2022', '11.03.2022', '4.03.2022', '25.02.2022', '18.02.2022', '11.02.2022', '4.02.2022', '28.01.2022', '21.01.2022', '14.01.2022', '7.01.2022', '31.12.2021', '24.12.2021', '17.12.2021', '10.12.2021', '3.12.2021', '26.11.2021', '19.11.2021', '12.11.2021', '5.11.2021', '29.10.2021', '22.10.2021', '15.10.2021', '8.10.2021', '1.10.2021', '24.09.2021', '17.09.2021', '10.09.2021', '3.09.2021', '27.08.2021', '20.08.2021', '13.08.2021', '6.08.2021', '30.07.2021', '23.07.2021', '16.07.2021', '9.07.2021', '2.07.2021', '25.06.2021', '18.06.2021', '11.06.2021', '4.06.2021', '28.05.2021', '21.05.2021', '14.05.2021', '7.05.2021', '30.04.2021', '23.04.2021', '16.04.2021', '9.04.2021', '2.04.2021', '26.03.2021', '19.03.2021', '12.03.2021', '5.03.2021', '26.02.2021', '19.02.2021', '12.02.2021', '5.02.2021', '29.01.2021', '22.01.2021', '15.01.2021', '8.01.2021', '1.01.2021', '25.12.2020', '18.12.2020', '11.12.2020', '4.12.2020', '27.11.2020', '20.11.2020', '13.11.2020', '6.11.2020', '30.10.2020', '23.10.2020', '16.10.2020', '9.10.2020', '2.10.2020', '25.09.2020', '18.09.2020', '11.09.2020', '4.09.2020', '28.08.2020', '21.08.2020', '14.08.2020', '7.08.2020', '31.07.2020', '24.07.2020', '17.07.2020', '10.07.2020', '3.07.2020', '26.06.2020', '19.06.2020', '12.06.2020', '5.06.2020', '29.05.2020', '22.05.2020', '15.05.2020', '8.05.2020', '1.05.2020', '24.04.2020', '17.04.2020', '10.04.2020', '3.04.2020', '27.03.2020', '20.03.2020', '13.03.2020', '6.03.2020', '28.02.2020', '21.02.2020', '14.02.2020', '7.02.2020', '31.01.2020', '24.01.2020', '17.01.2020', '10.01.2020', '3.01.2020', '27.12.2019', '20.12.2019', '13.12.2019', '6.12.2019', '29.11.2019', '22.11.2019', '15.11.2019', '8.11.2019', '1.11.2019', '25.10.2019', '18.10.2019', '11.10.2019', '4.10.2019', '27.09.2019', '20.09.2019', '13.09.2019', '6.09.2019', '30.08.2019', '23.08.2019', '16.08.2019', '9.08.2019', '2.08.2019', '26.07.2019', '19.07.2019', '12.07.2019', '5.07.2019', '28.06.2019', '21.06.2019', '14.06.2019', '7.06.2019', '31.05.2019', '24.05.2019', '17.05.2019', '10.05.2019', '3.05.2019', '26.04.2019', '19.04.2019', '12.04.2019', '5.04.2019', '29.03.2019', '22.03.2019'
            ],
            
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-label',
                },
            }
        }
    };
    var chart = new ApexCharts(document.querySelector("#line-chart-2"), options);
    chart.render();

    /* line with data labels */
    var options = {
        series: [
            {
                name: "High - 2013",
                data: [28, 29, 33, 36, 32, 32, 33]
            },
            {
                name: "Low - 2013",
                data: [12, 11, 14, 18, 17, 13, 13]
            }
        ],
        chart: {
            height: 320,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: false
            }
        },
        colors: ['#845adf', '#23b7e5'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Average High & Low Temperature',
            align: 'left',
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#8c9097'
            },
        },
        grid: {
            borderColor: '#f2f5f7',
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
                text: 'Month',
                fontSize: '13px',
                fontWeight: 'bold',
                style: {
                    color: "#8c9097"
                }
            },
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            },
        },
        yaxis: {
            title: {
                text: 'Temperature',
                fontSize: '13px',
                fontWeight: 'bold',
                style: {
                    color: "#8c9097"
                }
            },
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-label',
                },
            },
            min: 5,
            max: 40
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    };
    var chart = new ApexCharts(document.querySelector("#line-chart-datalabels"), options);
    chart.render();

    /* zoomable time series */
    var ts2 = 1484418600000;
    var dates = [];
    var spikes = [5, -5, 3, -3, 8, -8]
    for (var i = 0; i < 120; i++) {
        ts2 = ts2 + 86400000;
        var innerArr = [ts2, dataSeries[1][i].value];
        dates.push(innerArr)
    }
    var options = {
        series: [{
            name: 'XYZ MOTORS',
            data: dates
        }],
        chart: {
            type: 'area',
            stacked: false,
            height: 320,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        title: {
            text: 'Stock Price Movement',
            align: 'left',
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#8c9097'
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        grid: {
            borderColor: '#f2f5f7',
        },
        colors: ["#845adf"],
        yaxis: {
            labels: {
                formatter: function (val) {
                    return (val / 1000000).toFixed(0);
                },
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-label',
                },
            },
            title: {
                text: 'Price',
                fontSize: '13px',
                fontWeight: 'bold',
                style: {
                    color: "#8c9097"
                }
            },
        },
        xaxis: {
            type: 'datetime',
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            },
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val) {
                    return (val / 1000000).toFixed(0)
                }
            }
        }
    };
    var chart = new ApexCharts(document.querySelector("#zoom-chart"), options);
    chart.render();

    /* line chart with annotations */
    var options = {
        series: [{
            data: series.monthDataSeries2.prices
        }],
        colors: ["#845adf"],
        chart: {
            height: 320,
            type: 'line',
            id: 'areachart-2'
        },
        annotations: {
            yaxis: [{
                y: 8200,
                borderColor: '#00E396',
                label: {
                    borderColor: '#00E396',
                    style: {
                        color: '#fff',
                        background: '#00E396',
                    },
                    text: 'Support',
                }
            }, {
                y: 8600,
                y2: 9000,
                borderColor: '#000',
                fillColor: '#FEB019',
                opacity: 0.2,
                label: {
                    borderColor: '#333',
                    style: {
                        fontSize: '10px',
                        color: '#333',
                        background: '#FEB019',
                    },
                    text: 'Y-axis range',
                }
            }],
            xaxis: [{
                x: new Date('23 Nov 2017').getTime(),
                strokeDashArray: 0,
                borderColor: '#775DD0',
                label: {
                    borderColor: '#775DD0',
                    style: {
                        color: '#fff',
                        background: '#775DD0',
                    },
                    text: 'Anno Test',
                }
            }, {
                x: new Date('26 Nov 2017').getTime(),
                x2: new Date('28 Nov 2017').getTime(),
                fillColor: '#B3F7CA',
                opacity: 0.4,
                label: {
                    borderColor: '#B3F7CA',
                    style: {
                        fontSize: '10px',
                        color: '#fff',
                        background: '#00E396',
                    },
                    offsetY: -10,
                    text: 'X-axis range',
                }
            }],
            points: [{
                x: new Date('01 Dec 2017').getTime(),
                y: 8607.55,
                marker: {
                    size: 8,
                    fillColor: '#fff',
                    strokeColor: 'red',
                    radius: 2,
                    cssClass: 'apexcharts-custom-class'
                },
                label: {
                    borderColor: '#FF4560',
                    offsetY: 0,
                    style: {
                        color: '#fff',
                        background: '#FF4560',
                    },

                    text: 'Point Annotation',
                }
            }, {
                x: new Date('08 Dec 2017').getTime(),
                y: 9340.85,
                marker: {
                    size: 0
                },
                image: {
                    path: 'static/assets/images/faces/1.jpg'
                }
            }]
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        grid: {
            borderColor: '#f2f5f7',
        },
        title: {
            text: 'Line with Annotations',
            align: 'left',
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#8c9097'
            },
        },
        labels: series.monthDataSeries1.dates,
        xaxis: {
            type: 'datetime',
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-label',
                },
            }
        }
    };
    var chart = new ApexCharts(document.querySelector("#annotation-chart"), options);
    chart.render();

    /* stepline chart */
    var options = {
        series: [{
            data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58]
        }],
        chart: {
            type: 'line',
            height: 345
        },
        stroke: {
            curve: 'stepline',
        },
        grid: {
            borderColor: '#f2f5f7',
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#845adf"],
        title: {
            text: 'Stepline Chart',
            align: 'left'
        },
        markers: {
            hover: {
                sizeOffset: 4
            }
        },
        xaxis: {
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-label',
                },
            }
        }
    };
    var chart2 = new ApexCharts(document.querySelector("#stepline-chart"), options);
    chart2.render();

    /* gradient chart */
    var options = {
        series: [{
            name: 'Sales',
            data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
        }],
        chart: {
            height: 320,
            type: 'line',
        },
        forecastDataPoints: {
            count: 7
        },
        stroke: {
            width: 3,
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'],
            tickAmount: 10,
            labels: {
                formatter: function (value, timestamp, opts) {
                    return opts.dateFormatter(new Date(timestamp), 'dd MMM')
                },
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        grid: {
            borderColor: '#f2f5f7',
        },
        title: {
            text: 'Forecast',
            align: 'left',
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#8c9097'
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                gradientToColors: ['#845adf'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
            },
        },
        yaxis: {
            min: -10,
            max: 40,
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        }
    };
    var chart = new ApexCharts(document.querySelector("#gradient-chart"), options);
    chart.render();

    /* missing/null values chart */
    var options = {
        series: [{
            name: 'Peter',
            data: [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9]
        }, {
            name: 'Johnny',
            data: [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null]
        }, {
            name: 'David',
            data: [null, null, null, null, 3, 4, 1, 3, 4, 6, 7, 9, 5, null, null, null]
        }],
        chart: {
            height: 320,
            type: 'line',
            zoom: {
                enabled: false
            },
            animations: {
                enabled: false
            }
        },
        grid: {
            borderColor: '#f2f5f7',
        },
        stroke: {
            width: [3, 3, 2],
            curve: 'straight'
        },
        colors: ["#845adf", "#23b7e5", "#f5b849"],
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        title: {
            text: 'Missing data (null values)',
            align: 'left',
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#8c9097'
            },
        },
        xaxis: {
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-label',
                },
            }
        }
    };
    var chart = new ApexCharts(document.querySelector("#null-chart"), options);
    chart.render();

    /* syncing charts */
    // Replace Math.random() with a pseudo-random number generator to get reproducible results in e2e tests
    // Based on https://gist.github.com/blixt/f17b47c62508be59987b
    Apex = {
        chart: {
            height: 160,
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        toolbar: {
            tools: {
                selection: false
            }
        },
        markers: {
            size: 6,
            hover: {
                size: 10
            }
        },
        tooltip: {
            followCursor: false,
            theme: 'dark',
            x: {
                show: false
            },
            marker: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return ''
                    }
                }
            }
        },
        grid: {
            clipMarkers: false
        },
        yaxis: {
            tickAmount: 2
        },
        xaxis: {
            type: 'datetime'
        },
    }
    function generateDayWiseTimeSeries(baseval, count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = baseval;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push([x, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    }
    var options = {
        series: [{
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
                min: 10,
                max: 60
            })
        }],
        chart: {
            id: 'fb',
            group: 'social',
            type: 'line',
            height: 160
        },
        colors: ['#845adf'],
        stroke: {
            curve: 'straight',
            width: 3,
        },
        grid: {
            borderColor: '#f2f5f7',
        },
        xaxis: {
            type: 'datetime',
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-label',
                },
            }
        }
    };
    var chart = new ApexCharts(document.querySelector("#chart-line"), options);
    chart.render();

    var optionsLine2 = {
        series: [{
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
                min: 10,
                max: 30
            })
        }],
        chart: {
            id: 'tw',
            group: 'social',
            type: 'line',
            height: 160
        },
        stroke: {
            curve: 'straight',
            width: 3,
        },
        colors: ['#23b7e5'],
        grid: {
            borderColor: '#f2f5f7',
        },
        xaxis: {
            type: 'datetime',
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-label',
                },
            }
        }
    };
    var chartLine2 = new ApexCharts(document.querySelector("#chart-line2"), optionsLine2);
    chartLine2.render();

    var optionsArea = {
        series: [{
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
                min: 10,
                max: 60
            })
        }],
        chart: {
            id: 'yt',
            group: 'social',
            type: 'area',
            height: 160
        },
        stroke: {
            curve: 'straight',
            width: 3,
        },
        colors: ['#f5b849'],
        grid: {
            borderColor: '#f2f5f7',
        },
        xaxis: {
            type: 'datetime',
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-label',
                },
            }
        }
    };
    var chartArea = new ApexCharts(document.querySelector("#chart-area"), optionsArea);
    chartArea.render();

    /* dashed chart */
    var options = {
        series: [{
            name: "Session Duration",
            data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
            name: "Page Views",
            data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
            name: 'Total Visits',
            data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
        ],
        chart: {
            height: 320,
            type: 'line',
            zoom: {
                enabled: false
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [3, 4, 3],
            curve: 'straight',
            dashArray: [0, 8, 5]
        },
        colors: ["#845adf", "#23b7e5", "#f5b849"],
        title: {
            text: 'Page Statistics',
            align: 'left',
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#8c9097'
            },
        },
        legend: {
            tooltipHoverFormatter: function (val, opts) {
                return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
            }
        },
        markers: {
            size: 0,
            hover: {
                sizeOffset: 6
            }
        },
        xaxis: {
            categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
                '10 Jan', '11 Jan', '12 Jan'
            ],
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        tooltip: {
            y: [
                {
                    title: {
                        formatter: function (val) {
                            return val + " (mins)"
                        }
                    }
                },
                {
                    title: {
                        formatter: function (val) {
                            return val + " per session"
                        }
                    }
                },
                {
                    title: {
                        formatter: function (val) {
                            return val;
                        }
                    }
                }
            ]
        },
        grid: {
            borderColor: '#f1f1f1',
        }
    };
    var chart = new ApexCharts(document.querySelector("#dashed-chart"), options);
    chart.render();

    /* real time chart */
    var lastDate = 0;
    var data = []
    var TICKINTERVAL = 86400000
    let XAXISRANGE = 777600000
    function getDayWiseTimeSeries(baseval, count, yrange) {
        var i = 0;
        while (i < count) {
            var x = baseval;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            data.push({
                x, y
            });
            lastDate = baseval
            baseval += TICKINTERVAL;
            i++;
        }
    }
    getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
        min: 10,
        max: 90
    })
    function getNewSeries(baseval, yrange) {
        var newDate = baseval + TICKINTERVAL;
        lastDate = newDate
        for (var i = 0; i < data.length - 10; i++) {
            // IMPORTANT
            // we reset the x and y of the data which is out of drawing area
            // to prevent memory leaks
            data[i].x = newDate - XAXISRANGE - TICKINTERVAL
            data[i].y = 0
        }
        data.push({
            x: newDate,
            y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
        })
    }
    function resetData() {
        // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series
        data = data.slice(data.length - 10, data.length);
    }
    var options = {
        series: [{
            data: data.slice()
        }],
        chart: {
            id: 'dynamic-chart',
            height: 320,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#845adf"],
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        title: {
            text: 'Dynamic Updating Chart',
            align: 'left',
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#8c9097'
            },
        },
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime',
            range: XAXISRANGE,
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        yaxis: {
            max: 100,
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        legend: {
            show: false
        },
    };
    var chart = new ApexCharts(document.querySelector("#dynamic-chart"), options);
    chart.render();
    window.setInterval(function () {
        getNewSeries(lastDate, {
            min: 10,
            max: 90
        })
        chart.updateSeries([{
            data: data
        }])
    }, 1000)

    /* brush chart */
    function generateDayWiseTimeSeries(baseval, count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = baseval;
            var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push([x, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    }
    var data = generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 185, {
        min: 30,
        max: 90
    })
    var options = {
        series: [{
            data: data
        }],
        chart: {
            id: 'chart2',
            type: 'line',
            height: 200,
            toolbar: {
                autoSelected: 'pan',
                show: false
            }
        },
        colors: ['#845adf'],
        stroke: {
            width: 3
        },
        fill: {
            opacity: 1,
        },
        markers: {
            size: 0
        },
        grid: {
            borderColor: '#f2f5f7',
        },
        xaxis: {
            type: 'datetime',
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            },
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-label',
                },
            },
        }
    };
    var chart = new ApexCharts(document.querySelector("#brush-chart1"), options);
    chart.render();

    var optionsLine = {
        series: [{
            data: data
        }],
        chart: {
            id: 'chart1',
            height: 130,
            type: 'area',
            brush: {
                target: 'chart2',
                enabled: true
            },
            selection: {
                enabled: true,
                xaxis: {
                    min: new Date('19 Jun 2017').getTime(),
                    max: new Date('14 Aug 2017').getTime()
                }
            },
        },
        dataLabels: {
            enabled: false,
        },
        colors: ['#23b7e5'],
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.91,
                opacityTo: 0.1,
            }
        },
        grid: {
            borderColor: '#f2f5f7',
        },
        markers: {
            size: 0
        },
        xaxis: {
            type: 'datetime',
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            },
            tooltip: {
                enabled: false
            }
        },
        yaxis: {
            tickAmount: 2,
            labels: {
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-label',
                },
            },
        }
    };
    var chartLine = new ApexCharts(document.querySelector("#brush-chart"), optionsLine);
    chartLine.render();

})();