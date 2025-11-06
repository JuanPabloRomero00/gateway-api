# Configuración del Gateway API - Troubleshooting

## URLs de los servicios
- **Frontend**: https://carwashfrontend.netlify.app/
- **Gateway API**: https://gateway-api-lztd.onrender.com/
- **Users API**: https://users-api-jmp5.onrender.com/
- **Appointments API**: https://carwash-appointments.onrender.com/
- **Services API**: https://carwash-services.onrender.com/

## Variables de entorno requeridas en Render

### Para el Gateway API:
```
USERS_API_URL=https://users-api-jmp5.onrender.com
APPOINTMENTS_API_URL=https://carwash-appointments.onrender.com
SERVICES_API_URL=https://carwash-services.onrender.com
FRONTEND_URL=https://carwashfrontend.netlify.app
JWT_SECRET=B8NjD4mOY1LQ4V
JWT_REFRESH_SECRET=QQxB0EcFo0Aq4d
ADMIN_REGISTER_SECRET=sistemaintegraldelaseguridad
NODE_ENV=production
```

## Cambios realizados para solucionar conectividad:

### 1. Configuración CORS mejorada
- Se actualizó la configuración CORS para permitir el origen del frontend
- Se agregó manejo de preflight requests (OPTIONS)
- Se configuró para permitir credenciales desde orígenes confiables

### 2. Variables de entorno actualizadas
- Se cambiaron las URLs de localhost a las URLs de producción
- Se configuró el FRONTEND_URL correcto

### 3. Health check endpoint
- Se agregó endpoint "/" para health checks de Render

## Pruebas de conectividad

### Verificar que el Gateway está funcionando:
```bash
curl https://gateway-api-lztd.onrender.com/
```

### Verificar conexión con Users API:
```bash
curl https://gateway-api-lztd.onrender.com/api/users
```

### Verificar conexión con Services API:
```bash
curl https://gateway-api-lztd.onrender.com/api/services
```

## Pasos siguientes:

1. **Deploy en Render**: Hacer push de los cambios para que se redeploy automáticamente
2. **Verificar variables**: Asegurar que las variables de entorno estén configuradas en el panel de Render
3. **Probar endpoints**: Verificar que el frontend pueda conectarse al gateway
4. **Revisar logs**: Monitorear logs en Render para detectar errores de conectividad

## Posibles problemas adicionales:

1. **Cold starts**: Los servicios en Render pueden tardar en "despertar"
2. **HTTPS vs HTTP**: Asegurar que todas las URLs usen HTTPS
3. **Timeouts**: Los servicios pueden tener timeouts si están inactivos

## Comandos útiles para debugging:

```bash
# Verificar health de cada servicio
curl https://users-api-jmp5.onrender.com/
curl https://carwash-appointments.onrender.com/
curl https://carwash-services.onrender.com/

# Verificar desde el frontend
# Abrir DevTools en el navegador y verificar Network tab
```