import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthLayoutPageContainer } from "~/common/components/layouts/AuthLayout";
import AuthLoginForm, {
  type AuthLoginFormValueType,
} from "~/common/components/sections/auth-login/AuthLoginForm";
import { ROUTE_PATHS } from "~/router";

export default function AuthLoginPageView() {
  const navigate = useNavigate();

  // ----------------------------------------------------------------------------------------------------

  const [isAccountLoginLoading, setIsAccountLoginLoading] = useState<boolean>(false);

  const handleAccountLogin = useCallback(
    async (formValue: AuthLoginFormValueType) => {
      setIsAccountLoginLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsAccountLoginLoading(false);

      console.log(formValue);

      navigate(ROUTE_PATHS.dashboard.root, { replace: true });
    },
    [setIsAccountLoginLoading, navigate],
  );

  const [isVisitorLoginLoading, setIsVisitorLoginLoading] = useState<boolean>(false);

  const handleVisitorLogin = useCallback(async () => {
    setIsVisitorLoginLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsVisitorLoginLoading(false);

    navigate(ROUTE_PATHS.dashboard.root, { replace: true });
  }, [setIsVisitorLoginLoading, navigate]);

  // ----------------------------------------------------------------------------------------------------

  return (
    <AuthLayoutPageContainer
      title={"AuthLoginPage"}
      subtitle={"Don't have an account?"}
      subtitleLink={ROUTE_PATHS.auth.signUp}
      form={
        <AuthLoginForm
          data={{ email: "", password: "" }}
          isAccountLoginLoading={isAccountLoginLoading}
          isVisitorLoginLoading={isVisitorLoginLoading}
          handleAccountLogin={handleAccountLogin}
          handleVisitorLogin={handleVisitorLogin}
        />
      }
    />
  );
}
