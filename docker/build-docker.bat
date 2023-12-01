:: Variables
set REPOSITORY=thatbenbierens/codex-frontend
set TAG=initial
set APP_SRC=../frontend
set NGINX_TEMPLATE=docker/nginx.template

:: Build
docker build --build-arg APP_SRC=%APP_SRC% --build-arg NGINX_TEMPLATE=%NGINX_TEMPLATE% -t %REPOSITORY%:%TAG% .
docker push %REPOSITORY%:%TAG%
