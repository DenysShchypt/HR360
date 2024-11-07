export interface IDepartments {
  departments: IDepartment[];
  isLoading: boolean;
}

export interface IDepartment {
  id: string;
  name: string;
  totalEmployee: number;
  headcountChange: number;
}
