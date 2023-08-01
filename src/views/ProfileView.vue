<template>
    <v-container>
        <v-row >
            <v-col class="ma-0 pa-0 mb-1 pb-3">
                <v-card class="elevation-0" color="#121212">
                    <v-card-title class="text-overline">User Profile</v-card-title>
                    <v-card-text>
                        <v-alert 
                            type="error"
                            text 
                            outlined
                            dismissible
                            v-model="error"
                        >
                        {{ errorMsg }}
                        </v-alert>
                        <v-alert 
                            type="success"
                            text 
                            outlined
                            dismissible
                            v-model="success"
                        >
                        {{ successMsg }}
                        </v-alert>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field
                               v-model="user.username"
                               name="username"
                               label="Username"
                               type="text"
                               placeholder="username"
                               required
                               filled
                               shaped
                               :readonly="notEditUser"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                               v-model="user.firstName"
                               name="FirstName"
                               label="First Name"
                               type="text"
                               placeholder="First Name"
                               required
                               filled
                               shaped
                               :readonly="notEditUser"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                               v-model="user.lastName"
                               name="LastName"
                               label="Last Name"
                               type="text"
                               placeholder="Last Name"
                               required
                               filled
                               shaped
                               :readonly="notEditUser"
                            ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                    <v-text-field
                                v-model="user.email"
                                name="Email"
                                label="Email"
                                type="text"
                                placeholder="Email"
                                required
                                filled
                                shaped
                                :readonly="notEditUser"
                                ></v-text-field>
                                </v-col>
                            <v-col cols="4">
                                <v-card-actions>
                                    <v-btn v-if="notEditUser" block outlined dark @click="notEditUser=false" color="amber darken-1">Edit</v-btn>
                                    <v-btn v-if="!notEditUser" block outlined dark @click="updateUser" color="green">Save</v-btn>
                                    <v-btn v-if="!notEditUser" block outlined dark   @click="cancelUpdateUser" color="red">Cancel</v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                        <v-row v-if="changePasswordForm">
                            <v-col cols="4">
                                <v-text-field
                                    v-model="oldPassword"
                                    name="oldPassword"
                                    label="Old Password"
                                    type="password"
                                    placeholder="Old Password"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="newPassword"
                                    name="newPassword"
                                    label="New Password"
                                    type="password"
                                    placeholder="New Password"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-btn block outlined dark @click="updatePassword" color="green">update</v-btn>
                            </v-col>
                            <v-col cols="2">
                                <v-btn block outlined color="red" @click="cancelUpdatePassword">cancel</v-btn>
                            </v-col>
                        </v-row>
                        <v-row v-if="!changePasswordForm" >
                            <v-col cols="4">
                                <v-btn @click="changePasswordForm=true" block text outlined>
                                    change password
                                    <v-icon>mdi mdi-lock</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>

                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col class="ma-0 pa-0">
                <v-dialog
                    v-model="showUserDeleteDialog"
                    persistent
                    max-width="400"
                    >
                    <v-card>
                        <v-card-title class="text-overline red--text">
                            Delete User Account
                        </v-card-title>
                        <v-card-text>Are you sure you want to delete the account? Note that this action is <b>irreversible</b>. 
                            <strong><span class="red--text">Tasks and Project not owned by you will be retained.</span></strong>
                            <br/>
                            Please type the below text to confirm deleting your account
                        <v-text-field v-model="deleteConfirmationText" label="I would like to delete my account">
                        </v-text-field>
                        <v-text-field v-if="deleteConfirmationText==='I would like to delete my account'"
                                    v-model="password"
                                    name="Password"
                                    label="Password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>


                        <v-btn
                            color="green darken-3"
                            dark
                            @click="cancelUserAccountDelete"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            v-if="deleteConfirmationText==='I would like to delete my account'"
                            text
                            color="red darken-1"
                            @click="deleteUserAccountConfirm"
                        >
                            Delete
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-card class="elevation-0" color="#121212">
                    <v-card-title class="text-overline">
                        User Account Settings
                    </v-card-title>
                    <v-card-text>
                        <v-list color="#121212">
                            <v-list-item v-for="(item, i) in actionItems" :key="i" @click="actionItemFunction(i)">
                                <v-list-item-icon>
                                    <v-icon dark :color="item.color" v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    {{ item.text }}
                                </v-list-item-content>

                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import { useUserStore } from '@/store/user';
import { gql } from 'graphql-tag';
import { GraphQLError } from 'graphql';
const GET_USER_DETAILS = gql`
query GetUser {
  getUser {
    id
    username
    firstName
    lastName
    email
  }
}`

