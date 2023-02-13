export interface Iuser{
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    email: string,
    age: number,
    isAdmin : boolean,
    description : string | null
}

export interface Ipost{
    title: string,
    startPlace: string,
    finishplace: string,
    cost: string,
    story: string,
}