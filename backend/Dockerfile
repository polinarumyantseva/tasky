# ================================================
# Этап 1: Сборка фронтенда
# ================================================
FROM node:18-alpine AS frontend-builder

WORKDIR /frontend

# Копируем зависимости фронтенда и устанавливаем их
COPY ../frontend/package.json ../frontend/package-lock.json ./
RUN npm install

# Копируем исходный код фронтенда и собираем
COPY ../frontend .
RUN npm run build


# ================================================
# Этап 2: Сборка бэкенда
# ================================================
FROM node:18-alpine

WORKDIR /app

# Копируем зависимости бэкенда и устанавливаем их
COPY ../backend/package.json ../backend/package-lock.json ./
RUN npm install

# Копируем исходный код бэкенда
COPY ../backend/ .

# Копируем собранный фронтенд из первого этапа
COPY --from=frontend-builder /frontend/dist ./public

# Открываем порт
EXPOSE 3005

# Запускаем сервер
CMD ["npm", "start"]