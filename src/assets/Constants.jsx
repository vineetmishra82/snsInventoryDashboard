

const baseUrl = "https://sns-inventory-app-82ddc50c51dc.herokuapp.com/";

export const Login = baseUrl+"adminLogin?userId=";

export const getSites = baseUrl+"getSites";
export const getUnits = baseUrl+"getUnits";
export const getTnP = baseUrl+"getTnP";
export const getRequisitions = baseUrl+"getRequisitions";
export const getCategories = baseUrl+"getCategories";

export const createUnit = (unit) => {
    return baseUrl+"createUnit?unitName="+unit;
}

export const updateUnit = (selectedUnit,updateUnit) => {
    return baseUrl+"updateUnit?oldUnitName="+selectedUnit+"&newUnitName="+updateUnit;
}

export const deleteUnit = (updateUnit) => {
    return baseUrl+"unitDelete?unitDelete="+updateUnit;
}

export const createCategory = (category) => {
    return baseUrl+"createCategory?categoryName="+category;
}

export const updateCategory = (selectedCategory,updateCategory) => {
    return baseUrl+"updateCategory?oldCategoryName="+selectedCategory+"&newCategoryName="+updateCategory;
}

export const deleteCategory = (updateCategory) => {
    return baseUrl+"categoryDelete?categoryDelete="+updateCategory;
}

export const createNewTnP = (newTnP,selectedCategory,selectedUnit,
    TnPQuantity,tnpRemarks) => {
        return baseUrl+"createTnP?tnpName="+newTnP+
        "&category="+selectedCategory+"&unit="+selectedUnit+
        "&currentQuantity="+TnPQuantity+"&remarks="+tnpRemarks;
    }

export const updateTnP = (tnpId,editCategory,editUnit,editRemarks)=>{
    return baseUrl+"updateTnP?tnpId="+tnpId+"&editCategory="+editCategory+
    "&editUnit="+editUnit+"&editRemarks="+editRemarks;
}

export const deleteTnP = (selectedTnPID) =>{
    return baseUrl+"deleteTnP?tnpId="+selectedTnPID;
}

