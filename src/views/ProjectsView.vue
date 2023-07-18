<template>
    <v-container>
        <v-dialog>
            <v-alert
            v-model="alert"
            dismissible
            type="info"
            elevation="2"
            class="mt-4"
            outlined
            color="purple darken-4"
        >
        {{ alertText }}
        </v-alert>
        </v-dialog>

        <v-app-bar app color="white" class="elevation-1 ma-0 pa-0">
            <v-toolbar-title class="text-overline text-h1" color="indigo darken-4" ><b>Your Projects</b></v-toolbar-title>
            <v-spacer></v-spacer>
                <v-autocomplete
                class="mt-4"
                placeholder="Project"
                v-model="project"
                :items="projects"
                :item-text="item => `${item.name}`"
                :item-value="item => `${item.id}`"
                dense
                @blur="getProjectBoard"
            >
            </v-autocomplete>
            <v-btn @click="showCreateProjectDialog" text color="indigo darken-4">
                <b>
                Create
                <v-icon>mdi mdi-plus</v-icon>
                </b>
            </v-btn>
        </v-app-bar>
        <v-dialog v-model="createProjectDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 text-overline indigo--text text-center">Create New Project</v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field
                            v-model="newProject.name"
                            label="Name"
                            required
                            color="indigo darken-4"
                        ></v-text-field>
                        <v-textarea
                            v-model="newProject.description"
                            label="Description"
                            cols="1"
                            color="indigo darken-4"
                        ></v-textarea>
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
                                v-model="newProject.start_date"
                                color="indigo darken-4"
                                label="Start Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="newProject.start_date"
                            color="indigo darken-4"
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
                                v-model="newProject.due_date"
                                label="Due Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            color="indigo darken-4"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            color="indigo darken-4"

                            v-model="newProject.due_date"
                            @input="start_date_menu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="hideAllDialogs">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="createProject">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="createTaskDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 text-overline indigo--text text-center">Add Task</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field
                            v-model="newTask.name"
                            label="Name"
                            required
                            color="indigo darken-4"
                            ></v-text-field>
                        <v-textarea
                            v-model="newTask.description"
                            label="Description"
                            cols="1"
                            rows="1"
                            auto-grow
                            color="indigo darken-4"
                            >
                        </v-textarea>
                        <v-autocomplete 
                            v-model="newTask.assigned_to"
                            :items="team"
                            :item-text="item => `${item.member.username}`"
                            :item-value="item => `${item.member.id}`"
                            label="Assign To"
                            color="indigo darken-4"
                            ></v-autocomplete>
                        <v-text-field
                            v-model="newTask.total_hours"
                            type="number"
                            label="Total Hours"
                            required
                            color="indigo darken-4"
                        ></v-text-field>
                        <v-text-field
                            v-model="newTask.hours_spent"
                            type="number"
                            label="Total Hours"
                            color="indigo darken-4"
                        ></v-text-field>
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
                                color="indigo darken-4"
                                label="Start Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="newTask.start_date"
                            color="indigo darken-4"
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
                            color="indigo darken-4"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            color="indigo darken-4"

                            v-model="newTask.due_date"
                            @input="start_date_menu = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="hideAllDialogs">Cancel</v-btn>
                    <v-btn color="indigo darken-1" text @click="addNewTask">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="addMemberDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 text-overline indigo--text text-center">Add Member</v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field
                            v-model="newMember.member"
                            label="Username"
                            required
                            color="indigo darken-4"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="hideAllDialogs">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="addMember">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
            
            <v-row v-if="project!=null">
                <v-col>
                 <v-row>
                    <v-col cols="3" class="pa-0 pr-1">
                        <v-card height="600" outlined>
                            <v-card-title class="text-overline red--text">
                                <div style="font-size: medium;">
                                    Blocked
                                </div>
                                <v-icon right large dark color="red">
                                    mdi mdi-playlist-remove
                                </v-icon>
                            </v-card-title>
                            <draggable class="draggable-list BLOCKED" :move="moveItem" :list="kanban.BLOCKED" group="tasks">
                                <v-card class="ma-1 pa-1 " height="auto" outlined color="red lighten-5" v-for="task in kanban.BLOCKED" :key="task.id">
                                    <v-card-text class="red--text">{{ task.name }}</v-card-text>
                                </v-card>
                            </draggable>
                        </v-card>
                    </v-col>
                    <v-col cols="3" class="pa-0 pr-1">
                        <v-card height="600" outlined>
                            <v-card-title class="text-overline indigo--text">
                                <div style="font-size: medium;">
                                    Pending
                                </div>
                                <v-icon dark large color="indigo">
                                    mdi mdi-format-list-checks
                                </v-icon>
                            </v-card-title>
                            <draggable class="draggable-list PENDING" :move="moveItem" :list="kanban.PENDING" group="tasks">
                                <v-card class="ma-1 pa-1" height="auto" outlined color="indigo lighten-4" dark v-for="task in kanban.PENDING" :key="task.id">
                                    <v-card-text class="indigo--text">{{ task.name }}</v-card-text>
                                </v-card>
                            </draggable>
                        </v-card>
                    </v-col>
                    <v-col cols="3" class="pa-0 pr-1">
                        <v-card height="600" justify-center outlined>
                            <v-card-title class="text-overline orange--text">
                                <div style="font-size: medium;">
                                    In Progress
                                </div>
                                <v-icon dark large color="orange">
                                    mdi mdi-playlist-play
                                </v-icon>
                            </v-card-title>
                            <draggable class="draggable-list IN_PROGRESS" :move="moveItem"  :list="kanban.IN_PROGRESS" group="tasks">
                                <v-card class="ma-1 pa-1" height="auto" outlined color="amber lighten-3" v-for="task in kanban.IN_PROGRESS" :key="task.id">
                                    <v-card-text>{{ task.name }}</v-card-text>
                                </v-card>
                            </draggable>
                        </v-card>
                    </v-col>
                    <v-col cols="3" class="pa-0 pr-1">
                        <v-card height="600" outlined>
                            <v-card-title class="text-overline green--text">
                                <div style="font-size: medium;">
                                    Done
                                </div>

                                <v-icon dark large color="green">
                                    mdi mdi-playlist-check
                                </v-icon>
                            </v-card-title>
                            <draggable class="draggable-list COMPLETED" :move="moveItem"  :list="kanban.COMPLETED" group="tasks">
                                <v-card 
                                    class="ma-1 pa-1" 
                                    height="auto" 
                                    outlined 
                                    rounded
                                    hover
                                    color="light-green lighten-3"
                                v-for="task in kanban.COMPLETED" :key="task.id">
                                    <v-card-text>{{ task.name }}</v-card-text>
                                </v-card>
                            </draggable>
                        </v-card>
                    </v-col>
                 </v-row>   
                </v-col>
                <v-col cols="3" class="pa-0">
                    <v-navigation-drawer
                        absolute
                        permanent
                        right
                        width="300"
                        v-if="project!=''"
                        >
                        <v-card rounded>
                            <v-card-title justify-center class="text-overline">Details</v-card-title>
                            <v-card-text>
                                {{ projectInfo.description}}
                            </v-card-text>

                            <v-divider></v-divider>
                            <v-btn 
                                block text 
                                class="text-overline"
                                @click="showCreateTaskDialog"
                                >Create New Task 
                                <v-icon right>mdi mdi-plus</v-icon>
                            </v-btn>
                            <v-divider></v-divider>
                            <v-btn 
                                block text 
                                class="text-overline"
                                @click="showAddMemberDialog"
                                >Members
                                <v-icon right>mdi mdi-plus</v-icon>
                            </v-btn>
                            <v-list dense>
                                <v-list-item v-for="member in team" :key="member._id">
                                <v-list-item-content>
                                    {{ member.member.username }}
                                </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-navigation-drawer>  
                </v-col>
            </v-row>
            <v-row>
                <!-- <v-bottom-navigation
                color="teal"
                grow
                absolute
            >
                <v-btn>
                <span>Recents</span>

                <v-icon>mdi-history</v-icon>
                </v-btn>

                <v-btn>
                <span>Favorites</span>

                <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn>
                <span>Nearby</span>

                <v-icon>mdi-map-marker</v-icon>
                </v-btn>
            </v-bottom-navigation> -->
            </v-row>

    </v-container>
