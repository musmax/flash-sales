const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');
const mediaRoute = require('./media.route');
const uploadRoute = require('./upload.route');
const productRoute = require('./product.route');
const orderRoute = require('./order.route');
const leaderboardRoute = require('./leaderboard.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/medias',
    route: mediaRoute,
  },
  {
    path: '/uploads',
    route: uploadRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/order',
    route: orderRoute,
  },
  {
    path: '/leaderboard',
    route: leaderboardRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
