import express from 'express';
import ExpressParser from './parser';
import SwaggerGenerator from './generator';
import swaggerUi from 'swagger-ui-express';

export default function setupSwaggerUI(app: express.Application) {
  const parser = new ExpressParser(app);
  parser.parse();

  const generator = new SwaggerGenerator(parser.getRoutes());
  generator.generate();

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(generator.getSpec()));
}

