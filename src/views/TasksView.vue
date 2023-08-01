<template>
    <v-container>
    <v-app-bar app color="#121212" class="elevation-1 ma-0 pa-0">
        <v-toolbar-title class="text-overline text-h1" color="amber accent-4" ><b>Your Tasks</b></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text @click="showCreateProjectDialog" color="amber accent-4">
            Create
            <v-icon>mdi mdi-plus</v-icon>
        </v-btn>
    </v-app-bar>
    <v-dialog v-model="createTaskDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 text-overline amber--text text-center">Add Task</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field
                            v-model="newTask.name"
                            label="Name"
                            required
                            color="amber darken-1"
                            ></v-text-field>
                        <v-textarea
                            v-model="newTask.description"
                            label="Description"
                            cols="1"
                            rows="1"
                            auto-grow
                            color="amber darken-1"
                            >
                        </v-textarea>
                        <v-select
                            v-model="newTask.status"
                            :items="['BLOCKED', 'IN_PROGRESS', 'COMPLETED', 'PENDING']"
                            label="Status"
                            color="amber darken-1"
                        ></v-select>
                        <v-autocomplete 
                            v-model="newTask.link"
                            :items="tasks"
                            :item-text="item => `${item.name}`"
                            :item-value="item => `${item.id}`"
                            label="Link To"
                            color="amber accent-3s"
                        ></v-autocomplete>
                        <v-text-field
                            v-model="newTask.total_hours"
                            type="number"
                            label="Total Hours"
                            required
                            color="amber darken-1"
                        ></v-text-field>
                        <v-text-field
                            v-model="newTask.hours_spent"
                            type="number"
                            label="Hours Spent"
                            color="amber darken-1"
                        ></v-text-field>
                        <v-radio-group
                            v-model="newTask.type"
                            column
                            >
                            <v-radio
                                label="Task"
                                value="TASK"
                            ></v-radio>
                            <v-radio
                                label="Issue"
                                value="ISSUE"
                            ></v-radio>
                            </v-radio-group>
                        <v-menu
                            v-model="start_date_menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="newTask.start_date"
                                color="amber darken-1"
                                label="Start Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="newTask.start_date"
                            color="amber darken-1"
                            @input="start_date_menu = false"
                            ></v-date-picker>
                        </v-menu>
                        <v-menu
                            v-model="due_date_menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="newTask.due_date"
                                label="Due Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            color="amber darken-1"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            color="amber darken-1"

                            v-model="newTask.due_date"
                            @input="start_date_menu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="hideAllDialogs">Cancel</v-btn>
                    <v-btn color="amber darken-1" text @click="addNewTask">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    <v-dialog v-model="deleteTaskDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 text-overline amber--text text-center">Delete Task</v-card-title>
                <v-card-text>Are you sure you want to delete this task?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="amber darken-1" @click="hideAllDialogs">
                        Cancel
                    </v-btn>
                    <v-btn text @click="deleteTaskConfirm">
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
    <v-dialog v-model="editTaskDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 text-overline amber--text text-center">Edit Task</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field
                            v-model="editableTask.name"
                            label="Name"
                            required
                            color="amber darken-1"
                            ></v-text-field>
                        <v-textarea
                            v-model="editableTask.description"
                            label="Description"
                            cols="1"
                            rows="1"
                            auto-grow
                            color="amber darken-1"
                            >
                        </v-textarea>
                        <v-select
                            v-model="editableTask.status"
                            :items="['BLOCKED', 'IN_PROGRESS', 'COMPLETED', 'PENDING']"
                            label="Status"
                            color="amber darken-1"
                        ></v-select>
                        <v-autocomplete 
                            v-model="editableTask.link"
                            :items="tasks"
                            :item-text="item => `${item.name}`"
                            :item-value="item => `${item.id}`"
                            label="Link To"
                            color="amber accent-3s"
                        ></v-autocomplete>
                        <v-text-field
                            v-model="editableTask.total_hours"
                            type="number"
                            label="Total Hours"
                            required
                            color="amber darken-1"
                        ></v-text-field>
                        <v-text-field
                            v-model="editableTask.hours_spent"
                            type="number"
                            label="Hours Spent"
                            color="amber darken-1"
                        ></v-text-field>
                        <v-radio-group
                            v-model="editableTask.type"
                            row
                            >
                            <v-radio
                                label="Task"
                                value="TASK"
                            ></v-radio>
                            <v-radio
                                label="Issue"
                                value="ISSUE"
                            ></v-radio>
                            </v-radio-group>
                        <v-menu
                            v-model="start_date_menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="editableTask.start_date"
                                color="amber darken-1"
                                label="Start Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="editableTask.start_date"
                            color="amber darken-1"
                            @input="start_date_menu = false"
                            ></v-date-picker>
                        </v-menu>
                        <v-menu
                            v-model="due_date_menu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="editableTask.due_date"
                                label="Due Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            color="amber darken-1"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            color="amber darken-1"

                            v-model="editableTask.due_date"
                            @input="start_date_menu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="hideAllDialogs">Cancel</v-btn>
                    <v-btn color="amber darken-1" text @click="saveEditedTask">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-row>
            <v-col class="pa-0 ma-0">
                <v-card>
                    <v-toolbar color="#121212" class="elevation-0 justify-center">
                    <template>
                        <v-tabs
                        v-model="tabs"
                        align-with-title
                        >
                        <v-tab href="#zero">
                            <b>Open Items</b>
                        </v-tab>
                        <v-tab href="#one">
                            <b>Owned By Me</b>
                        </v-tab>
                        <v-tab href="#two">
                            TBA
                            <v-icon small right>mdi mdi-chart-bell-curve</v-icon>
                        </v-tab>
                        <v-tabs-slider></v-tabs-slider>
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
                                class="ma-1 pa-2 elevation-2"
                                height="250"
                                width="250"
                                hover
                                outlined
                                style="border: 1px solid rgb(241, 178, 42);"
                                >
                                <v-card-text class="text-overline amber--text" v-text="task.name"></v-card-text>
                                <v-container>
                                    <div style="position: absolute;bottom: 50px;">
                                        <v-row>
                                        <v-col>
                                            <v-progress-linear
                                                :value="task.hours_spent / task.total_hours * 100"
                                                :color="task.hours_spent / task.total_hours * 100 > 75 ? 'green' : task.hours_spent / task.total_hours * 100 > 50 ? 'amber darken-2' : 'red'"
                                                height="8"
                                                rounded
                                                >
                                                </v-progress-linear>
                                        </v-col>
                                    </v-row>
                                        <v-row>
                                        <v-col>
                                            <v-chip-group column>
                                                <v-chip :color="task.status==='BLOCKED'?'red lighten-1':task.status==='PENDING'?'indigo accent-4':task.status==='IN_PROGRESS'?'amber accent-4':'green accent-4'" light small>{{task.status}}</v-chip> 
                                                <v-chip color="amber accent-4" light small> {{task.due_date}} </v-chip>
                                                <v-icon :color="task.type==='TASK'?'amber accent-4':'red'" light small>{{ task.type==='TASK'?'mdi mdi-calendar-check':'mdi mdi-bug'}}</v-icon>
                                        </v-chip-group>
                                        </v-col>
                                    </v-row>
                                    </div>
                                </v-container>
                                <div style="position: absolute; bottom: 10px;">
                                    <v-card-actions >
                                    <v-spacer></v-spacer>
                                        <v-icon small @click="editTask(task)">
                                            mdi mdi-pencil
                                        </v-icon>
                                        <v-icon small right @click="showDeleteTaskDialog(task)">
                                            mdi mdi-delete
                                        </v-icon>
                                    </v-card-actions>
                                </div>

                                </v-card>
                            </v-slide-item>
                            </v-slide-group>                        
                    </v-tab-item>
                    <v-tab-item key="one" value="one">
                        <v-slide-group
                            class="pa-4"
                            active-class="success"
                            show-arrows
                            >
                            <v-slide-item
                                v-for="task in ownedTasks"
                                :key="task.id"
                            >
                                <v-card
                                class="ma-1 pa-2 elevation-2"
                                height="250"
                                width="250"
                                hover
                                outlined
                                style="border: 1px solid rgb(241, 178, 42);"
                                >
                                <v-card-text class="text-overline amber--text" v-text="task.name"></v-card-text>
                                <v-container>
                                    <div style="position: absolute;bottom: 50px;">
                                        <v-row>
                                        <v-col>
                                            <v-progress-linear
                                                :value="task.hours_spent / task.total_hours * 100"
                                                :color="task.hours_spent / task.total_hours * 100 > 75 ? 'green' : task.hours_spent / task.total_hours * 100 > 50 ? 'amber darken-2' : 'red'"
                                                height="8"
                                                rounded
                                                >
                                                </v-progress-linear>
                                        </v-col>
                                    </v-row>
                                        <v-row>
                                        <v-col>
                                            <v-chip-group column>
                                                <v-chip :color="task.status==='BLOCKED'?'red lighten-1':task.status==='PENDING'?'indigo accent-4':task.status==='IN_PROGRESS'?'amber accent-4':'green accent-4'" light small>{{task.status}}</v-chip> 
                                                <v-chip color="amber accent-4" light small> {{task.due_date}} </v-chip>
                                                <v-icon :color="task.type==='TASK'?'amber accent-4':'red'" light small>{{ task.type==='TASK'?'mdi mdi-calendar-check':'mdi mdi-bug'}}</v-icon>
                                        </v-chip-group>
                                        </v-col>
                                    </v-row>
                                    </div>
                                </v-container>
                                <div style="position: absolute; bottom: 10px;">
                                    <v-card-actions >
                                    <v-spacer></v-spacer>
                                        <v-icon small @click="editTask(task)">
                                            mdi mdi-pencil
                                        </v-icon>
                                        <v-icon small right @click="showDeleteTaskDialog(task)">
                                            mdi mdi-delete
                                        </v-icon>
                                    </v-card-actions>
                                </div>

                                </v-card>
                            </v-slide-item>
                        </v-slide-group>    
                    </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="pl-0 pr-0 ml-0 mr-0">
            <v-data-table class="elevation-2"
                :headers="headers"
                :items="allTasks"
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
                    <v-toolbar color="#121212" flat>
                        <v-toolbar-title class="text-overline pink--text">All Items assigned to you</v-toolbar-title>
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
                    <template v-slot:[`item.link`]="{item}">
                        {{ item.link?.name }}
                    </template>
                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <v-card-text class="overline">Description: {{ item.description }}</v-card-text>
                            <v-card-text class="overline">Project: {{ item.project!==null?item.project.name:"" }}</v-card-text>
                            <v-card-text class="overline">Section: {{ item.section }}</v-card-text>
                            <v-card-text class="overline">Assignee: {{ item.assigned_by.username }}</v-card-text>
                        </td>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon
                            small
                            class="mr-2"
                            color="amber"
                            @click="editTask(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            small
                            color="red"
                            @click="showDeleteTaskDialog(item)"
                        >
                            mdi-delete
                        </v-icon>
                        </template>
            </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts">
