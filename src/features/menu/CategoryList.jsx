import {
    categoryList,
    categoryContainer,
    selected,
    categoryOverflow,
} from "./CategoryList.module.css";

function CategoryList({ categoryData, category, setCategory }) {
    return (
        <section className={categoryList}>
            <div className={categoryOverflow}>
                {categoryData.map((obj, i) => (
                    <button
                        className={`${categoryContainer} ${
                            category === obj.name ? selected : ""
                        }`}
                        onClick={() => setCategory(obj.name)}
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
