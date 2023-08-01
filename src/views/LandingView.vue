<template>
    <v-layout>
           <v-navigation-drawer app  permanent dark  color="#121212" flat>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img
                    src="../../public/logo/android-chrome-192x192.png"
                    alt="John"
                  >
                </v-list-item-avatar>
                <v-list-item-title class="text-h1 text-overline">
                   Karya 
                </v-list-item-title>
              </v-list-item>
            </v-list>
          <v-divider></v-divider>
          <v-list  nav>
            <v-list-item v-on:click="showDashboardView" link>
              <v-list-item-icon>
                <v-icon color="amber accent-4" dark>mdi-view-dashboard</v-icon>
              </v-list-item-icon>
    
              <v-list-item-content>
                <v-list-item-title > Dashboard </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-on:click="showProjectView" link>
              <v-list-item-icon>
                <v-icon color="amber accent-4" dark>mdi mdi-projector-screen</v-icon>
              </v-list-item-icon>
    
              <v-list-item-content>
                <v-list-item-title > Projects </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-on:click="showTasksView" link>
              <v-list-item-icon>
                <v-icon color="amber accent-4" dark>mdi mdi-calendar-check</v-icon>
              </v-list-item-icon>
    
              <v-list-item-content>
                <v-list-item-title > Tasks </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          <v-list-group class="pt-1 pb-2" no-action  dark prepend-icon="mdi mdi-pin">
            <v-icon slot="prependIcon"  color="amber accent-4">mdi mdi-pin</v-icon>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Pinned Items</v-list-item-title>
              </v-list-item-content>
            </template>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    TBA
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    TBA
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    TBA
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    TBA
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item  link>
                <v-list-item-content>
                  <v-list-item-title>
                    TBA
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          </v-list-group>
          <v-divider></v-divider>
          <v-list-item v-on:click="showNotificationsView" link>
            <v-list-item-icon>
              <v-icon color="amber accent-4" dark>mdi mdi-bell-ring</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title > Notifications </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link @click="showHelpView">
            <v-list-item-icon>
              <v-icon color="amber accent-4" dark>mdi-help-box</v-icon>
            </v-list-item-icon>
            
            <v-list-item-content>
              <v-list-item-title> Help </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link v-on:click="showProfileView">
                <v-list-item-icon>
                  <v-icon color="amber accent-4" dark>
                    mdi-account-circle
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="subtitle">
                    {{ userStore.getUser }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
                    <v-icon color="amber accent-4" dark>mdi mdi-logout</v-icon>
                  </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-on:click="logout">
                    Log Out
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          </v-list>
        </v-navigation-drawer>
      <v-main>
        <!-- <AddComment university="RGPV"/> -->
        <v-container v-if="currentView.dashboard">
          <DashboardView @showProjectDetails="showProjectDashboard"/>
        </v-container>
        <v-container v-if="currentView.tasks">
          <TasksView />
        </v-container>
        <v-container v-if="currentView.projects">
          <ProjectsView :projectId="project" :key="projectKey"/>
        </v-container>
        <v-container v-if="currentView.notifications">
          <NotificationView />
        </v-container>
        <v-container v-if="currentView.help">
          <HelpView />
        </v-container>
        <v-container v-if="currentView.upload">
          <UploadView />
        </v-container>
        <v-container v-if="currentView.profile">
          <ProfileView />
        </v-container>
      </v-main>
    </v-layout>
</template>
    
<script lang="ts">
import DashboardView from "../views/DashboardView.vue"
import TasksView from "./TasksView.vue";
import ProjectsView from "./ProjectsView.vue";
import NotificationView from "./NotificationView.vue";
import HelpView from "./HelpView.vue";
import ProfileView from "./ProfileView.vue";
import { useUserStore } from "../store/user";
import Vue from "vue";


      export default Vue.extend({
        name:"LandingView",
        components:{
          DashboardView,
          ProjectsView,
          TasksView,
          NotificationView,
          HelpView,
          ProfileView
        },
        data(){
          const userStore =  useUserStore();
          return {
            username:this.$route.params.username,
            currentView:{
              tasks:false,
              dashboard:false,
              projects:false,
              notifications: false,
              help:false,
              courseSequence: false,
              programView:false,
              upload:false,
              semesterLoad:false,
              profile:false
            },
            projectKey:0,
            userStore,
            project:""
          }
        },
        methods: {
          resetAllViews(){
              this.currentView.tasks = false;
              this.currentView.dashboard = false;
              this.currentView.projects = false;
              this.currentView.notifications = false;
              this.currentView.help = false;
              this.currentView.courseSequence = false;
              this.currentView.programView = false;
              this.currentView.upload=false
              this.currentView.semesterLoad = false;
              this.currentView.profile = false;
          },
          logout() {
            this.userStore.reset();
            localStorage.removeItem('token');
            this.$router.push("/");
          },
          showTasksView()
          {
            this.resetAllViews(); 
            this.currentView.tasks = true;
          },
          showDashboardView()
          {
            this.resetAllViews(); 
            this.currentView.dashboard = true;
          },
          showProjectView()
          {
            this.resetAllViews(); 
            this.currentView.projects = true;
          },
          showHelpView()
          {
            this.resetAllViews(); 
            this.currentView.help = true;
          },
          showNotificationsView(){
            this.resetAllViews();
            this.currentView.notifications = true;
          },
          showProgramView(){
            this.resetAllViews();
            this.currentView.programView = true;
          },
          showUploadView(){
            this.resetAllViews();
            this.currentView.upload = true;
          },showProfileView(){
            this.resetAllViews();
            this.currentView.profile = true;
          },
          showProjectDashboard(id:string){
            this.project = id;
            this.projectKey++;
            this.showProjectView(); 
          }
        }
      }) 
    </script>