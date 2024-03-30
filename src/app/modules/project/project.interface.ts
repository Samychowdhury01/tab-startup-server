import { ObjectId } from "mongoose";

export type TProject = {
    title : string;
    description : string;
    userId: ObjectId

}