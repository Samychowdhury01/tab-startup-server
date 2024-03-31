import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';


// user login controller
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: result,
  });
});

// user logout controller
const logoutUser = catchAsync(async (req, res) => {
  const result = await AuthServices.logoutUser(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged out successfully!',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  logoutUser
};
