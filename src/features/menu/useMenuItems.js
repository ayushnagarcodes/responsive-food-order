import { useQuery } from "@tanstack/react-query";
import { getMenuItems } from "../../services/apiMenuItem";

export function useMenuItems() {
    const {
        isLoading,
        data: menuItems,
        error,
    } = useQuery({
        queryKey: ["menuItems"],
        queryFn: getMenuItems,
    });

    return { isLoading, menuItems, error };
}
