import express from 'express';
import ExpressParser from './parser';
import SwaggerGenerator from './generator';

function generateSwaggerSpec(app: express.Application) {
  const parser = new ExpressParser(app);
  parser.parse();

  const generator = new SwaggerGenerator(parser.getRoutes());
  generator.generate();

  return generator.getSpec();
}

export default generateSwaggerSpec;
