<template>
    <v-container>
    <v-app-bar app color="white" class="elevation-1 ma-0 pa-0">
        <v-toolbar-title class="text-overline text-h1" color="indigo darken-4" ><b>Your Tasks</b></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text color="indigo darken-4">
            <b>
            Create
            <v-icon>mdi mdi-plus</v-icon>
            </b>
        </v-btn>
    </v-app-bar>
        <v-row>
            <v-col class="pa-0 ma-0">
                <v-card >
                    <v-toolbar class="elevation-0 justify-center"                         
                    color="pink lighten-2"
                        dark>
                    <template>
                        <v-tabs
                        v-model="tabs"
                        align-with-title
                        >
                        <v-tab href="#zero">
                            <b>Open Items</b>
                            <v-icon small right>mdi mdi-chart-areaspline-variant</v-icon>
                        </v-tab>
                        <v-tab href="#one">
                            <b>Owned By Me</b>
                            <v-icon small right>mdi mdi-table</v-icon>
                        </v-tab>
                        <v-tab href="#two">
                            TBA
                            <v-icon small right>mdi mdi-chart-bell-curve</v-icon>
                        </v-tab>
                        <v-tabs-slider color="white"></v-tabs-slider>
                        </v-tabs>
                    </template>
                    </v-toolbar>
                    <v-tabs-items v-model="tabs">
                    <v-tab-item key="zero" value="zero">
                            <v-slide-group
                            class="pa-4"
                            active-class="success"
                            show-arrows
                            >
                            <v-slide-item
                                v-for="task in activeTasks"
                                :key="task.id"
                            >
                                <v-card
                                color="indigo lighten-5"
                                class="ma-1 pa-2"
                                height="300"
                                width="300"
                                hover
                                outlined
                                >
                                <v-card-text class="text-overline indigo--text" v-text="task.name"></v-card-text>
                                <v-card-text v-text="task.description.slice(0,100)"></v-card-text>
                                <v-container>
                                <v-row>
                                        <v-col>
                                            <v-progress-linear
                                                :value="task.hours_spent / task.total_hours * 100"
                                                color="amber darken-2"
                                                height="8"
                                                rounded
                                                >
                                                </v-progress-linear>
                                        </v-col>
                                    </v-row>
                                    <v-row class="ma-0 pa-0">
                                        <v-col class="ma-0 pa-0">
                                            <v-chip v-if="task.project" small> {{task.project.name}} </v-chip>
                                        </v-col>
                                        <v-col class="ma-0 pa-0">
                                            <v-chip  v-if="task.section" small> {{task.section.name}} </v-chip>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-chip-group>
                                                <v-chip color="amber darken-1" label dark small>{{task.status}}</v-chip> 
                                                <v-chip color="green lighten-1" label dark small>{{ task.type || 'TASK' }}</v-chip>
                                                <v-chip color="red darken-4" label dark small> {{task.due_date}} </v-chip>
                                            </v-chip-group>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                </v-card>
                            </v-slide-item>
                            </v-slide-group>                        
                    </v-tab-item>
                    <v-tab-item key="one" value="one">
                        <v-slide-group
                            v-if="ownedTasks.length > 0"
                            class="pa-4"
                            active-class="success"
                            show-arrows
                            >
                            <v-slide-item
                                v-for="task in ownedTasks"
                                :key="task.id"
                            >
                                <v-card
                                color="indigo lighten-5"
                                class="ma-1 pa-2 elevation-2"
                                height="300"
                                width="300"
                                >
                                <v-card-text class="text-overline indigo--text" v-text="task.name"></v-card-text>
                                <v-card-text v-text="task.description"></v-card-text>
                                <v-container>
                                <v-row>
                                        <v-col>
                                            <v-progress-linear
                                                :value="task.hours_spent / task.total_hours * 100"
                                                color="amber darken-2"
                                                height="8"
                                                rounded
                                                >
                                                </v-progress-linear>
                                        </v-col>
                                    </v-row>
                                    <v-row class="ma-0 pa-0">
                                        <v-col class="ma-0 pa-0">
                                            <v-chip v-if="task.project" small> {{task.project.name}} </v-chip>
                                        </v-col>
                                        <v-col class="ma-0 pa-0">
                                            <v-chip  v-if="task.section" small> {{task.section.name}} </v-chip>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                               <v-chip color="indigo lighten-1" dark small>{{task.assigned_by.username}}</v-chip> 
                                        </v-col>
                                        <v-col>
                                            <v-chip color="pink lighten-1" dark small>TASK</v-chip>
                                        </v-col>
                                        <v-col>
                                            <v-chip color="red" dark small> {{task.due_date}} </v-chip>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                </v-card>
                            </v-slide-item>
                        </v-slide-group> 
                        <v-card justify-center>
                            <v-card-title justify-center>
                                Oops you don't have any tasks assigned by you.
                                <v-icon>mdi-emoticon-sad-outline</v-icon>
                            </v-card-title>
                        </v-card> 
                    </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="pl-0 pr-0 ml-0 mr-0">
            <v-data-table class="elevation-2"
                :headers="headers"
                :items="activeTasks"
                :expanded.sync="expanded"
                :single-expand="singleExpand"
                show-expand
                :search="search"
                :footer-props="{
                    showFirstLastPage: true,
                    firstIcon: 'mdi-arrow-collapse-left',
                    lastIcon: 'mdi-arrow-collapse-right',
                    prevIcon: 'mdi-minus',
                    nextIcon: 'mdi-plus'
                }"
            >
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title class="text-overline pink--text">All Items</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-toolbar>
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <v-card-text class="overline">Description: {{ item.description }}</v-card-text>
                            <v-card-text class="overline">Project: {{ item.project }}</v-card-text>
                            <v-card-text class="overline">Section: {{ item.section }}</v-card-text>
                            <v-card-text class="overline">Assignee: {{ item.assigned_by.name }}</v-card-text>
                            <v-card-text>{{ item.note }}</v-card-text>  
                        </td>
                    </template>
            </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts">
