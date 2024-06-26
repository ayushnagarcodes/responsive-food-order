export async function getCategories() {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/cateogry`
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
}
