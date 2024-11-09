export interface IEmployees {
  employees: IEmployee[];
  employee: IEmployee | null;
  isLoading: boolean;
}

export interface IEmployee {
  id: number;
  name: string;
  photo: string;
  role: string;
  employment: string;
  status: string;
  checkIn: string;
  checkOut: string;
  overTime: string;
}
