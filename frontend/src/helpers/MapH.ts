import { LngLat } from "mapbox-gl";

//map Interfaces
export interface DirectionsResponse {
    routes: Route[];
    waypoints: Waypoint[];
    code: string;
    uuid: string;
  }
  
  export interface Route {
    country_crossed: boolean;
    weight_name: string;
    weight: number;
    duration: number;
    distance: number;
    legs: Leg[];
    geometry: Geometry;
  }
  
  export interface Geometry {
    coordinates: Array<number[]>;
    type: string;
  }
  
  export interface Leg {
    via_waypoints: any[];
    admins: Admin[];
    weight: number;
    duration: number;
    steps: any[];
    distance: number;
    summary: string;
  }
  
  export interface Admin {
    iso_3166_1_alpha3: string;
    iso_3166_1: string;
  }
  
  export interface Waypoint {
    distance: number;
    name: string;
    location: number[];
  }

  //places geometry

  export interface PlacesResponse {
    type: string;
    query: string[];
    features: Feature[];
    attribution: string;
  }
  
  export interface Feature {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: Properties;
    text_es: string;
    place_name_es: string;
    text: string;
    place_name: string;
    bbox?: number[];
    center: number[];
    geometry: PlacesGeometry;
    context: Context[];
  }
  
  export interface Context {
    id: string;
    wikidata?: Wikidata;
    short_code?: ShortCode;
    text_es: string;
    language_es?: Language;
    text: string;
    language?: Language;
  }
  
  export enum Language {
    Es = "es",
  }
  
  export enum ShortCode {
    CR = "cr",
    CRA = "CR-A",
  }
  
  export enum Wikidata {
    Q37104 = "Q37104",
    Q502188 = "Q502188",
    Q800 = "Q800",
  }
  
  export interface PlacesGeometry {
    type: string;
    coordinates: number[];
  }
  
  export interface Properties {
    foursquare?: string;
    landmark?: boolean;
    category?: string;
    maki?: string;
    address?: string;
  }

  export interface MarkersI{
    markers: (latlngUser: mapboxgl.LngLat) => ({
      latlng: LngLat;
      color: string;
      html: string;
  } | {
      latlng: number[];
      color: string;
      html: string;
  })[]
  }