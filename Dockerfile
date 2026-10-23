FROM node:22.23.4-alpine

WORKDIR /app

# Копирај npm правила
COPY .npmrc ./
COPY package*.json ./
COPY client/package*.json ./client/

# Инсталирај сè
RUN npm install

# Копирај код
COPY . .

# Билдај го фронтендот (Vite прави 'dist')
RUN npm run build --prefix client

# Изложи ја портата 3002
EXPOSE 3002

CMD ["npm", "start"]