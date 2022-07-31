import { User } from "./user.model";

export interface ApplicationRequest {
  id: number;
  jobId: number;
  clientId: number;
  user?: User;
}
