# 1. 최신 Node 버전 사용
FROM node:24-alpine

WORKDIR /app

# 2. 의존성 설치 (Vite는 이 단계가 빨라요)
COPY package.json package-lock.json ./
RUN npm install

# 3. 소스 코드 복사
COPY . .

# 4. Vite 기본 포트는 5173입니다. 이를 외부와 연결하기 위해 --host 옵션이 필요해요.
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]