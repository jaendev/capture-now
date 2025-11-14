import { createDefaultTags, getTags } from "@/src/services/tagService"
import { useAuthStore } from "../stores/authStore"

export function useAuth() {
  const { setAuth, } = useAuthStore()

}

