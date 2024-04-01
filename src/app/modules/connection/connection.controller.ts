import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ConnectionServices } from './connection.service';

//  send request
const sendRequest = catchAsync(async (req, res) => {
    const payloadData = {
        user : req?.user,
        data : req?.body
    }

    const result = await ConnectionServices.sendRequest(payloadData);
    
    sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Connection Request Sent Successfully',
    data: result,
  });
});

export const ConnectionControllers = {
    sendRequest
}
