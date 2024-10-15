export interface Profile {
  academyId: number;
  academyRole: string;
  nickname: string;
  profileImageUrl: string;
  school: string;
  point: number;
}

export interface ProfileResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: Profile;
}

export interface ErrorResponse {
  isSuccess: boolean;
  code: string;
  message: string;
}
