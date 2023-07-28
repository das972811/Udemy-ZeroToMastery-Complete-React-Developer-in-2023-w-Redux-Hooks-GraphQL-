import { useState, createContext, useEffect } from "react"

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

// import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategories] = useState({});
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap  = await getCategoriesAndDocuments();
            setCategories(categoryMap);
        }
        
        getCategoriesMap();
    }, []);
    
    const value = { categoriesMap };
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
}