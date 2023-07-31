import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ 
    user: {} as {[key:string]:string}
}),
  getters: {
    getUser: (state) => state.user.username,
    getUserEmail: (state) => state.user.email,
    getId: (state) => state.user.id,
    getToken: (state) => state.user.token,
  },
  actions: {
    setUser(user:{[key:string]:string}){
        this.user=user;
    },
    reset(){
        this.user={};
    }
  },
  persist: true
})