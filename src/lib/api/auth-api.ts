import axios from "@/lib/api/request";
import { AuthRegisterType } from "@/types/auth-type";

export const authRequest = () => {
  const AUTH_REGISTER = async (payload: AuthRegisterType) => {
    return await axios({
      url: "/auth/register",
      method: "POST",
      data: payload,
    });
  };
  return {
    AUTH_REGISTER,
  };
};
