import Joi from 'joi';

interface Route {
  path: string;
  methods: string[];
  validation?: Joi.ObjectSchema;
}

interface SwaggerSpec {
  openapi: string;
  info: {
    title: string;
    version: string;
  };
  paths: any;
}

class SwaggerGenerator {
  private routes: Route[];
  private readonly spec: SwaggerSpec;

  constructor(routes: Route[]) {
    this.routes = routes;
    this.spec = {
      openapi: "3.0.0",
      info: {
        title: "API",
        version: "1.0.0"
      },
      paths: {}
    };
  }

  generate() {
    this.routes.forEach(route => {
      this.spec.paths[route.path] = {};

      route.methods.forEach(method => {
        this.spec.paths[route.path][method] = {
          responses: {
            '200': {
              description: 'OK'
            }
          }
        };

        // Si hay validación con Joi, la convertimos a la especificación Swagger
        if (route.validation) {
          this.spec.paths[route.path][method].parameters = this.convertJoiToSwagger(route.validation);
        }
      });
    });
  }

  convertJoiToSwagger(joiSchema: Joi.ObjectSchema): any[] {
    // Aquí convertirías el esquema Joi a una especificación Swagger.
    // Esta es una tarea compleja y podría requerir una librería adicional o una implementación detallada.
    // Por simplicidad, dejaremos un esqueleto aquí.
    return [];
  }

  getSpec() {
    return this.spec;
  }
}

export default SwaggerGenerator;
