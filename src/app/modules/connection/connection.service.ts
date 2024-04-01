import { User } from '../user/user.model';
import { TPayloadData } from './connection.interface';
import { Connection } from './connection.model';

const sendRequest = async (payload: TPayloadData) => {
  const { user, data } = payload;

  //  checking if the user email and sender email is same
  if (user?.email !== data?.senderEmail) {
    throw new Error('Invalid sender email');
  }

  //   checking if the request email exist or not

  const isReceiverExits = await User.findOne({ email: data?.receiverEmail });

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

export const ConnectionServices = {
  sendRequest,
};
