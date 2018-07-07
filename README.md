/************node**************/

    local 启动
    sudo node src/be/app.js

    prd 启动
    forever start -l forever.log -o out.log -e err.log tlog/src/be/app.js

/************fe compile command**************/
    npx