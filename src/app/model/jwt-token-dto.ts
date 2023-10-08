export class JwtTokenDto {
  jwt: string;
  constructor(jwt: string) {
    this.jwt = jwt;
  }
}
