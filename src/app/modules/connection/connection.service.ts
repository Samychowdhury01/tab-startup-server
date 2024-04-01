import { User } from '../user/user.model';
import {
  TConnectionPayload,
  TConnectionType,
  TPayloadData,
} from './connection.interface';
import { Connection } from './connection.model';

const sendRequest = async (payload: TPayloadData) => {
  const { user, data } = payload;

  //  checking if the user email and sender email is same
  if (user?.email !== data?.senderEmail) {
    throw new Error('Invalid sender email');
  }

  //   checking if the request email exist or not

  const isReceiverExits = await User.isUserExist(data?.receiverEmail);

  if (!isReceiverExits) {
    throw new Error(`Receiver not found`);
  }

  // Check if a connection already exists between the requester and the receiver
  const existingConnection = await Connection.findOne({
    $or: [
      { senderEmail: data?.senderEmail, receiverEmail: data?.receiverEmail },
      { senderEmail: data?.receiverEmail, receiverEmail: data?.senderEmail },
    ],
  });

  if (existingConnection) {
    throw new Error(`Connection already exists`);
  }

  const result = await Connection.create(data);
  return result;
};


const getRequests = async (
  payload: TConnectionPayload,
  type: TConnectionType,
) => {
  const { user, email } = payload;

  //  checking if the user email and sender email is same
  if (user?.email !== email) {
    throw new Error('Invalid user email');
  }

  //   checking if the request email exist or not
  const isUserExists = await User.isUserExist(email);

  if (!isUserExists) {
    throw new Error(`User not found`);
  }

  if (!type || (type !== 'sent' && type !== 'received')) {
    throw new Error(`Invalid type`);
  }

  if (type === 'sent') {
    return await Connection.aggregate([
      {
        $match: { senderEmail: email },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'receiverEmail',
          foreignField: 'email',
          as: 'receiverInfo',
        },
      },
      {
        $unwind: '$receiverInfo',
      },
      {
        $project: {
          senderEmail: 1,
          receiverEmail: 1,
          status: 1,
          'receiverInfo.name': 1,
          'receiverInfo.email': 1,
          'receiverInfo.phoneNo': 1,
        },
      },
    ]);
  } else {
    // type === 'received'
    return await Connection.aggregate([
      {
        $match: { receiverEmail: email },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'senderEmail',
          foreignField: 'email',
          as: 'senderInfo',
        },
      },
      {
        $unwind: '$senderInfo',
      },
      {
        $project: {
          senderEmail: 1,
          receiverEmail: 1,
          status: 1,
          'senderInfo.name': 1,
          'senderInfo.email': 1,
          'senderInfo.phoneNo': 1,
        },
      },
    ]);
  }
};

export const ConnectionServices = {
  sendRequest,
  getRequests,
};
