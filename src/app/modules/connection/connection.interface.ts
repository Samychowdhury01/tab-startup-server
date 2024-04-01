import { JwtPayload } from 'jsonwebtoken';

export type TConnection = {
  senderEmail: string;
  receiverEmail: string;
  status?: 'pending' | 'accepted';
};

export type TPayloadData = {
  user: JwtPayload;
  data: TConnection;
};
