import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { createPinia, PiniaVuePlugin } from 'pinia';
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import { ApolloClient, DefaultOptions } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import VueApollo from 'vue-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory';

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
pinia.use(piniaPluginPersistedState);
Vue.use(PiniaVuePlugin);
Vue.use(VueApollo);
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
})

// set authorization header to authenticate the request using apollo link, it is optional.

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')
  operation.setContext({
    headers: {
      authorization: token || ''
    }
  })
  return forward(operation)
})


const link = ApolloLink.from([
  authMiddleware,
  httpLink
])

// const apolloClient = new ApolloClient({
//   link,
//   cache: new InMemoryCache(),
//   connectToDevTools: true
// })

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}


const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})


Vue.config.productionTip = false

new Vue({
  pinia,
  router,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
