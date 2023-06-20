FROM node:18-alpine

ARG DATABASE_URL
ARG JWT_SECRET

ENV DATABASE_URL ${DATABASE_URL}
ENV JWT_SECRET ${JWT_SECRET}

WORKDIR /app
COPY . .

RUN yarn build

EXPOSE 3001

CMD ["yarn", "run", "start:prod"]