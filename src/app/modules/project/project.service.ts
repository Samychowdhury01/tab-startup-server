import { TProject } from './project.interface';
import { Project } from './project.model';

// create  a new project into Database
const createProjectIntoDB = async (payload: TProject) => {
  const result = await Project.create(payload);
  return result;
};

// get all the projects from DB
const getProjectsFromDB = async () => {
  const result = await Project.find();
  return result;
};

// get a single project from DB
const getSingleProjectFromDB = async (payload: string) => {
  const result = await Project.findById(payload);

  if (result === null) {
    throw new Error('There is no project with this ID');
  }
  return result;
};

// get all project of a specific user
const getUserProjectsFromDB = async (userId: string) => {
  const result = await Project.aggregate([{ $match: { userId: userId } }]);
  
  if(result.length === 0){
    throw new Error("This user doesn't have any project");
  }
  return result;
};

export const ProjectServices = {
  createProjectIntoDB,
  getProjectsFromDB,
  getSingleProjectFromDB,
  getUserProjectsFromDB,
};
