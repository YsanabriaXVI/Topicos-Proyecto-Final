import { ref, onMounted } from "vue";

const theme = ref<"dark" | "light">("dark");

export function useTheme() {
  function setTheme(newTheme: "dark" | "light") {
    theme.value = newTheme;
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  }

  onMounted(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light") || "dark";
    setTheme(saved);
  });

  return { theme, setTheme };
}
