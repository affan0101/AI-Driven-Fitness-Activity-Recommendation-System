export const authConfig = {
  clientId: 'oAuth2-Fitness',
  authorizationEndpoint: 'http://localhost:9099/realms/FitnessApp/protocol/openid-connect/auth',
  tokenEndpoint: 'http://localhost:9099/realms/FitnessApp/protocol/openid-connect/token',
  redirectUri: 'http://localhost:5173',
  scope: 'openid profile email offline_access',
  onRefreshTokenExpire: (event) => event.logIn(),
}