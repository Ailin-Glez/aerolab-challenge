import { Config } from "../models/aerolab-models";

const BASE_URL = "https://coding-challenge-api.aerolab.co";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDkxZDJhNWI2M2JjMjAwMjA0NmI5MWUiLCJpYXQiOjE2ODcyNzgyNDV9.kQ2NUgBho0-pEMDDOnqO45GklqYyYI9OvNJzQQKnI8Y";

/**
 * Function to send a request to Aerolab service
 * @param {Config} config - An object with the endpoint, method and body parameters (these two are optional)
 */
export const sendRequest = async <T>(config: Config): Promise<T> => {
  const { method, endpoint, body } = config;

  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${TOKEN}`,
    },
    body
  });

  if (!res.ok) throw new Error();

  const data: T = await res.json();

  return data;
};
