import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

export const useCurrentUser = () => {
    const data = useQuery(api.users.current);
    // if there is no data (undefiend) return loading
    const isLoading = data === undefined;
    return {data, isLoading}

}