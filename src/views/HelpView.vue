<template>
    <v-container class="ma-0 pa-0" fluid fill-height>
        <v-app-bar app color="#121212" class="elevation-1 ma-0 pa-0">
            <v-toolbar-title class="text-overline text-h1" ><b>Frequenty Asked Questions</b></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-row class="ma-0 pa-0">
            <v-col class="ma-0 pa-0">
                <v-card class="ma-0 pa-0" color="#121212">
                    <v-expansion-panels>
                        <v-expansion-panel
                        v-for="(item,i) in questions"
                        :key="i"
                        >
                        <v-expansion-panel-header
                            class="amber--text"
                            color="#121212"
                            >{{ item.question }}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            {{ item.answer }}
                        </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script lang="ts">
type Question = {
    question: string;
    answer: string;
}
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'HelpView',
        data() {
            const questions: Question[] = [
                {
                    question: "How to add a new project?",
                    answer: "Click on the add project button on the project page and fill the form.",
                },
                {
                    question: "How to add a new task?",
                    answer: "Click on the add task button on the task page and fill the form. \
                        For creating a task for a particular project, navigate to the project and click on the create new task on the right side of the page.",
                },
                {
                    question: "How to add a new member?",
                    answer: "Click on the add member button on the project dashboard and type the username of the member. \
                        The user will be invited and will have to accept the invitation to join the project.",
                },
                {
                    question: "How to accept the project invite?",
                    answer: "Navigate to the notification page and click on the accept button.",
                },
                {
                    question: "How to remove the member from the team?",
                    answer: "Navigate to the project dashboard and click on the close button on the right side of the member's name.",
                },
                {
                    question: "How to delete a project?",
                    answer: "This feature is not available yet.",
                },
                {
                    question: "How to delete a task?",
                    answer: "Navigate to the project dashboard and click on the delete button on the right side of the task's name. \
                        For deleting a task from the task page, click on the delete button on the right side of the task's name."
                }
            ]
            return {
                questions,
            }
        },
    });
</script>
