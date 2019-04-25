const express = require('express');
const compression = require('compression')
const routes = require('./routes');
const path = require('path');
const app = express();
app.use(compression());
app.use('/page', express.static(__dirname + '/views'));
app.use('/static', express.static(path.resolve(__dirname, '../', '../', 'dist')));
const bodyParser = require('body-parser');

const models = require('./models/index');

app.use(bodyParser.json({
    limit: '50mb'
}));

let force = false;

models.sequelize.sync({
    force: force
}).then(() => {
    console.log('服务启动成功');
    app.listen(8001);
    app.use('/', routes);


    // models['chart'].create({
    //     symbol: 'jd',
    //     path: '/index',
    //     date: new Date(0)
    // })
    //     .then(function(chart) {
    //         chart.addTags(1);
    //     });

    if (force) {

        //初始化entryStrategy  exitStrategy表数据 给个默认值 要不插入tradeLog会报:a foreign key constraint fails

        models['entry_strategy'].create({
            name: 'entry_strategy'
        });

        models['exit_strategy'].create({
            name: 'exit_strategy'
        });
    }
}).catch((err) => {
    console.log(err);
    console.error('同步数据库出错');
});







