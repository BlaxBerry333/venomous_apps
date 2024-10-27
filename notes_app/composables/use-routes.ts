export default function () {
  const { path } = toRefs(useRoute());

  const pathname = ref<string>(path.value);

  function checkIsCurrentPathname(newPath: string): boolean {
    return newPath === path.value;
  }

  watchEffect(() => {
    pathname.value = path.value;
  });

  // ------------------------------------------------------------------------------------------

  const { push } = useRouter();

  function navigateTo(newPath: string) {
    if (checkIsCurrentPathname(newPath)) {
      return;
    }
    push(newPath);
  }

  // ------------------------------------------------------------------------------------------

  return {
    pathname,
    navigateTo,

    checkIsCurrentPathname,
  };
}
