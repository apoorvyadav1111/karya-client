<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="3">
            <v-card>
              <v-card-title>
                Projects
              </v-card-title>
              <v-divider></v-divider>
              <v-list>
                <v-list-item v-for="project in projects" :key="project.id">
                  <v-list-item-content>
                    {{ project.name }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="9">
            <v-card>
              <v-card-title>
                Project Details
              </v-card-title>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="6">
                  <v-card>
                    <v-card-title>
                      Tasks
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list>
                      <v-list-item v-for="task in tasks" :key="task.id">
                        <v-list-item-content>
                          {{ task.name }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card>
                    <v-card-title>
                      Team Members
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list>
                      <v-list-item v-for="member in teamMembers" :key="member.id">
                        <v-list-item-content>
                          {{ member.name }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script lang="ts">
import { useUserStore } from '@/store/user'
import Vue from 'vue'
export default Vue.extend({
  name:'DashboardView',
  data(){
    const userStore = useUserStore();
    
    return {
      userStore,
      projects: [
        { id: 1, name: 'Project A' },
        { id: 2, name: 'Project B' },
        { id: 3, name: 'Project C' }
      ],
      tasks: [
        { id: 1, name: 'Task 1' },
        { id: 2, name: 'Task 2' },
        { id: 3, name: 'Task 3' }
      ],
      teamMembers: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Mike Johnson' }
      ]
    }
  }
})
</script>