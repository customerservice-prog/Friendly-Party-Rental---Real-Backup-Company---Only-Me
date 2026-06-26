FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache openssl
ENV HOSTNAME=0.0.0.0
COPY package*.json .npmrc ./
RUN npm ci --legacy-peer-deps --ignore-scripts
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npx next start -H 0.0.0.0 -p ${PORT:-3000}"]
