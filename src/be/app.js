const express = require('express');
const routes = require('./routes');
const path = require('path');
const app = express();
app.use('/page', express.static(__dirname + '/views'));
app.use('/static', express.static(path.resolve(__dirname, '../', '../', 'dist')));
const bodyParser = require('body-parser');

const models = require('./models/index');

app.use(bodyParser.json({
    limit: '50mb'
}));

models.sequelize.sync({
   // force: true
}).then(() => {
    console.log('服务启动成功');
    app.listen(8001);
    app.use('/', routes);
}).catch((err) => {
    console.log(err);
    console.error('同步数据库出错');
});







