import styles from "./Menu.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openCart } from "../cart/cartSlice";
import SearchBar from "../../ui/SearchBar";
import CategoryList from "./CategoryList";
import MenuItemList from "./MenuItemList";

function Menu() {
    const [category, setCategory] = useState("All");
    const [foodType, setFoodType] = useState("All");
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();

    // Filtering data based on "category"
    let filteredMenuData =
        category === "All"
            ? menuData
            : menuData.filter((item) => item.category.includes(category));

    // Filtering data based on "foodType"
    if (foodType === "Veg") {
        filteredMenuData = filteredMenuData.filter((item) => item.isVeg);
    } else if (foodType === "Non Veg") {
        filteredMenuData = filteredMenuData.filter((item) => !item.isVeg);
    }

    // Filtering data based on "query"
    filteredMenuData =
        query.trim() === ""
            ? filteredMenuData
            : filteredMenuData.filter((item) =>
                  item.name.toLowerCase().includes(query.trim().toLowerCase())
              );

    return (
        <article className={styles.menu}>
            <div className={styles.menuTop}>
                <SearchBar
                    query={query}
                    setQuery={setQuery}
                    placeholder="Search dish here..."
                />

                <div className={styles.foodType}>
                    <button
                        onClick={() => setFoodType("All")}
                        className={foodType === "All" ? styles.selected : ""}
                    >
                        All
                    </button>

                    <button
                        onClick={() => setFoodType("Veg")}
                        className={foodType === "Veg" ? styles.selected : ""}
                    >
                        <img src="/assets/icons/veg.png" alt="" />
                    </button>

                    <button
                        onClick={() => setFoodType("Non Veg")}
                        className={
                            foodType === "Non Veg" ? styles.selected : ""
                        }
                    >
                        <img
                            src="/assets/icons/non-veg.png"
                            alt=""
                            style={{ filter: "hue-rotate(245deg)" }}
                        />
                    </button>
                </div>

                <button
                    className={styles.btnOpenCart}
                    onClick={() => dispatch(openCart())}
                >
                    <img
                        src="/assets/icons/bag-handle-outline-dark.svg"
                        alt="cart button"
                    />
                </button>
            </div>

            <CategoryList
                categoryData={categoryData}
                category={category}
                setCategory={setCategory}
            />

            <MenuItemList menuData={filteredMenuData} />
        </article>
    );
}

const categoryData = [
    { name: "All", total: 7, img: "assets/icons/menu.png" },
    { name: "Breakfast", total: 2, img: "assets/icons/breakfast.png" },
    {
        name: "Main Course",
        total: 4,
        img: "assets/icons/northindianthali.png",
    },
    { name: "Burgers", total: 1, img: "assets/icons/burger.png" },
    { name: "Soups", total: 0, img: "assets/icons/soup.png" },
    { name: "Noodles", total: 0, img: "assets/icons/noodles.png" },
];

const menuData = [
    {
        name: "Tasty Vegetable Salad Healthy Diet",
        price: 100,
        isVeg: true,
        img: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: ["Breakfast", "Main Course"],
    },
    {
        name: "Chicken Burger",
        price: 80,
        isVeg: false,
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=3099&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: ["Burgers"],
    },
    {
        name: "Fruit Salad",
        price: 120,
        isVeg: true,
        img: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=3206&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: ["Breakfast"],
    },
    {
        name: "Cheese Pizza",
        price: 200,
        isVeg: true,
        img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGl6emF8ZW58MHx8MHx8fDA%3D",
        category: ["Main Course"],
    },
    {
        name: "Oreo Shake",
        price: 110,
        isVeg: true,
        img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: ["Drinks"],
    },
    {
        name: "Veg Meal",
        price: 150,
        isVeg: true,
        img: "https://images.unsplash.com/photo-1711153419402-336ee48f2138?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGluZGlhbiUyMHRoYWxpfGVufDB8fDB8fHww",
        category: ["Main Course"],
    },
    {
        name: "Traditional Indian Delight",
        price: 220,
        isVeg: true,
        img: "https://images.unsplash.com/photo-1652595802737-56d08ad31f09?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: ["Main Course"],
    },
];

export default Menu;
