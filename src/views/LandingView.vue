<template>
    <v-layout>
           <v-navigation-drawer app  permanent dark color="indigo darken-4" flat>
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
          <v-list nav>
            <v-list-item v-on:click="showDashboardView" link>
              <v-list-item-icon>
                <v-icon>mdi-view-dashboard</v-icon>
              </v-list-item-icon>
    
              <v-list-item-content>
                <v-list-item-title > Dashboard </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-on:click="showProjectView" link>
              <v-list-item-icon>
                <v-icon>mdi mdi-projector-screen</v-icon>
              </v-list-item-icon>
    
              <v-list-item-content>
                <v-list-item-title > Projects </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-on:click="showTasksView" link>
              <v-list-item-icon>
                <v-icon>mdi mdi-calendar-check</v-icon>
              </v-list-item-icon>
    
              <v-list-item-content>
                <v-list-item-title > Tasks </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          <v-list-group class="pt-1 pb-2" no-action prepend-icon="mdi mdi-pin">
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
          <v-list-item v-on:click="showHelpView" link>
            <v-list-item-icon>
              <v-icon>mdi-check</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title > Comments </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item v-on:click="showNotificationsView" link>
            <v-list-item-icon>
              <v-icon>mdi mdi-bell-ring</v-icon>
            </v-list-item-icon>s
  
            <v-list-item-content>
              <v-list-item-title > Notifications </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link >
            <v-list-item-icon>
              <v-icon>mdi-help-box</v-icon>
            </v-list-item-icon>
            
            <v-list-item-content>
              <v-list-item-title> Help </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link v-on:click="showProfileView">
                <v-list-item-icon>
                  <v-icon>
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
                    <v-icon>mdi mdi-logout</v-icon>
                  </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="subtitle font-weight-light" v-on:click="logout">
                    Log Out
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          </v-list>
        </v-navigation-drawer>
      <v-main>
        <!-- <AddComment university="RGPV"/> -->
        <v-container v-if="currentView.dashboard">
          <DashboardView />
        </v-container>
        <v-container v-if="currentView.tasks">
          <TasksView />
        </v-container>
        <v-container v-if="currentView.projects">
          <ProjectsView />
        </v-container>
        <v-container v-if="currentView.courseSequence">
          <CourseSequenceView />
        </v-container>
        <v-container v-if="currentView.semesterLoad">
          <SemesterLoadView />
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
import { useUserStore } from "../store/user";
import Vue from "vue";


      export default Vue.extend({
        name:"LandingView",
        components:{
          DashboardView,
          ProjectsView,
          TasksView
        },
        data(){
          const userStore =  useUserStore();
          return {
            username:this.$route.params.username,
            currentView:{
              tasks:false,
              dashboard:false,
              projects:false,
              university: false,
              experts:false,
              courseSequence: false,
              programView:false,
              upload:false,
              semesterLoad:false,
              profile:false
            },
            uniKey:0,
            userStore
          }
        },
        methods: {
          resetAllViews(){
              this.currentView.tasks = false;
              this.currentView.dashboard = false;
              this.currentView.projects = false;
              this.currentView.university = false;
              this.currentView.experts = false;
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
          showExpertView()
          {
            this.resetAllViews(); 
            this.currentView.experts = true;
          },
          showHelpView(){
            this.resetAllViews();
            this.currentView.courseSequence = true;
          },
          showNotificationsView(){
            this.resetAllViews();
            this.currentView.semesterLoad = true;
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
          }
        }
      }) 
    </script>