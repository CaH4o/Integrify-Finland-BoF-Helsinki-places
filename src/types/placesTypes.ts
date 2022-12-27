export interface IAddress {
  street_address: string;
  postal_code: string;
  locality: string;
  neighbourhood: string;
}

export interface ILocation {
  lat: number;
  lon: number;
  address: IAddress;
}

export interface IImage {
  url: string;
}

export interface IDescription {
  intro: string;
  body: string;
  images: IImage[];
}

export interface ITag {
  id: string;
  name: string;
}

export interface IName {
  fi: string;
  en: string;
  sv: string;
  zh: string;
}

export interface IPlace {
  id: string;
  name: IName;
  location: ILocation;
  info_url: string;
  description: IDescription;
  tags: ITag[];
  opening_hours_url: string;
}

export type tTag = { [id: string]: string };

export interface IResponse {
  meta: {
    count: string;
  };
  data: IPlace[];
  tags: tTag;
}

export interface IPlacesState {
  loading: boolean;
  error: boolean;
  places: IPlace[];
  present: IPlace[];
  tags: tTag;
  count: number;
  filters: {
    tagID: string;
  };
}
