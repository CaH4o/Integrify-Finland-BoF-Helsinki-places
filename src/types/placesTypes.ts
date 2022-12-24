export interface IAddress {
  streetAddress: string;
  postalCode: string;
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

export interface ITeg {
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
  infoUrl: string;
  description: IDescription;
  tags: ITeg[];
  openingHoursUrl: string;
}

export type tTeg = { [key: string]: string };

export interface IResponse {
  meta: {
    count: string;
  };
  data: IPlace[];
  tags: tTeg[];
}

export interface IPlacesState {
  loading: boolean;
  error: boolean;
  places: IPlace[];
  tags: tTeg[];
  count: number;
}
