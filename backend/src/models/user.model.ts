import { Profile, Job, Application, ApplyRequest } from "@prisma/client";

enum Role {
  FREELANCER,
  CLIENT,
  ADMIN,
}

export interface User {
  id: number;
  name: string;
  password: string;
  role: string;
  title: string;
  description: string;
  rate: number;
  approved: boolean;
  profile: Profile;
  jobs: Job[];
  applications: Application[];
  request: ApplyRequest[];
}
