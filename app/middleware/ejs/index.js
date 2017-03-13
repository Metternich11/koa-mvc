'use strict';

const _ = require('lodash');
const koaEjs = require('koa-ejs');
const path = require('path');

module.exports = async function ejs(app) {
  const viewPath = path.join(KoaConfig.path, 'views');

  koaEjs(app, _.merge({}, KoaConfig.views, {
    root: viewPath,
    viewExt: 'ejs',
  }));

  // override the render function to auto-fill the view name based on controller and action
  const render = app.context.render;
  app.context.render = async function ejsRender(view, options) {
    const context = this;
    let viewName = view;
    let viewOptions = options;
    if (!view || _.isObject(view)) {
      viewOptions = view;

      const routeInfo = KoaConfig.routeDetails[context.originalUrl];
      if (routeInfo) {
        viewName = path.join(routeInfo.controller, routeInfo.action);
      }
    }

    return render.apply(context, [viewName, viewOptions]);
  };

};
