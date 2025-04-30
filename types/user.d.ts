interface UserName {
  title: string;
  first: string;
  last: string;
}

interface UserLocation {
  country: string;
}

interface UserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface UserLogin {
  uuid: string;
}

interface User {
  gender: string;
  name: UserName;
  location: UserLocation;
  email: string;
  login: UserLogin;
  picture: UserPicture;
}

interface ApiResponse {
  results: User[];
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
}
