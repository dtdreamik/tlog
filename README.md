/************node**************/
       
           local 启动
           sudo node src/be/app.js
       
           prd 启动
            forever start -l forever.log -a -o out.log -e err.log tlog/src/be/app.js

            prd部署

            数据库配置文件
                mv src/be/config/settings.js ../
                mv settings.js tlog/src/be/config/

       /************fe compile command**************/
           npx