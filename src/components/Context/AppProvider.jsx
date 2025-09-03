import PropTypes from "prop-types";
import React, { createContext, useState } from "react";

export const AppContext = createContext();

function AppProvider({ children }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState();
  return (
    <AppContext.Provider value={{ selectedCategoryId, setSelectedCategoryId }}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
};

export default AppProvider;
