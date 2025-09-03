import { useContext, useMemo } from "react";
import { CATEGORY_ITEMS } from "./Constant";
import "./CategoryList.css";
import { AppContext } from "./Context/AppProvider";
import PropTypes from "prop-types";

const  CategoryList = ({ todoList, selectedFilterId, searchText }) => {

   const { selectedCategoryId, setSelectedCategoryId } = useContext(AppContext);

   const filteredBySearchAndFilter = useMemo(() => {
      return todoList.filter((todo) => {
         if (searchText && !todo.name.includes(searchText)) {
            return false;
         }
         switch (selectedFilterId) {
            case "all":
               return true;
            case "important":
               return todo.isImportant;
            case "completed":
               return todo.isCompleted;
            case "deleted":
               return todo.isDeleted;
            default:
               return true;
         }
      });
   }, [todoList, selectedFilterId, searchText]);

   const countByCategoryId = useMemo(() => {
      return filteredBySearchAndFilter.reduce((acc, cur) => {
         const key = cur.category;
         acc[key] = (acc[key] || 0) + 1;
         return acc;
      }, {});
   }, [filteredBySearchAndFilter]);

  return (
    <div className="category-list">
      <p className="category-title">Categories</p>
      <div className="category-container">
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
              <p className="category-count">{countByCategoryId[category.id] || 0}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CategoryList;

CategoryList.propTypes = {
  todoList: PropTypes.array,
  selectedFilterId: PropTypes.string,
  searchText: PropTypes.string,
};