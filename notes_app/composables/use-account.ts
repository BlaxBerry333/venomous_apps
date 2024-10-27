type AccountDataType = {
  avatar: string;
  displayName: string;
  email: string;
};

const MOCK_TOKEN: string = "xxxxxxx";

const MOCK_ACCOUNT: AccountDataType = {
  avatar: "https://avatars.githubusercontent.com/u/166675080?v=4",
  displayName: "BlaxBerry",
  email: "blaxberry@example.com",
};

export default function () {
  const tokenCookie = useCookie<string>("token");

  // ------------------------------------------------------------------------------------------

  const account = ref<AccountDataType | null>();

  const isAuthenticated = ref<boolean>(false);

  watchEffect(() => {
    if (tokenCookie.value) {
      // TODO:
      account.value = MOCK_ACCOUNT;
      isAuthenticated.value = true;
    } else {
      account.value = null;
      isAuthenticated.value = false;
    }
  });

  // ------------------------------------------------------------------------------------------

  async function handleLogoIn(
    _: Pick<AccountDataType, "email">,
    callback?: () => void,
  ) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO:
    tokenCookie.value = MOCK_TOKEN;

    callback?.();
  }

  async function handleLogout(callback?: () => void) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    tokenCookie.value = "";
    callback?.();
  }

  // ------------------------------------------------------------------------------------------

  return {
    handleLogoIn,
    handleLogout,
    account,
    isAuthenticated,
  };
}
