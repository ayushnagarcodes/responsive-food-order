import styles from "./Menu.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openCart } from "../cart/cartSlice";
import { useCategories } from "./useCategories";
import { useMenuItems } from "./useMenuItems";
import toast from "react-hot-toast";
import SearchBar from "../../ui/SearchBar";
import CategoryList from "./CategoryList";
import MenuItemList from "./MenuItemList";
import Loader from "../../ui/Loader";

function Menu() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [foodType, setFoodType] = useState("All");
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();

    const {
        categories,
        isLoading: isLoadingCategories,
        error: errorCategories,
    } = useCategories();

    const {
        menuItems,
        isLoading: isLoadingMenuItems,
        error: errorMenuItems,
    } = useMenuItems();

    if (isLoadingCategories || isLoadingMenuItems)
        return <Loader type="fullPage" />;

    if (errorCategories || errorMenuItems) {
        // toast.error(`${errorCategories.message}`, `${errorMenuItems.message}`);
    }

    // Filtering data based on "category"
    let filteredMenuItems =
        activeCategory === "All"
            ? menuItems
            : menuItems.filter((item) =>
                  item.category.includes(activeCategory)
              );

    // Filtering data based on "foodType"
    if (foodType === "Veg") {
        filteredMenuItems = filteredMenuItems.filter((item) => item.isVeg);
    } else if (foodType === "Non Veg") {
        filteredMenuItems = filteredMenuItems.filter((item) => !item.isVeg);
    }

    // Filtering data based on "query"
    filteredMenuItems =
        query.trim() === ""
            ? filteredMenuItems
            : filteredMenuItems.filter((item) =>
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
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />

            <MenuItemList menuItems={filteredMenuItems} />
        </article>
    );
}

export default Menu;
