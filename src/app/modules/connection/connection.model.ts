import { Schema, model } from 'mongoose';
import { TConnection } from './connection.interface';

const connectionSchema = new Schema<TConnection>({
  senderEmail: { 
    type: String, 
    required: true 
    },
  receiverEmail: { 
    type: String, 
    required: true 
    },
  status: {
    type : String, 
    enum : ['pending' , 'accepted'],
    default : 'pending'
    }
});

export const  Connection = model<TConnection>('Connection', connectionSchema);

