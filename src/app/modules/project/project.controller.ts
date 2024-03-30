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

const getAllProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.getProjectsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'projects retrieved successfully!',
    data: result,
  });
});
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

export const ProjectControllers = {
  createProject,
  getAllProject,
  getSingleProject,
};