import { useUserStore } from "@/store/user";
import gql from "graphql-tag";
import Vue from "vue";

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
        }
    }
`;

const GET_OWNED_TASKS = gql`
    query GetAllTask {
        getAllOwnedTask(assigned_by: $assigned_by) {
            name
            id
            status
            description
            due_date
            start_date
            hours_spent
            total_hours
            start_date
            link {
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
        }
    }
`;

export default Vue.extend({
    name:"TasksView",
    data(){
        const userStore = useUserStore();
        const headers= [
            {
            text: 'Title',
            align: 'start',
            sortable: false,
            value: 'name',
            },
            { text: 'Status', value: 'status' },
            { text: 'Effort', value: 'hours_spent' },
            { text: 'Allocated', value: 'total_hours'},
            { text: 'Start Date', value: 'start_date' },
            { text: 'Due Date', value: 'due_date'},
            { text: 'Linked', value: 'link'},
            { text: 'Quick Actions', value: 'quick_actions', sortable: false , align:'center'},
            { text: 'Actions', value: 'actions', sortable: false , align:'center'},
            { text: '', value: 'data-table-expand' },
        ]
        return {
            userStore,
            singleExpand:true,
            expanded:[],
            activeTasks: [],
            ownedTasks: [],
            tabs: null,
            search:"",
            headers
        }
    },
    async created(){
        let { data } = await this.$apollo.query({
            query: GET_TASKS,
        });
        this.activeTasks = data.getAllTask;

        let { data:data1 } = await this.$apollo.query({
            query: GET_OWNED_TASKS,
            variables: {
                assigned_to: this.userStore.user.id,
            }
        });
        this.ownedTasks = data1.getAllOwnedTask;
    },
    methods: {
        // create a method to show the create task view
        showCreateTaskView(){
            return
        }
    },
})
</script>