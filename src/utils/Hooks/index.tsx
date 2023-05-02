import { useMemo } from "react";
import { getLocalStorageItem } from "../localStorage";

export const useUserDetails = () =>
  useMemo(() => getLocalStorageItem("userDetails"), []);
