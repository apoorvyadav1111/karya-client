type ProjectInfo = {
    id: string,
    name: string,
}

type UserInfo = {
    id: string,
    username: string,
}

type sectionInfo = {
    id: string,
    name: string,
}

export type Status = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';

export type Task = {
    id: string,
    name: string,
    description: string,
    section: sectionInfo,
    project:ProjectInfo,
    due_date: string,
    start_date: string,
    status: Status,
    end_date:Date,
    hours_spent: number,
    total_hours: number,
    assigned_to: UserInfo,
    assigned_by: UserInfo,
}

export type TaskInput = {
    name: string,
    description: string,
    section?: string,
    project?:string,
    due_date: string,
    start_date: string,
    status: Status,
    hours_spent: number,
    total_hours: number,
    assigned_to: string,
    assigned_by: string,
}