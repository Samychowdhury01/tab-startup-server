import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectServices } from './project.service';

//  Create new project
const createProject = catchAsync(async (req, res) => {
  const { project: projectData } = req.body;
  const result = await ProjectServices.createProjectIntoDB(projectData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
  });
});

// get all the project controller
const getAllProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.getProjectsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'projects retrieved successfully!',
    data: result,
  });
});


// get single project controller
const getSingleProject = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ProjectServices.getSingleProjectFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'project retrieved successfully!',
    data: result,
  });
});

// get specific user's project controller
const getUserProjects = catchAsync(async (req, res) => {
  const id = req.params.id;
  console.log(id, 'from controller line 48', typeof id);
  const result = await ProjectServices.getUserProjectsFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's project retrieved successfully!",
    data: result,
  });
});

export const ProjectControllers = {
  createProject,
  getAllProject,
  getSingleProject,
  getUserProjects
};
