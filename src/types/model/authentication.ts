export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

export type TokensPair = Record<TokenType, string>;

export interface AuthenticationCreationRequest {
  email: string;
  password: string;
}

export type AuthenticationCreationResponse = TokensPair;

export interface AuthenticationRefreshRequest {
  refresh_token: string;
}
