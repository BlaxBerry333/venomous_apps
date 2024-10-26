import { useTheme } from "vuetify";

export default function () {
  const vuetifyTheme = useTheme();

  const isDarkModeTheme = computed<boolean>(
    () => vuetifyTheme.global.current.value.dark,
  );

  function toggleTheme(): void {
    vuetifyTheme.global.name.value = isDarkModeTheme.value ? "light" : "dark";
  }

  return {
    isDarkModeTheme,
    toggleTheme,
  };
}
