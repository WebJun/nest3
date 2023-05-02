
### [1] docker 빌드 및 실행
cd ~  
git clone https://github.com/WebJun/nest2  
cd nest2

### [2] docker 빌드 및 실행(3분 소요)
docker compose up -d --build

### [3] npm install 및 실행
docker exec -it nest2-nest-1 yarn  
docker exec -it nest2-nest-1 yarn start:dev

### [4] 브라우저 http://localhost:13000/ 에 접속한다

### 참고사항
https://oysu.tistory.com/52  