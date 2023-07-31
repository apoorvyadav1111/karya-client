<template>
    <v-container class="ma-0 pa-0">
        <v-app-bar app color="#121212" class="elevation-1 ma-0 pa-0">
            <v-toolbar-title class="text-overline text-h1" ><b>Notifications</b></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-card class="ma-0 pa-2" color="#121212" height="100vh" >
            <v-list color="#121212">
                <v-card outlined v-for="(item, index) in invites" :key="index" class="mx-auto mb-3 rounded elevation-10"  title="Pending Invitations" >
                    <v-list-item>
                        <v-list-item-content>
                            You have been invited to collaborate on Project {{item.project.name}} by {{item.project.owner.firstName}}. Accept now to work together!
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn text color="green lighten-1"  @click="accept(item._id)">
                                Accept
                                <v-icon
                                right
                                color="green lighten-1"
                               
                                >
                                mdi mdi-check
                                </v-icon>
                            </v-btn>
                            <v-btn text color="red lighten-1" @click="reject(item._id)">
                                Decline
                                <v-icon
                                right
                                color="red lighten-1"
                                >
                                mdi mdi-close
                                </v-icon>
                                </v-btn>
                    </v-list-item-action>
                    </v-list-item>

                </v-card> 
            </v-list>
        </v-card>
    </v-container>

</template>
<script lang="ts">

import gql from 'graphql-tag';
import Vue from 'vue';



const GET_INVITES = gql`
query GetAllInvites {
  getAllInvites {
    _id
    project {
      owner {
        firstName
        username
      }
      name
    }
  }
}
`

const MUTATE_ACCEPT_INVITE = gql`
mutation AcceptInvite($acceptInviteId: ID!) {
  acceptInvite(id: $acceptInviteId){
    active
  }
}
`
const MUTATE_REJECT_INVITE = gql`
mutation RejectInvite($rejectInviteId: ID!) {
  rejectInvite(id: $rejectInviteId)
}
`

export default Vue.extend({
    name: "NotificationView",
    data(){

        return {
            invites: []
        }
    },
    async mounted(){
        await this.generateView()
    },
    methods:{
        async generateView(){
            await this.getInvites();
        },
        async getInvites(){
            const {data} = await this.$apollo.query({
                query: GET_INVITES
            })
            this.invites = data.getAllInvites
        },
        async accept(id: string){
            console.log(id);
            const resp = await this.$apollo.mutate({
                mutation: MUTATE_ACCEPT_INVITE,
                variables: {
                    acceptInviteId: id
                }
            })
            console.log(resp);
            await this.generateView();
        },
        async reject(id:string){
            console.log(id);
            const resp = await this.$apollo.mutate({
                mutation: MUTATE_REJECT_INVITE,
                variables: {
                    rejectInviteId: id
                }
            })
            console.log(resp);
            await this.generateView();
        }

    }
})
</script>
<style lang="scss">

</style>