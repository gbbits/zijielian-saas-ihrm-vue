import { boot } from 'quasar/wrappers'
import {getStorage} from 'src/utils/storage';

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

export default boot(({ router }) => {
  // something to do

  router.beforeEach((to, from, next) => {
    const hasToken = getStorage({ name:'accessToken' })
    console.log(hasToken)

    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/' })
      }else {

      }
    }else {
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
      }
    }
  })

})
