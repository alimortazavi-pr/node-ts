export default interface IConfig {
  name: string;
  port: number | string;
  url: string;
  urlOfFrontend: string;
  database: IDatabase;
  layout: ILayout;
  jwt: IJWT;
}

export interface IDatabase {
  url: string;
}

export interface ILayout {
  publicDir: string;
} 

export interface IJWT {
  secretKey: string;
}
