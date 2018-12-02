/*  **************** Public Preferences - Pie Chart ******************** */

var dataPreferences = {
    labels: ['62%', '32%', '6%'],
    series: [62, 32, 6]
};

var optionsPreferences = {
    height: '230px'
};

Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

/*  **************** Simple Bar Chart - barchart ******************** */

var dataMultipleBarsChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
        [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
    ]
};

var optionsMultipleBarsChart = {
    seriesBarDistance: 10,
    axisX: {
        showGrid: false
    },
    height: '300px'
};

var responsiveOptionsMultipleBarsChart = [
    ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
            labelInterpolationFnc: function (value) {
                return value[0];
            }
        }
    }]
];

var multipleBarsChart = Chartist.Bar('#multipleBarsChart', dataMultipleBarsChart, optionsMultipleBarsChart, responsiveOptionsMultipleBarsChart);

//start animation for the Emails Subscription Chart
md.startAnimationForBarChart(multipleBarsChart);