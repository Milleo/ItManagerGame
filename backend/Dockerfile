FROM node
WORKDIR /app
COPY . .
RUN npm install
CMD [ "npx", "prisma", "db", "push" ]