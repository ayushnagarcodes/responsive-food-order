import {
    categoryList,
    categoryContainer,
    selected,
    categoryOverflow,
} from "./CategoryList.module.css";

function CategoryList({ categories, activeCategory, setActiveCategory }) {
    return (
        <section className={categoryList}>
            <div className={categoryOverflow}>
                <button
                    className={`${categoryContainer} ${
                        activeCategory === "All" ? selected : ""
                    }`}
                    onClick={() => setActiveCategory("All")}
                >
                    <img src="assets/icons/menu.png" alt={"All"} />
                    <p>{"All"}</p>
                    <span>{categories?.length} Items</span>
                </button>

                {categories?.map((obj, i) => (
                    <button
                        className={`${categoryContainer} ${
                            activeCategory === obj.name ? selected : ""
                        }`}
                        onClick={() => setActiveCategory(obj.name)}
                        key={i}
                    >
                        <img src={obj.img} alt={obj.name} />
                        <p>{obj.name}</p>
                        <span>{obj.total} Items</span>
                    </button>
                ))}
            </div>
        </section>
    );
}

export default CategoryList;
