import {
    categoryList,
    category,
    selected,
    categoryOverflow,
} from "./CategoryList.module.css";

function CategoryList({ categoryData, filter, setFilter }) {
    return (
        <section className={categoryList}>
            <div className={categoryOverflow}>
                {categoryData.map((obj, i) => (
                    <button
                        className={`${category} ${
                            filter === obj.name ? selected : ""
                        }`}
                        onClick={() => setFilter(obj.name)}
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
