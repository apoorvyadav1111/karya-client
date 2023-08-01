<template>
      <v-container fluid>
        <v-app-bar app color="#121212" class="elevation-1 ma-0 pa-0">
            <v-toolbar-title class="text-overline text-h1" ><b>Quick Access Dashboard</b></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-row>
          <v-col cols="3" class="ma-0 pa-0">
            <v-card color="#121212">
              <v-card-title>
                Your Projects
              </v-card-title>
              <v-divider></v-divider>
              <v-list color="#121212">
                <v-list-item v-for="project in projects" :key="project.id">
                  <v-list-item-content @click="showProjectDetails(project.id)">
                    {{ project.name }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="9" class="ma-0 pa-0 pl-2">
            <v-card color="#121212">
              <v-card-title>
                Analytics
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <Pie
                v-if="showChart"
                  :options="options"
                  :data="pieChartData"
                  :chart-id="chartId"
                  dataset-id-key="label"
                  width="200"
                  height="200"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>
<script lang="ts">

import { useUserStore } from '@/store/user'
import Vue from 'vue';
import gql from 'graphql-tag';
import { Task } from '@/interfaces/task';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const GET_ALL_PROJECTS = gql`
        query Project {
            getAllProjects {
                description
                due_date
                end_date
                id
                name
                owner {
                    id
                    username
                }
                start_date
            }
        }
`;

const GET_TASKS = gql`
    query GetAllTask {
        getAllTask {
            name
            id
            description
            status
            due_date
            start_date
            hours_spent
            total_hours
            start_date
            link{
                name
            }
            assigned_by {
                username
                id
            }
            assigned_to {
                username
                id
            }
            project {
                id
                name
            }
            section {
                id
                name
            }
            type
            link{
                id
                name
            }
        }
    }
`;

export default Vue.extend({
  name:'DashboardView',
  components: {
    Pie
  },
  data(){
    const userStore = useUserStore();
    const tasks: Task[] = [] as Task[];
    const pieData = {
                "PENDING": 0,
                "IN_PROGRESS": 0,
                "BLOCKED":0,
                "COMPLETED": 0,
            }
    const pieChartData = {
        labels:["PENDING", "IN_PROGRESS", "BLOCKED", "COMPLETED"],
        datasets:[{
          backgroundColor: ['#283593', '#FF8F00', '#C62828', '#689F38'],
          data: [pieData.PENDING, pieData.IN_PROGRESS, pieData.BLOCKED, pieData.COMPLETED]
        }]
      }
    return {
      userStore,
      projects: [],
      tasks: tasks,
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      pieChartData,
      pieData,
      chartId:  'pie-chart',
      showChart: false
    }
  },
  async mounted() {
    const { data } = await this.$apollo.query({
      query: GET_ALL_PROJECTS
    });
    this.projects = data.getAllProjects;
    this.generateTaskPieChart();
  },
  methods: {
    showProjectDetails(id: string) {
      this.$emit('showProjectDetails', id);
    },
    async generateTaskPieChart(){
            let { data } = await this.$apollo.query({
                query: GET_TASKS,
            });
            this.tasks = data.getAllTask;
            this.createPieData();
            this.showChart = true;
    },
    createPieData(){
            this.pieData = {
                "PENDING": 0,
                "IN_PROGRESS": 0,
                "BLOCKED": 0,
                "COMPLETED": 0,
            };
            for(const task of this.tasks){
                this.pieData[task.status]++;
            }
            this.pieChartData.datasets[0].data = Object.values(this.pieData);
        },
  }
})
</script>