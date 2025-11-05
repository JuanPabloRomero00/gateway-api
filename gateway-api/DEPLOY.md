# 🚀 Despliegue Gateway API en Render

## Variables de Entorno Requeridas

Basándome en tu código, necesitas configurar estas variables en Render:

### Obligatorias
- `PORT` - Puerto del servidor (Render asigna automáticamente 10000)
- `NODE_ENV` - `production`

### URLs de Servicios (Configura según tus otros servicios)
- `USERS_API_URL` - URL del microservicio de usuarios
- `APPOINTMENTS_API_URL` - URL del microservicio de citas
- `SERVICES_API_URL` - URL del microservicio de servicios

### Ejemplo de valores
```
USERS_API_URL=https://users-service.onrender.com
APPOINTMENTS_API_URL=https://appointments-service.onrender.com
SERVICES_API_URL=https://services-service.onrender.com
```

## 📋 Pasos para Desplegar

### 1. Preparar Repositorio
- ✅ Tu `.gitignore` ya está configurado correctamente
- ✅ Tu `package.json` ya tiene el script `"start": "node server.js"`

### 2. Conectar a Render
1. Ve a [render.com](https://render.com) y crea una cuenta
2. Conecta tu cuenta de GitHub
3. Haz clic en "New +" → "Web Service"
4. Selecciona tu repositorio `gateway-api`

### 3. Configurar el Servicio
- **Name**: `gateway-api` (o el nombre que prefieras)
- **Region**: Ohio (más económico)
- **Branch**: `main`
- **Root Directory**: `gateway-api`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 4. Configurar Variables de Entorno
En la sección "Environment Variables":
- `NODE_ENV` = `production`
- `USERS_API_URL` = URL de tu servicio de usuarios
- `APPOINTMENTS_API_URL` = URL de tu servicio de citas
- `SERVICES_API_URL` = URL de tu servicio de servicios

### 5. Desplegar
- Haz clic en "Create Web Service"
- Render automáticamente detectará tu aplicación Node.js
- El despliegue tomará unos 2-3 minutos

## 🔄 Auto-Deploy
Render se conecta automáticamente a tu rama `main`. Cada push activará un nuevo despliegue.

## 📊 Plan Free
- 750 horas gratuitas por mes
- Se "duerme" después de 15 minutos de inactividad
- Se "despierta" automáticamente con la primera request

## 🛠️ Troubleshooting

### Si el servicio no inicia:
1. Revisa los logs en el dashboard de Render
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate que las URLs de los otros servicios sean correctas

### Para desarrollo local:
```bash
cd gateway-api
npm install
npm run dev
```