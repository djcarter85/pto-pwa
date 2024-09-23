import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import config from "../config.json";

const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

const isLoggedIn = () => {
  return !!localStorage.getItem("accessToken");
};

const logIn = async (email: string, password: string) => {
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });

  const { AuthenticationResult: result } = await cognitoClient.send(command);

  if (result) {
    localStorage.setItem("idToken", result.IdToken || "");
    localStorage.setItem("accessToken", result.AccessToken || "");
    localStorage.setItem("refreshToken", result.RefreshToken || "");

    return !!result.AccessToken;
  } else {
    return false;
  }
};

const logOut = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export { isLoggedIn, logIn, logOut };
