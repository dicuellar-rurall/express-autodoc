import express from 'express';
import Joi from 'joi';

interface Route {
  path: string;
  methods: string[];
  validation?: Joi.ObjectSchema;
}

class ExpressParser {
  private app: express.Application;
  private readonly routes: Route[];

  constructor(app: express.Application) {
    this.app = app;
    this.routes = [];
  }

  parse() {
    const stack = this.app._router.stack;

    stack.forEach((middleware: any) => {
      if (middleware.route) {
        const methods = Object.keys(middleware.route.methods);
        const path = middleware.route.path;

        const route: Route = { path, methods };

        if (middleware.route.validate) {
          route.validation = middleware.route.validate;
        }

        this.routes.push(route);
      }
    });
  }

  getRoutes() {
    return this.routes;
  }
}

export default ExpressParser;
