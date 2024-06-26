export async function getMenuItems() {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/products`
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data = response.json();
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
}
