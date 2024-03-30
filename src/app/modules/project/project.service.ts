import { TProject } from "./project.interface";
import { Project } from "./project.model";

// create  a new project into Database
const createProjectIntoDB = async (payload: TProject) =>{
    const result = await Project.create(payload);
    return result;
}
const getProjectsFromDB = async () =>{
    const result = await Project.find();
    return result;
}
const getSingleProjectFromDB = async (payload : string) =>{
    const result = await Project.findById(payload);
    
    if(result === null){
        throw new Error("There is no project with this ID");
    }
    return result;
}


export const ProjectServices = {
    createProjectIntoDB,
    getProjectsFromDB,
    getSingleProjectFromDB
}