import { Task, TaskInput } from "@/interfaces/task";
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
            type
            link{
                id
                name
            }
        }
    }
`;

const ADD_TASK = gql`
mutation CreateTask($newTask: TaskInput!) {
  createTask(newTask: $newTask) {
    id,
    name,
    description,
    total_hours,
    status,
    project{
        id
      name
    },
    section {
      name
    }
    assigned_by{
      username
    }
    assigned_to {
      username
    }
    type
    link{
        id
        name
    }
  }
}
`;

const UPDATE_TASK = gql`
mutation UpdateTask($updateTaskId: ID!, $taskPatch: TaskPatch!) {
  updateTask(id: $updateTaskId, taskPatch: $taskPatch) {
    task {
        id
        name
        description
        start_date
        end_date
        due_date
        status
        hours_spent
        total_hours
        assigned_by {
        username
        id
        }
        assigned_by {
        id
        username
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
    success
  }
}
`;

const DELETE_TASK = gql`
    mutation DeleteTask($deleteTaskId: ID!) {
        deleteTask(id: $deleteTaskId)
    }
`
const GET_OWNED_TASKS = gql`
query GetTasks($search: TaskSearch) {
  getTasks(search: $search) {
        id
        name
        description
        start_date
        end_date
        due_date
        status
        hours_spent
        total_hours
        assigned_by {
        username
        id
        }
        assigned_by {
        id
        username
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
`
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
            { text: 'link', value: 'link'},
            { text: 'Actions', value: 'actions', sortable: false , align:'center'},
            { text: '', value: 'data-table-expand' },
        ]
        const newTask: TaskInput = {
            name: "",
            description: "",
            start_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0,10),
            due_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0,10),
            status: "PENDING",
            type: "TASK",
            link: undefined,
            hours_spent: 0,
            total_hours: 20,
            assigned_to:userStore.user.id,
            assigned_by: userStore.user.id,
        }
        return {
            userStore,
            singleExpand:true,
            expanded:[],
            activeTasks: [],
            allTasks:[],
            ownedTasks: [],
            tasks: [],
            tabs: null,
            search:"",
            headers,
            editTaskDialog: false,
            editableTask: {} as any,
            deleteTaskDialog: false,
            deleteTaskId: "",
            start_date_menu: false,
            due_date_menu: false,
            newTask,
            createTaskDialog: false,
            alert: false,
            alertText: "",
        }
    },
    async mounted(){
        await this.generateTaskView();
    },
    methods: {
        // create a method to show the create task view
        async generateTaskView(){
            let { data } = await this.$apollo.query({
                query: GET_TASKS,
            });
            this.allTasks = data.getAllTask;
            this.activeTasks = this.allTasks.filter((task:any) => task.status !== "COMPLETED");
            let { data:data1 } = await this.$apollo.query({
                query: GET_OWNED_TASKS,
                variables: {
                    assigned_by: this.userStore.user.id,
                }
            });
            this.ownedTasks = data1.getTasks;
            this.tasks = this.activeTasks.concat(this.ownedTasks);
        },
        showCreateTaskView(){
            return
        },
        hideAllDialogs(){
            this.resetVar();
            this.editTaskDialog = false;
            this.deleteTaskDialog = false;
            this.createTaskDialog = false;
        },
        resetVar(){
            this.editableTask = {} as any;
            this.deleteTaskId = "";
            this.newTask = {
                name: "",
                description: "",
                start_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0,10),
                due_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0,10),
                status: "PENDING",
                type: "TASK",
                link: undefined,
                hours_spent: 0,
                total_hours: 20,
                assigned_to:this.userStore.user.id,
                assigned_by: this.userStore.user.id,
            }
        },
        editTask(item: Task){
            this.editableTask = {...item} as any;
            this.editableTask.link = this.editableTask.link?.id;
            this.editTaskDialog = true;
        },
        showDeleteTaskDialog(item: Task){
            this.deleteTaskId = item.id;
            this.deleteTaskDialog = true;
        },
        async deleteTaskConfirm(){
            await this.deleteTask();
            this.hideAllDialogs();
            await this.generateTaskView();
        },
        showCreateProjectDialog(){
            this.createTaskDialog = true;
        },
        async saveEditedTask(){
            const patch = {
                name: this.editableTask.name,
                description: this.editableTask.description,
                status: this.editableTask.status,
                hours_spent: Number(this.editableTask.hours_spent),
                total_hours: Number(this.editableTask.total_hours),
                start_date: this.editableTask.start_date, 
                end_date: this.editableTask.end_date,
                link: this.editableTask.link,
                type: this.editableTask.type,
                due_date: this.editableTask.due_date,
            }
            const itemId = this.editableTask.id;
            if(patch.link===itemId){
                this.alert = true;
                this.alertText = "Please link to a task different from the current task";
                this.hideAllDialogs();
                return;
            }
            const resp = await this.updateTask(itemId, patch);
            this.hideAllDialogs();
            await this.generateTaskView();
        },
        async updateTask(id: string, patch:any){
            const resp = await this.$apollo.mutate({
                mutation: UPDATE_TASK,
                variables: {
                    updateTaskId: id,
                    taskPatch: patch,
                },
            });
            return resp.data.updateTask;
        },
        async deleteTask(){
            const resp = await this.$apollo.mutate({
                mutation: DELETE_TASK,
                variables: {
                    deleteTaskId: this.deleteTaskId,
                },
            });
        },
        async addNewTask(){
            const newTask = {
                ...this.newTask,
            }
            newTask.hours_spent = Number(newTask.hours_spent);
            newTask.total_hours = Number(newTask.total_hours);
            const resp = await this.$apollo.mutate({
                mutation: ADD_TASK,
                variables: {
                    newTask: newTask
                },
            });
            this.resetVar();
            this.createTaskDialog = false;
            this.generateTaskView();
        },
    },
})
</script>
<style>
.taskcard{
    border: 1px solic;
    border-color: #FF8F00;
}
</style>