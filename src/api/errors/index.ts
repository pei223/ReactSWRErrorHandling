import { HTTPError } from "ky";
import { ErrorRes } from "./types";

export const isApiErrorRes = (res: any): res is ErrorRes =>
  typeof res.message === "string" && typeof res.detail === "string";

export const isHTTPError = (error: unknown): error is HTTPError =>
  error instanceof HTTPError;
