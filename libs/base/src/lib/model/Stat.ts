export interface Stat {
  id:string;
}

export interface DocumentCountStat extends Stat{

  users:number;
  hosts:number;
  permissions:number;
  questionnaires:number;
  questions:number;
  roles:number;
  courses:number;
}
