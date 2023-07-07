export interface KakaoResponse {
  access_token: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    accessToken: string;
    refreshTokenExpireTime: string;
    refreshToken: string;
  };
}
