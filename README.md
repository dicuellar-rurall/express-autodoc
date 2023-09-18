# express-autodoc

Autogenera documentación Swagger para Express con TypeScript basándose en la detección automática de controladores, solicitudes y respuestas, y validaciones con Joi.

## Uso

```typescript
import express from 'express';
import generateSwaggerSpec from 'express-autodoc';

const app = express();
// ... tus rutas ...

const spec = generateSwaggerSpec(app);
app.get('/swagger.json', (req, res) => {
    res.json(spec);
});

app.listen(3000);
