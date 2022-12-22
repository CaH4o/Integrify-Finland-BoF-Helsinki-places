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
  address: string;
  resource_type: string;
  children: number[];
  parents: number[];
  organization: string;
  origins: object[];
  last_modified_by: {};
  created: Date;
  modified: Date;
  extra_data: { property1: null; property2: null };
  is_public: true;
  timezone: string;
  date_periods_hash: string;
  date_periods_as_text: string;
}
