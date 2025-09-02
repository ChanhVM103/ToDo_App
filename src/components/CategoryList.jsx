import { useContext } from "react";
import { CATEGORY_ITEMS } from "../constants";
import "./CategoryList.css";
import { AppContext } from "../context/AppProvider";

const CategoryList = () => {
  const { selectedCategoryId, setSelectedCategoryId } = useContext(AppContext);

  return (
    <div>
      <p>Categories</p>
      <div>
        {CATEGORY_ITEMS.map((category) => {
          return (
            <div
              key={category.id}
              className={`category-item ${
                category.id === selectedCategoryId ? "selected" : ""
              }`}
              onClick={() => setSelectedCategoryId(category.id)}
            >
              <p className="category-name">{category.label}</p>
              <p>2</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CategoryList;