const UPDATE_USER = gql`
mutation Mutation($updatedUser: UserInput!) {
  editUser(updatedUser: $updatedUser) {
    id
    username
    firstName
    lastName
    email
  }
}
`

const UPDATE_PASSWORD = gql`
mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
  updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    id
    message
    success
  }
}
`

const DELETE_USER = gql`
mutation DeleteUser($password: String!) {
  deleteUser(password: $password) {
    id
    message
    success
  }
}
`
export default Vue.extend({
    name:"ProfileView",
    data(){
        const userStore = useUserStore();
        const userName = userStore.getUser;
        let add_val_tags: string[] = []
        let actionItems  = [
            {
                action: '',
                icon: 'mdi mdi-logout',
                text: 'Logout',
                color:'grey'
            },
            {
                action: '',
                icon: 'mdi mdi-delete',
                text: 'Delete this account',
                color:'red'
            }
        ]
        return {
            newPassword:"",
            oldPassword:"",
            password:"",
            changePasswordForm:false,
            userStore,
            notEditUser:true,
            userName,
            error:false,
            errorMsg:"",
            success: false,
            successMsg:"",
            showDeleteDialog:false,
            deleteCommentId: "",
            showEditDialog: false,
            cities:[],
            majors:[],
            unis:[],
            autoTags:[""],
            add_city_val:"",
            add_major_val:"",
            add_uni_val:"",
            add_val_tags,
            actionItems,
            showUserDeleteDialog:false,
            deleteConfirmationText:"",
            user:{} as any
            }
    },
    async mounted(){
        await this.getUserDetails();
    },
    methods:{
        cancelUpdatePassword(){
            this.oldPassword = "";
            this.newPassword = "";
            this.changePasswordForm = false;
        },
        async getUserDetails(){
            const resp = await this.$apollo.query({
                query: GET_USER_DETAILS
            });
            if(resp && resp.data && resp.data.getUser){
                this.user = resp.data.getUser;
            }
        },
        async updateUser(){
            this.error = false;
            this.errorMsg = "";
            this.success = false;
            this.successMsg = "";
            const patch = {
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                email: this.user.email,
                username: this.user.username
            }
            try{
                const resp = await this.$apollo.mutate({
                mutation: UPDATE_USER,
                    variables: {
                        updatedUser: patch
                    }
                });
                if(resp && resp.data && resp.data.editUser){
                    this.user = resp.data.editUser;
                    this.userStore.setUser(resp.data.editUser);
                    this.success = true;
                    this.successMsg = "User details updated successfully";
                    this.notEditUser = true;
                }
            }catch(e:any){
                this.error = true;
                this.errorMsg = e.message.slice(14);
            }
            await this.getUserDetails();
        },
        async cancelUpdateUser(){
            this.notEditUser = false;
            await this.getUserDetails();
        },
        async updatePassword(){
            this.error = false;
            this.errorMsg = "";
            this.success = false;
            this.successMsg = "";
            if(this.oldPassword!==this.newPassword){
                try{
                    const resp = await this.$apollo.mutate({
                        mutation: UPDATE_PASSWORD,
                        variables: {
                            oldPassword: this.oldPassword,
                            newPassword: this.newPassword
                        }
                    });
                    this.success = true;
                    this.successMsg = resp.data.updatePassword.message;
                }catch(e:any){
                    this.error = true;
                    this.errorMsg = e.message.slice(14);
                }
            }
            this.oldPassword = "";
            this.newPassword = "";
            this.changePasswordForm = false;
        },
        async actionItemFunction(index: number){
            switch(index){
                case 0:
                    this.logout();
                    break;
                case 1:
                    await this.deleteAcct();
                    break;
                default:
                    break;
            }
        },
        logout(){
            this.userStore.reset();
            localStorage.removeItem('token');
            this.$router.replace({name:'Login'})
        },
        cancelUserAccountDelete(){
            this.showUserDeleteDialog = false;
            this.deleteConfirmationText = "";
            this.password = "";
        },
        async deleteAcct(){
            this.showUserDeleteDialog = true;
        },
        async deleteUserAccountConfirm(){
            this.error = false;
            this.errorMsg = "";
            this.success = false;
            this.successMsg = "";
            try{
                const resp = await this.$apollo.mutate({
                    mutation: DELETE_USER,
                    variables: {
                        password: this.password
                    }
                });
                if(resp && resp.data && resp.data.deleteUser){
                    this.logout();
                }
            }catch(e:any){
                this.error = true;
                this.errorMsg = e.message.slice(14);
                this.cancelUserAccountDelete();
            }
        }
    }
})
</script>