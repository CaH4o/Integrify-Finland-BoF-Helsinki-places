export interface dataState {
  loading: boolean;
  error: boolean;
  data: IResource[];
}

export interface IResource {
  count: number;
  next: string;
  previous: string;
  results: IResult[];
}

export interface IResult {
  id: number;
  name: string;
  description: string;
  address: {
    fi:string;
  };
  resource_type: string;
  organization: string;
}
