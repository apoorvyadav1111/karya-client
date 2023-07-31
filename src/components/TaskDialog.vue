<template>
    <v-card>
        <v-card-title class="text-h5 text-overline indigo--text text-center">Edit Task</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    v-model="task.name"
                    label="Name"
                    required
                    color="indigo darken-4"
                    ></v-text-field>
                <v-textarea
                    v-model="task.description"
                    label="Description"
                    cols="1"
                    rows="1"
                    auto-grow
                    color="indigo darken-4"
                    >
                </v-textarea>
                <v-autocomplete 
                    v-model="task.assigned_to"
                    :items="team"
                    :item-text="item => `${item.member.username}`"
                    :item-value="item => `${item.member.id}`"
                    label="Assign To"
                    color="indigo darken-4"
                    ></v-autocomplete>
                <v-text-field
                    v-model="task.total_hours"
                    type="number"
                    label="Total Hours"
                    required
                    color="indigo darken-4"
                ></v-text-field>
                <v-text-field
                    v-model="task.hours_spent"
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
                        v-model="task.start_date"
                        color="indigo darken-4"
                        label="Start Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker
                    v-model="task.start_date"
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
                        v-model="task.due_date"
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

                    v-model="task.due_date"
                    @input="start_date_menu = false"
                    ></v-date-picker>
                </v-menu>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="indigo darken-1" text @click="updateTask">Add</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts">
import Vue from "vue";
    export default Vue.extend({
        name:"TaskDialog",
        props:{
            task:{
                type:Object,
                required:true
            },
            team:{
                type:Array,
                required:true
            }
        },
        data(){
            return {
                task:this.task,
                start_date_menu: false,
                due_date_menu: false,
            }
        },
        methods:{
            closeDialog(){
                this.$emit("closeDialog");
            },
            async updateTask(){
                return
            }
        }
    })
</script>