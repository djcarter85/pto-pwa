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

export const isLoggedIn = () => {
  return !!localStorage.getItem("idToken");
};

export const getSession = async () => {
  let idToken = localStorage.getItem("idToken");
  let refreshToken = localStorage.getItem("refreshToken");

  if (!idToken || !refreshToken) {
    return null;
  }

  const decodedIdToken = jwtDecode(idToken);

  if (!decodedIdToken.exp) {
    return null;
  }

  const expiry = DateTime.fromSeconds(decodedIdToken.exp);

  if (DateTime.now() > expiry.minus({ minutes: 1 })) {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      ClientId: config.clientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    });

    const { AuthenticationResult: result } = await cognitoClient.send(command);

    idToken = result?.IdToken ?? null;
    localStorage.setItem("idToken", idToken ?? "");

    if (result?.RefreshToken) {
      refreshToken = result?.RefreshToken;
      localStorage.setItem("refreshToken", refreshToken);
    }
  }

  return { idToken };
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
    localStorage.setItem("idToken", result.IdToken || "");
    localStorage.setItem("refreshToken", result.RefreshToken || "");

    return !!result.IdToken;
  } else {
    return false;
  }
};

export const logOut = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("refreshToken");
};
