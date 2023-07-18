export type ProjectInput = {
    name?:string,
    description:string,
    start_date:String,
    due_date:String,
}

type Project = {
    id:string,
    name:string,
    description:string,
    start_date:Date,
    due_date:Date,
    end_date:Date
}