</template>
<script lang="ts">
import gql from 'graphql-tag';
import Vue from 'vue';
import draggable from 'vuedraggable';
import { Status, Task, TaskInput}  from '../interfaces/task';
import { ProjectInput } from '@/interfaces/project';
import { useUserStore } from '@/store/user';

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
query GetTask($search: TaskSearch) {
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
  }
}
`;

const GET_TEAM = gql`
query GetAllTeam($getAllTeamId: ID!) {
  getAllTeam(id: $getAllTeamId) {
    _id
    member {
      username
      id
    }
    active
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
    }
    success
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
  }
}
`;
const CREATE_PROJECT = gql`
mutation CreateProject($newProject: ProjectInput!) {
  createProject(newProject: $newProject) {
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
}`;

const ADD_MEMBER = gql`
mutation Mutation($newMember: MemberInput!) {
  addMember(newMember: $newMember) {
    _id
    active
    member {
      username
      id
    }
  }
}
`;

export default Vue.extend({
    name: "ProjectsView",
    components: {
        draggable,
    },
    data() {
        const userStore = useUserStore();
        const project = null;
        const tasks: Task[] = [] as Task[];
        const newProject: ProjectInput = {
            name:"",
            description:"",
            start_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0,10),
            due_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0,10),
        }
        const newTask: TaskInput = {
            name: "",
            description: "",
            start_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0,10),
            due_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0,10),
            status: "PENDING",
            hours_spent: 0,
            total_hours: 20,
            assigned_to: "",
            assigned_by: userStore.user.id,
        }
        const newMember = {
            member: "",
            active: true,
        }
        return {
            projects: [],
            project,
            team: [],
            projectInfo: {},
            tasks,
            kanban:{
                "PENDING": [] as Task[],
                "IN_PROGRESS": [] as Task[],
                "BLOCKED": [] as Task[],
                "COMPLETED": [] as Task[],
            },
            alert:true,
            alertText: "This is a dummy text",
            createTaskDialog: false,
            createProjectDialog: false,
            addMemberDialog: false,
            start_date_menu: false,
            due_date_menu: false,
            newProject,
            due_date:null,
            newTask, 
            newMember
        };
    },
    async mounted() {
        const { data } = await this.$apollo.query({
            query: GET_ALL_PROJECTS,
        });
        this.projects = data.getAllProjects;
    },
    methods: {
        async getProjectBoard() {
            if(this.project === null) return;
            for (const proj of this.projects) {
                if (proj["id"] === this.project) {
                    this.projectInfo = proj;
                    break;
                }
            }
            await this.getTeam();
            await this.getTasks();
            this.createKanban();
        },
        async getTeam() {
            const { data } = await this.$apollo.query({
                query: GET_TEAM,
                variables: {
                    getAllTeamId: this.project,
                },
            });
            this.team = data.getAllTeam;
            console.log(this.team);
        },
        async getTasks(){
            const { data } = await this.$apollo.query({
                query: GET_TASKS,
                variables: {
                    search:{
                        project: this.project,
                    }
                },
            });
            this.tasks = data.getTasks;
            console.log(this.tasks);
        },
        createKanban(){
            this.kanban = {
                "PENDING": [] as Task[],
                "IN_PROGRESS": [] as Task[],
                "BLOCKED": [] as Task[],
                "COMPLETED": [] as Task[],
            };
            for(const task of this.tasks){
                console.log(task);
                this.kanban[task.status].push(task);
            }
        },
        async moveItem(event: any) {
            console.log(event);
            const itemId = event.draggedContext.element.id;
            const newIndex  = event.relatedContext.index;
            const newStatus:Status = event.to.classList[1];
            console.log(itemId, newIndex, newStatus);
            const patch = {
                status: newStatus,
            }
            const resp = await this.updateTask(itemId, patch);
            console.log(resp);
            if (resp.success) {
                for(const task of this.kanban[newStatus]){
                    if(task.id === itemId){
                        task.status = newStatus;
                    }
                }
            }else{
                this.alert = true;
                this.alertText = "Failed to update task status, Please try again later or Edit the task manually";
            }
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
        showCreateProjectDialog(){
            this.createProjectDialog = true;
        },
        showCreateTaskDialog(){
            this.createTaskDialog = true;
        },
        showAddMemberDialog(){
            this.addMemberDialog = true;
        },
        hideAllDialogs(){
            this.createProjectDialog = false;
            this.createTaskDialog = false;
            this.addMemberDialog = false;
        },
        async createProject(){
            const resp = await this.$apollo.mutate({
                mutation: CREATE_PROJECT,
                variables: {
                    newProject: this.newProject,
                },
            });
            if(resp.data.createProject){
                this.alert = true;
                this.alertText = "Project Created Successfully";
                this.projects.push(resp.data.createProject as never);
            }
            this.createProjectDialog = false;
        },
        async addMember(){
            const newMember = {
                "_id": this.project,
                ...this.newMember,
            }
            

            const resp = await this.$apollo.mutate({
                mutation: ADD_MEMBER,
                variables: {
                    newMember: newMember
                },
            });
            if(resp.data.addMember){
                this.alert = true;
                this.alertText = "Member Added Successfully";
                this.team.push(resp.data.addMember as never);
            }
            this.addMemberDialog = false;
        },
        async addNewTask(){
            const newTask = {
                ...this.newTask,
                project: this.project,
            }
            newTask.hours_spent = Number(newTask.hours_spent);
            newTask.total_hours = Number(newTask.total_hours);
            const resp = await this.$apollo.mutate({
                mutation: ADD_TASK,
                variables: {
                    newTask: newTask
                },
            });
            console.log(resp.data.createTask);
            if(resp.data.createTask){
                this.alert = true;
                this.alertText = "Task Created Successfully";
                this.tasks.push(resp.data.createTask as never);
                this.kanban[resp.data.createTask.status as Status].push(resp.data.createTask as never);
            }
            this.createTaskDialog = false;
        },
    },
})
</script>

<style>
/* create a class named completed with border color as green */

.completed{
    border-color: green;
}
.draggable-list {
  min-height: 10vh;
}
.draggable-list > div {
  cursor: pointer;
}
</style>