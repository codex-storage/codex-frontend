:: Variables
set repository=thatbenbierens/codex-frontend
set tag=initial
set app_src=../frontend

:: Build
docker build --build-arg APP_SRC=%app_src% -t %repository%:%tag% .
docker push %repository%:%tag%
