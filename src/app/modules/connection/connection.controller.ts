import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ConnectionServices } from './connection.service';
import { TConnectionPayload, TConnectionType } from './connection.interface';

//  send request
const sendRequest = catchAsync(async (req, res) => {
  const payloadData = {
    user: req?.user,
    data: req?.body,
  };

  const result = await ConnectionServices.sendRequest(payloadData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Connection Request Sent Successfully',
    data: result,
  });
});




// with this API  we can get all the sended an received connection requests of a particular user
const getRequests = catchAsync(async (req, res) => {
  const payload = {
    user: req?.user,
    email: req?.query.email as string,
  };
  const type = req?.query?.type as TConnectionType

  const result = await ConnectionServices.getRequests(payload, type);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieved requests',
    data: result,
  });
});

export const ConnectionControllers = {
  sendRequest,
  getRequests
};
