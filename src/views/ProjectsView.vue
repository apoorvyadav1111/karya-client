<template>
    <v-container>
        <v-dialog v-model="alert" max-width="300">
            <v-alert
            v-model="alert"
            dismissible
            type="info"
            elevation="2"

            color="purple darken-4"
        >
        {{ alertText }}
        </v-alert>
        </v-dialog>
        <v-app-bar app color="#121212" class="elevation-1 ma-0 pa-0">
            <v-toolbar-title class="text-overline text-h1" color="amber accent-3s" ><b>Your Projects</b></v-toolbar-title>
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
            <v-btn @click="showCreateProjectDialog" text color="amber accent-4">
                <b>
                Create
                <v-icon>mdi mdi-plus</v-icon>
                </b>
            </v-btn>
        </v-app-bar>
        <v-dialog v-model="createProjectDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 text-overline amber--text text-center">Create New Project</v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field
                            v-model="newProject.name"
                            label="Name"
                            required
                            color="amber accent-3s"
                        ></v-text-field>
                        <v-textarea
                            v-model="newProject.description"
                            label="Description"
                            cols="1"
                            color="amber accent-3s"
                        ></v-textarea>
                        <v-menu
                            v-model="start_date_menu_p1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="newProject.start_date"
                                color="amber accent-3s"
                                label="Start Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="newProject.start_date"
                            color="amber accent-3s"
                            @input="start_date_menu_p1 = false"
                            ></v-date-picker>
                        </v-menu>
                        <v-menu
                            v-model="due_date_menu_p1"
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
                            color="amber accent-3s"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            color="amber accent-3s"

                            v-model="newProject.due_date"
                            @input="due_date_menu_p1 = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="hideAllDialogs">Cancel</v-btn>
                    <v-btn color="amber darken-1" text @click="createProject">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="createTaskDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 text-overline amber--text text-center">Add Task</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field
                            v-model="newTask.name"
                            label="Name"
                            required
                            color="amber accent-3s"
                            ></v-text-field>
                        <v-textarea
                            v-model="newTask.description"
                            label="Description"
                            cols="1"
                            rows="1"
                            auto-grow
                            color="amber accent-3s"
                            >
                        </v-textarea>
                        <v-select
                            v-model="newTask.status"
                            :items="['BLOCKED', 'IN_PROGRESS', 'COMPLETED', 'PENDING']"
                            label="Status"
                            color="amber darken-1"
                        ></v-select>
                        <v-autocomplete 
                            v-model="newTask.assigned_to"
                            :items="team"
                            :item-text="item => `${item.member.username}`"
                            :item-value="item => `${item.member.id}`"
                            label="Assign To"
                            color="amber accent-3s"
                            ></v-autocomplete>
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
                            color="amber accent-3s"
                        ></v-text-field>
                        <v-text-field
                            v-model="newTask.hours_spent"
                            type="number"
                            label="Total Hours"
                            color="amber accent-3s"
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
                            v-model="start_date_menu_t1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="newTask.start_date"
                                color="amber accent-3s"
                                label="Start Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="newTask.start_date"
                            color="amber accent-3s"
                            @input="start_date_menu_t1 = false"
                            ></v-date-picker>
                        </v-menu>
                        <v-menu
                            v-model="due_date_menu_t1"
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
                            color="amber accent-3s"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            color="amber accent-3s"

                            v-model="newTask.due_date"
                            @input="due_date_menu_t1 = false"
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
        <v-dialog v-model="editTaskDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 text-overline amber--text text-center">Edit Task</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field
                            v-model="editableTask.name"
                            label="Name"
                            required
                            color="amber accent-3s"
                            ></v-text-field>
                        <v-textarea
                            v-model="editableTask.description"
                            label="Description"
                            cols="1"
                            rows="1"
                            auto-grow
                            color="amber accent-3s"
                            >
                        </v-textarea>
                        <v-select
                            v-model="editableTask.status"
                            :items="['BLOCKED', 'IN_PROGRESS', 'COMPLETED', 'PENDING']"
                            label="Status"
                            color="amber darken-1"
                        ></v-select>
                        <v-autocomplete 
                            v-model="editableTask.assigned_to"
                            :items="team"
                            :item-text="item => `${item.member.username}`"
                            :item-value="item => `${item.member.id}`"
                            label="Assign To"
                            color="amber accent-3s"
                            ></v-autocomplete>
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
                            color="amber accent-3s"
                        ></v-text-field>
                        <v-text-field
                            v-model="editableTask.hours_spent"
                            type="number"
                            label="Total Hours"
                            color="amber accent-3s"
                        ></v-text-field>
                        <v-radio-group
                            v-model="editableTask.type"
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
                            v-model="start_date_menu_t2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="editableTask.start_date"
                                color="amber accent-3s"
                                label="Start Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="editableTask.start_date"
                            color="amber accent-3s"
                            @input="start_date_menu_t2 = false"
                            ></v-date-picker>
                        </v-menu>
                        <v-menu
                            v-model="due_date_menu_t2"
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
                            color="amber accent-3s"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            color="amber accent-3s"

                            v-model="editableTask.due_date"
                            @input="due_date_menu_t2 = false"
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
        <v-dialog v-model="addMemberDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 text-overline amber--text text-center">Add Member</v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field
                            v-model="newMember.member"
                            label="Username"
                            required
                            color="amber accent-3s"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="hideAllDialogs">Cancel</v-btn>
                    <v-btn color="amber darken-1" text @click="addMember">Add</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="deleteTaskDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 text-overline amber--text text-center">Delete Task</v-card-title>
                <v-card-text>Are you sure you want to delete this task?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="amber accent-3s" @click="hideAllDialogs">
                        Cancel
                    </v-btn>
                    <v-btn text @click="deleteTaskConfirm">
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="removeMemberDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 text-overline amber--text text-center">Remove Member</v-card-title>
                <v-card-text>Are you sure you want to remove this member {{ removeMemberId }} from the team?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="amber accent-3s" @click="hideAllDialogs">
                        Cancel
                    </v-btn>
                    <v-btn text @click="removeMemberConfirm">
                        Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="finishProjectDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 text-overline amber--text text-center">Wow, Finished Everything</v-card-title>
                <v-card-text>Are you sure you want to mark this project as finish?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark color="amber accent-3s" @click="hideAllDialogs">
                        Cancel
                    </v-btn>
                    <v-btn text>
                        Coming Soon!
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="editProjectDialog" max-width="500px">
            <v-card>
                <v-card-title class="text-h5 text-overline amber--text text-center">Edit Project {{ projectInfo.name }}</v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field
                            v-model="editProjectItem.name"
                            label="Name"
                            required
                            color="amber accent-3s"
                        ></v-text-field>
                        <v-textarea
                            v-model="editProjectItem.description"
                            label="Description"
                            cols="1"
                            color="amber accent-3s"
                        ></v-textarea>
                        <v-menu
                            v-model="start_date_menu_p2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="editProjectItem.start_date"
                                color="amber accent-3s"
                                label="Start Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            v-model="editProjectItem.start_date"
                            color="amber accent-3s"
                            @input="start_date_menu_p2 = false"
                            ></v-date-picker>
                        </v-menu>
                        <v-menu
                            v-model="due_date_menu_p2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="editProjectItem.due_date"
                                label="Due Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            color="amber accent-3s"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            color="amber accent-3s"

                            v-model="editProjectItem.due_date"
                            @input="due_date_menu_p2 = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="hideAllDialogs">Cancel</v-btn>
                    <v-btn color="amber darken-1" text @click="editProject">Create</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>          
            <v-row v-if="project!=null">
                <v-col>
                 <v-row>
                    <v-col cols="3" class="pa-0 pr-1">
                        <v-card color="#121212" height="" outlined>
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
                                    <v-card-actions>
                                        <v-icon color="red" light>{{ task.type==='TASK'?'mdi mdi-calendar-check':'mdi mdi-bug'}}</v-icon>
                                        <v-spacer></v-spacer>
                                        <v-icon small color="red" @click="editTask(task)">
                                            mdi mdi-pencil
                                        </v-icon>
                                        <v-icon small  color="red" right @click="showDeleteTaskDialog(task)">
                                            mdi mdi-delete
                                        </v-icon>
                                    </v-card-actions>
                                </v-card>
                            </draggable>
                        </v-card>
                    </v-col>
                    <v-col cols="3" class="pa-0 pr-1">
                        <v-card  color="#121212" height="100%"  outlined>
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
                                    <v-card-actions>
                                        <v-icon color="indigo darken-4" light>{{ task.type==='TASK'?'mdi mdi-calendar-check':'mdi mdi-bug'}}</v-icon>
                                        <v-spacer></v-spacer>
                                        <v-icon small color="indigo darken-4" @click="editTask(task)">
                                            mdi mdi-pencil
                                        </v-icon>
                                        <v-icon small color="indigo darken-4" right @click="showDeleteTaskDialog(task)">
                                            mdi mdi-delete
                                        </v-icon>
                                    </v-card-actions>
                                </v-card>
                            </draggable>
                        </v-card>
                    </v-col>
                    <v-col cols="3" class="pa-0 pr-1">
                        <v-card  color="#121212" height="100%"  outlined>
                            <v-card-title class="text-overline orange--text">
                                <div style="font-size: medium;">
                                    In Progress
                                </div>
                                <v-icon dark large color="orange">
                                    mdi mdi-playlist-play
                                </v-icon>
                            </v-card-title>
                            <draggable class="draggable-list IN_PROGRESS" :move="moveItem"  :list="kanban.IN_PROGRESS" group="tasks">
                                <v-card class="ma-1 pa-1" height="auto" outlined dark color="amber accent-2" v-for="task in kanban.IN_PROGRESS" :key="task.id">
                                    <v-card-text class="black--text">{{ task.name }}</v-card-text>
                                    <v-card-actions>
                                        <v-icon color="black" light>{{ task.type==='TASK'?'mdi mdi-calendar-check':'mdi mdi-bug'}}</v-icon>
                                        <v-spacer></v-spacer>
                                        <v-icon small color="black" @click="editTask(task)">
                                            mdi mdi-pencil
                                        </v-icon>
                                        <v-icon small color="black" right @click="showDeleteTaskDialog(task)">
                                            mdi mdi-delete
                                        </v-icon>
                                    </v-card-actions>
                                </v-card>
                            </draggable>
                        </v-card>
                    </v-col>
                    <v-col cols="3" class="pa-0 pr-1">
                        <v-card color="#121212" height="100%"  outlined>
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
                                    color="#8bc34a"
                                v-for="task in kanban.COMPLETED" :key="task.id">
                                    <v-card-text class="black--text">{{ task.name }}</v-card-text>
                                    <v-card-actions>
                                        <v-icon color="black" light>{{ task.type==='TASK'?'mdi mdi-calendar-check':'mdi mdi-bug'}}</v-icon>
                                        <v-spacer></v-spacer>
                                        <v-icon small color="black" @click="editTask(task)">
                                            mdi mdi-pencil
                                        </v-icon>
                                        <v-icon right color="black" small @click="showDeleteTaskDialog(task)">
                                            mdi mdi-delete
                                        </v-icon>
                                    </v-card-actions>
                                </v-card>
                            </draggable>
                        </v-card>
                    </v-col>
                 </v-row>   
                </v-col>
                <v-col cols="3" class="pa-0">
                    <v-navigation-drawer
                        absolute
                        color="#121212"
                        permanent
                        right
                        width="300"
                        height="100%"
                        v-if="project!=''"
                        >
                        <v-card rounded>
                            <v-card-title justify-center class="text-overline">{{ projectInfo.name }}
                            <v-spacer></v-spacer>
                            <v-icon 
                                v-if="projectInfo.owner.id===userStore.getId" 
                                @click="showProjectEditDialog"
                                small>
                                mdi mdi-pencil
                            </v-icon>
                            </v-card-title>
                            <v-card-subtitle>Project Owner: {{ projectInfo.owner.username }}</v-card-subtitle>
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
                                <v-list-item-icon>
                                    <v-icon v-if="!member.active" color="amber" small>
                                        mdi mdi-clock
                                    </v-icon>
                                </v-list-item-icon>
                                <v-list-item-icon>
                                    <v-icon 
                                    v-if="userStore.getId===projectInfo.owner.id && projectInfo.owner.id!==member.member.id" 
                                    color="red"
                                    small
                                    @click="showRemoveMemberDialog(member._id)"
                                    >
                                        mdi mdi-close
                                    </v-icon>
                                </v-list-item-icon>
                                </v-list-item>
                            </v-list>
                            <v-divider></v-divider>
                            <v-spacer>
                            </v-spacer>
                        </v-card>
                        <template v-slot:append>
                                <div class="pa-2">
                                <v-btn text block color="amber" @click="showFinishProjectDialog">Mark Project as Finished</v-btn>
                                </div>
                            </template>
                    </v-navigation-drawer>  
                </v-col>
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
    assigned_to{
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
`;

const GET_TEAM = gql`
query GetAllTeam($project: String!) {
  getAllTeam(project: $project) {
    _id
    member {
      id
      username
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
mutation AddMember($newMember: MemberInput!) {
  addMember(newMember: $newMember) {
    _id
    member {
      username
    }
    active
    project {
      name
    }
  }
}

`;

const DELETE_TASK = gql`
    mutation DeleteTask($deleteTaskId: ID!) {
        deleteTask(id: $deleteTaskId)
    }
`

const UPDATE_PROJECT = gql`
mutation UpdateProject($updateProjectId: ID!, $updatedProject: ProjectInput!) {
  updateProject(id: $updateProjectId, updatedProject: $updatedProject) {
    id
    name
    description
    start_date
    end_date
    due_date
    owner {
      id
      username
    }
  }
}
`;

const REMOVE_MEMBER = gql`
mutation RemoveMember($removeMemberId: ID!) {
  removeMember(id: $removeMemberId)
}
`

export default Vue.extend({
    name: "ProjectsView",
    components: {
        draggable,
    },
    props: ['projectId'],
    data() {
        const userStore = useUserStore();
        const project = this.projectId;
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
            type: "TASK",
            link: undefined,
            hours_spent: 0,
            total_hours: 20,
            assigned_to: "",
            assigned_by: userStore.user.id,
        }
        const newMember = {
            member: "",
            active: false,
        }
        return {
            projects: [],
            project,
            team: [],
            projectInfo: {} as any,
            tasks,
            kanban:{
                "PENDING": [] as Task[],
                "IN_PROGRESS": [] as Task[],
                "BLOCKED": [] as Task[],
                "COMPLETED": [] as Task[],
            },
            alert:false,
            alertText: "This is a dummy text",
            createTaskDialog: false,
            createProjectDialog: false,
            addMemberDialog: false,
            start_date_menu_p1: false,
            due_date_menu_p1: false,
            start_date_menu_p2: false,
            due_date_menu_p2: false,
            start_date_menu_t1: false,
            due_date_menu_t1: false,
            start_date_menu_t2: false,
            due_date_menu_t2: false,
            newProject,
            due_date:null,
            newTask, 
            newMember,
            editTaskDialog: false,
            editableTask: {} as any,
            deleteTaskDialog: false,
            editProjectDialog: false,
            removeMemberDialog: false,
            deleteTaskId: "",
            userStore,
            editProjectItem:{} as any,
            removeMemberId: "",
            finishProjectDialog: false
        };
    },
    async created() {
        const { data } = await this.$apollo.query({
            query: GET_ALL_PROJECTS,
        });
        this.projects = data.getAllProjects;
        await this.getProjectBoard();
    },
    methods: {
        async getProjectBoard() {
            if(this.project === null || this.project==='') return;
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
                    project: this.project,
                },
            });
            this.team = data.getAllTeam.filter((member: any) => member.member);
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
            this.tasks = data.getTasks.map((task: any) => {
                if(task.assigned_by===null){
                    task.assigned_by = {
                        id: "",
                        username: "",
                    }
                }
                if(task.assigned_to===null){
                    task.assigned_to = {
                        id: "",
                        username: "",
                    }
                }
                return task;
            });

        },
        createKanban(){
            this.kanban = {
                "PENDING": [] as Task[],
                "IN_PROGRESS": [] as Task[],
                "BLOCKED": [] as Task[],
                "COMPLETED": [] as Task[],
            };
            for(const task of this.tasks){
                this.kanban[task.status].push(task);
            }
        },
        async moveItem(event: any) {

            const itemId = event.draggedContext.element.id;
            const newIndex  = event.relatedContext.index;
            const newStatus:Status = event.to.classList[1];
            const patch: {[key:string]: string} = {
                status: newStatus,
            }
            if(newStatus==='COMPLETED'){
                patch.end_date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0,10)
            }
            const resp = await this.updateTask(itemId, patch);
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
        async saveEditedTask(){
            const patch = {
                name: this.editableTask.name,
                description: this.editableTask.description,
                status: this.editableTask.status,
                hours_spent: Number(this.editableTask.hours_spent),
                total_hours: Number(this.editableTask.total_hours),
                start_date: this.editableTask.start_date, 
                type : this.editableTask.type,
                link: this.editableTask.link,
                end_date: this.editableTask.end_date,
                due_date: this.editableTask.due_date,
                assigned_to: this.editableTask.assigned_to
            }
            const itemId = this.editableTask.id;
            if(patch.link===itemId){
                this.alert = true;
                this.alertText = "Please link to a task different from the current task";
                this.hideAllDialogs();
                return;
            }
            const resp = await this.updateTask(itemId, patch);
            if (!resp.success){
                this.alert = true;
                this.alertText = "Failed to update task status, Please try again later or Edit the task manually";
            }
            this.hideAllDialogs();
            await this.getProjectBoard();
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
            this.resetVar();
            this.createProjectDialog = false;
            this.createTaskDialog = false;
            this.addMemberDialog = false;
            this.editTaskDialog = false;
            this.deleteTaskDialog = false;
            this.editProjectDialog = false;
            this.removeMemberDialog = false;
            this.finishProjectDialog = false;
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
                "project": this.project,
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
            this.getProjectBoard()
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
            if(resp.data.createTask){
                this.alert = true;
                this.alertText = "Task Created Successfully";
                this.tasks.push(resp.data.createTask as never);
                this.kanban[resp.data.createTask.status as Status].push(resp.data.createTask as never);
            }
            this.resetVar();
            this.createTaskDialog = false;
        },
        resetVar(){
            this.removeMemberId = "";
            this.editableTask = {} as any;
            this.editProjectItem = {} as any;
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
                assigned_to: "",
                assigned_by: this.userStore.user.id,
            }
        },
        editTask(item: Task){
            this.editableTask = {...item} as any;
            this.editableTask.assigned_to = this.editableTask.assigned_to.id;
            this.editableTask.link = this.editableTask.link?.id;
            this.editTaskDialog = true;
        },
        showDeleteTaskDialog(item: Task){
            this.deleteTaskId = item.id;
            this.deleteTaskDialog = true;
        },
        async deleteTaskConfirm(){
            await this.deleteTask();
            await this.getProjectBoard();
            this.hideAllDialogs();
        },
        async deleteTask(){
            const resp = await this.$apollo.mutate({
                mutation: DELETE_TASK,
                variables: {
                    deleteTaskId: this.deleteTaskId,
                },
            });
        },
        showProjectEditDialog(){
            this.editProjectDialog = true;
            this.editProjectItem = this.projectInfo;
        },
       async editProject(){
            const patch: any= {
                name: this.editProjectItem.name,
                description: this.editProjectItem.description,
                start_date: this.editProjectItem.start_date,
                due_date: this.editProjectItem.due_date,
            }
            await this.updateProject(this.projectInfo.id as string, patch);
        },
        async updateProject(id:string, patch:any){
            const resp = await this.$apollo.mutate({
                mutation: UPDATE_PROJECT,
                variables: {
                    updateProjectId: id,
                    updatedProject: patch,
                },
            });
            await this.getProjectBoard();
        },
        showRemoveMemberDialog(id:string){
            this.removeMemberId = id;
            this.removeMemberDialog = true;
        },
        async removeMemberConfirm(){
            const resp = await this.$apollo.mutate({
                mutation: REMOVE_MEMBER,
                variables: {
                    removeMemberId: this.removeMemberId,
                },
            });
            this.hideAllDialogs();
            await this.getProjectBoard();
        },
        showFinishProjectDialog(){
            this.finishProjectDialog = true;
        }
    },
})
</script>

<style>
/* create a class named completed with border color as green */

.completed{
    border-color: green;
}
.draggable-list {
    overflow-y: scroll;
  height: 80vh;
}
.draggable-list > div {
  cursor: pointer;
}


</style>