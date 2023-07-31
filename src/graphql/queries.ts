import { gql } from '@apollo/client';
export const GET_ALL_PROJECTS = gql`
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

export const GET_TASKS = gql`
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
  }
}
`;