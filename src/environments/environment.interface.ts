export interface Environment {
  production: boolean,
  httpBackend: string,
  httpBackendPersonal: string,
  language: string,
  apiKey: string,
}

export type Profile = 'dev' | 'local' | 'prod' | 'test';