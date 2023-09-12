import Vue from 'vue';
import VueRouter from 'vue-router';

import pages from './routes/pages';
import info from './routes/info';
import managment from './routes/managment';
import document from './routes/document';
import report from './routes/report';
import proposal from './routes/proposal';
import hrm from './routes/hrm';
const Dashboard = () => import('@/views/dashboard');
Vue.use(VueRouter);

const router = new VueRouter({
   mode: 'history',
   base: process.env.BASE_URL,
   scrollBehavior() {
      return { x: 0, y: 0 };
   },
   routes: [
      ...info,
      ...managment,
      ...document,
      ...report,
      ...proposal,
      ...hrm,
      { path: '/', redirect: { name: 'dashboard' } },
      { path: '/dashboard', name: 'dashboard', component: Dashboard },
      ...pages,
      {
         path: '*',
         redirect: 'error-404'
      }
   ]
});

router.beforeEach((to, from, next) => {
   // const isLoggedIn = isUserLoggedIn()

   // if (!canNavigate(to)) {
   //   // Redirect to login if not logged in
   //   if (!isLoggedIn) return next({ name: 'auth-login' })

   //   // If logged in => not authorized
   //   return next({ name: 'misc-not-authorized' })
   // }

   // // Redirect if logged in
   // if (to.meta.redirectIfLoggedIn && isLoggedIn) {
   //   const userData = getUserData()
   //   next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
   // }

   // return next()
   if (to.path !== '/login' && !to.meta.redirectIfLoggedIn) {
      if (localStorage.getItem('user_info')) {
         next();
      } else {
         next('login');
      }
   } else {
      next();
   }
});

export default router;
