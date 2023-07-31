<template>
     <v-main>
        <v-container id="loginpage" fluid fill-height>
           <v-layout align-center justify-end>

              <v-row>
                <v-col cols="7">

                </v-col>
                <v-col>
                  <v-alert
                    v-model="alert"
                    type="error"
                  >
                    {{ alertMsg }}
                  </v-alert>
                 <v-card >
                    <v-toolbar dark class="amber--text">
                       <v-toolbar-title>{{isRegister ? state.register.name : state.login.name}} {{ userStore.getUser }}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text >
                    <form ref="form" @submit.prevent="isRegister ? register() : login()">
                           <v-text-field
                             v-model="username"
                             name="username"
                             label="Username"
                             type="text"
                             color="amber accent-3"
                             placeholder="username"
                             required
                             outlined
                          ></v-text-field>
                           <v-text-field
                             v-model="password"
                             name="password"
                             label="Password"
                             type="password"
                             color="amber accent-3"
                             placeholder="password"
                             required
                             outlined
                          ></v-text-field>

                          <v-text-field v-if="isRegister"
                             v-model="confirmPassword"
                             name="confirmPassword"
                             label="Confirm Password"
                             color="amber accent-3"
                             type="password"
                             placeholder="confirm password"
                             required
                             outlined
                          ></v-text-field>
                          <v-text-field v-if="isRegister"
                             v-model="firstName"
                             name="firstName"
                             label="First Name"
                             type="text"
                             color="amber accent-3"
                             placeholder="firstName"
                             required
                             outlined
                          ></v-text-field>
                          <v-text-field v-if="isRegister"
                             v-model="lastName"
                             name="lastName"
                             label="Last Name"
                             type="text"
                             color="amber accent-3"
                             placeholder="lastName"
                             required
                             outlined
                          ></v-text-field>
                          <v-text-field v-if="isRegister"
                             v-model="email"
                             name="email"
                             label="Email"
                             type="text"
                             color="amber accent-3"
                             placeholder="email"
                             required
                             outlined
                          ></v-text-field>
                          <v-container>
                            <v-row>
                               <v-col>
                                  <v-btn text outlined type="submit" class="mt-4" color="amber accent-3" value="log in">{{isRegister ? state.register.name : state.login.name}}</v-btn>
                               </v-col>
                               <v-col>
                                  <v-btn class="text-h7 mt-4" dark small text v-on:click="toggleAction()">
                                     {{toggleMessage}}  
                                 </v-btn>
                               </v-col>
                            </v-row>
                          </v-container>
                     </form>
                    </v-card-text>
                    <v-card-text>
                      <v-spacer></v-spacer>
                      Photo by <a href="https://unsplash.com/@momentsbyebba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ebba Thoresson</a> on <a href="https://unsplash.com/photos/Fjqb37yTdc4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                    </v-card-text>
                 </v-card>
                </v-col>
                <v-col cols="1">
                </v-col>
              </v-row>

           </v-layout>

        </v-container>
     </v-main>
</template>

<script lang="ts">
import gql from 'graphql-tag'
import {useUserStore} from '../store/user';
import Vue from 'vue';

const GET_HELLO = gql`
  query Hello{
    hello
  }
`
const AUTH_USER = gql`
  query AuthenticateUser($username: String!, $password: String!) {
    authenticateUser(username: $username, password: $password) {
      user {
        id
        username
        email
      }
      token
    }
  }
`
const REGISTER_USER = gql`
  mutation RegisterUser($newUser: NewUserInput!) {
    createNewUser(newUser:$newUser) {
      user {
      id
        username
        email
      }
      token
    }
  }`

export default Vue.extend({
    name: "LoginView",
    data(){
      const userStore = useUserStore()
      return {
        hello:'',
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        email: "",
        isRegister : false,
        errorMessage: "",
        state: {
            register :{
              name: 'Register',
              message: 'Already have an Account? Login'
            },
            login : {
              name: 'Sign In',
              message: "Don't have an Account? Register"
            }
        },
        userStore,
        alert:false,
        alertMsg:""
      }
    },
    async created(){
      this.hello = await this.getHello();
    },
    methods: {
      async getHello() {
        const data = await this.$apolloProvider.defaultClient.query({
            query: GET_HELLO
          })
        return data.data.hello;
      },
      async login(){
        this.alert = false;
        this.alertMsg = "";
        try{
            const data:any = await this.$apollo.query({
            query: AUTH_USER,
            variables:{
              username:this.username,
              password: this.password
            }
            });
            if(!data.data){
              this.alert = true;
              this.alertMsg = data.errors[0].message;
            }else{
              this.userStore.setUser(data.data.authenticateUser.user);
            // localStorage.setItem('token', JSON.stringify(data.data.authenticateUser.token));
            localStorage.setItem('token', data.data.authenticateUser.token);
            this.$router.push("/home")
            }
        }catch(err:any){
          this.alert = true;
          this.alertMsg = err.message.slice(14);
        }
      },
      async register(){
        this.alert = false;
        this.alertMsg = "";
        try{
          if(this.password !== this.confirmPassword){
            throw new Error("Passwords do not match");
          }
          const newUser = {
            username: this.username,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
          }
          const data:any = await this.$apollo.mutate({
            mutation: REGISTER_USER,
            variables:{
              newUser
            }
          });
          this.userStore.setUser(data.data.createNewUser.user);
          localStorage.setItem('token', JSON.stringify(data.data.createNewUser.token));
          this.$router.push("/home");

        }catch(err:any){
          this.alert = true;
          this.alertMsg = err.message.slice(14);
        }
      },
      toggleAction(){
        this.resetForm();
        this.isRegister = !this.isRegister; this.errorMessage="";
      },
      resetForm(){
        this.password = "";
        this.confirmPassword ="";
      }
    },
    computed: {
      toggleMessage(): string { 
         return this.isRegister ? this.state.register.message : this.state.login.message 
        }
   }
})
</script>
<style>
#loginpage{
  background: url('https://images.unsplash.com/photo-1624024382423-3c2450764af4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')
    no-repeat center center fixed !important;
  background-size: cover;
}
</style>