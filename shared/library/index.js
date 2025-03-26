//amchart3 라이브러리
import 'amcharts3';
import 'amcharts3/amcharts/pie';
import 'amcharts3/amcharts/radar';
import 'amcharts3/amcharts/serial';

const files = require.context('.', true, /\.js$/);
const modules = {};

files.keys().forEach((key) => {
    if (key === './index.js') return;
    modules[key.toLowerCase().replace(/(\.\/|\.js)/g, '')] = files(key).default;
});

export default modules;
