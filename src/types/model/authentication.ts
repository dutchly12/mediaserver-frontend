export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

export enum AuthenticationStatus {
  inactive = 'inactive',
  active = 'active',
  revoked = 'revoked',
  expired = 'expired',
}

export enum AuthenticationUserAgentType {
  mobile = 'mobile',
  other = 'other',
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

export interface Authentication {
  id: string;
  status: AuthenticationStatus;
  created_at: string;
  updated_at: string;
  current: boolean;
  user_agent: {
    type: AuthenticationUserAgentType;
    browser_name: string;
    browser_version: string;
  };
}
