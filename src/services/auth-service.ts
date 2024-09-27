import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import config from "../config.json";
import { jwtDecode } from "jwt-decode";
import { DateTime } from "luxon";

const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

export const getSession = async () => {
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    return null;
  }

  const x = jwtDecode(accessToken);

  if (!x.exp) {
    return null;
  }

  const expiry = DateTime.fromSeconds(x.exp);

  if (expiry > DateTime.now().minus({ minutes: 1 })) {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      ClientId: config.clientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    });

    const { AuthenticationResult: result } = await cognitoClient.send(command);

    accessToken = result?.AccessToken ?? null;
    refreshToken = result?.RefreshToken ?? null;

    localStorage.setItem("accessToken", accessToken ?? "");
    localStorage.setItem("refreshToken", refreshToken ?? "");
  }

  return { accessToken };
};

export const logIn = async (email: string, password: string) => {
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
    localStorage.setItem("accessToken", result.AccessToken || "");
    localStorage.setItem("refreshToken", result.RefreshToken || "");

    return !!result.AccessToken;
  } else {
    return false;
  }
};

export const logOut = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
