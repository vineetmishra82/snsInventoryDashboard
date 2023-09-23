import React, { useEffect, useState } from "react";
import myStyle from "./Units.module.css";
import * as constants from "../../assets/Constants";
import Loading from "../IsLoading/isLoading"

function Units(props) {

const[units,setUnits] = useState([]);
const[categories,setCategories] = useState([]);
const[selectedUnit,setSelectedUnit] = useState("");
const[newUnit,setNewUnit] = useState("");
const[updateUnit,setUpdateUnit] = useState('');
const[isEditDisabledUnit,setIsEditDisabledUnit] = useState(true);
const[isEditDisabledCategory,setIsEditDisabledCategory] = useState(true);
const[selectedCategory,setSelectedCategory] = useState('');
const[updateCategory,setUpdateCategory] = useState('');
const[newCategory,setNewCategory] = useState('');
const[isLoading,setIsLoading] = useState(true);

useEffect(() => {
getUnits();
getCategories();
},[]);

const handleCategoriesChange = (e) => {

    setSelectedCategory(e.target.value);

}

const handleUnitsChange = (e) => {

setSelectedUnit(e.target.value);
}  

const editUnit = () => {
  setUpdateUnit(selectedUnit);
  setIsEditDisabledUnit(false);
}

const getUnits = async() => {
 
  try{ 
      setIsLoading(true);
      console.log(constants.getUnits);
        await fetch(constants.getUnits,{
          method : "Get"
        })
               .then((response) => {
                  return response.json();
               })
               .then((myJson) => {
                    console.log("myjson is "+myJson);
                   setUnits(myJson);
                   console.log("units is "+units);
                   setIsLoading(false);
               });
       } catch (e) {
           console.log(e);
       }
};

const processAPI = async(url,methodName,type) =>{
  
  var responseValue = -1;
  setIsLoading(true);
  await fetch(url, {
    method : methodName,
       })
  .then((response1) => {return response1.json()})
  .then((response1)=> {
    console.log("server response "+response1);
    responseValue = response1;
  })
  .then(()  => {
    console.log("response is "+responseValue);

    setIsLoading(false);
    
   if(type==="unit")
      {
        getUnits();
        handleResetUnit();

        if(responseValue===1 && methodName==="Post")
        {
         alert("Unit created succesfully !"); 
        }
        else if(responseValue===1 && methodName==="Delete")
        {
         alert("Unit deleted succesfully !"); 
        }
        else if(responseValue===-1)
        {
          alert("Unit already exists !");
        }
        else if(responseValue===5 && methodName==="Delete")
        {
         alert("Unit already mapped to existing T&P, can't delete it !"); 
        }
        else{
          alert("Error...try again !");
        }
      }
      else{
        getCategories();
        handleResetCategories();
        if(responseValue===1 && methodName === "Post")
        {
         alert("Category created succesfully !"); 
        }
        else if(responseValue===1 && methodName==="Delete")
        {
         alert("Category deleted succesfully !"); 
        }
        else if(responseValue===5 && methodName==="Delete")
        {
         alert("Category already mapped to existing T&P, can't delete it !"); 
        }
        else if(responseValue===-1)
        {
          alert("Category already exists !");
        }
        else{
          alert("Error...try again !");
        }
      }
    setIsLoading(false);
  });

}

const createUnit = () =>  {

  if(newUnit.length>0)
  {
    const url = constants.createUnit(newUnit);
    console.log("New unit url - "+url);
  
    processAPI(url,"Post","unit"); 
    
  }
  
  }

  const handleResetUnit = () => {
    setNewUnit('');
    setUpdateUnit('');
    setSelectedUnit('');
    setIsEditDisabledUnit(true);
  }

  const handleResetCategories = () => {
    setNewCategory('');
    setUpdateCategory('');
    setSelectedCategory('');
    setIsEditDisabledCategory(true);
  }


const getCategories = () => {
  try{ 
   console.log(constants.getCategories);
  fetch(constants.getCategories)
           .then((response) => {
                console.log(response);
               return response.json();
           })
           .then((myJson) => {
               // console.log(myJson);
               setCategories(myJson);
           });
   } catch (e) {
       console.log(e);
   }
};


const unitInputChange = (e) => {
setNewUnit(e.target.value);
}

const unitUpdateChange = (e) => {
  setUpdateUnit(e.target.value);
}

const updateTheUnit = () => {

  if(updateUnit.length>0)
  {
    const url = constants.updateUnit(selectedUnit,updateUnit);

    console.log(url);
    
    processAPI(url,"Post","unit");
     
  }

};

const DeleteTheUnit = ()=> {
  
  if(updateUnit.length>0)
  {
    const confirm = window.confirm("Are you sure you want to delete the unit ?");
  
    if(confirm)
    {
      const url = constants.deleteUnit(updateUnit);

      console.log(url);
    
      processAPI(url,"Delete","unit");
    }
    else{
      handleResetUnit();
    }
    
  }
  
};

const editCategory = () => {
setUpdateCategory(selectedCategory);
setIsEditDisabledCategory(false);
}

const categoryUpdateChange = (e) => {
setUpdateCategory(e.target.value);
}

const categoryInputChange = (e) => {
  setNewCategory(e.target.value);
}

const createCategory = () => {
  if(newCategory.length>0)
  {
    const url = constants.createCategory(newCategory);
    console.log("New category url - "+url);
  
    processAPI(url,"Post","category"); 
    
  }
}

const updateTheCategory = () => {

  if(updateCategory.length>0)
  {
    const url = constants.updateCategory(selectedCategory,updateCategory);

    console.log(url);
    
    processAPI(url,"Post","category");
     
  }
}

const DeleteTheCategory = () => {

  if(updateCategory.length>0)
  {
    const confirm = window.confirm("Are you sure you want to delete the category ?");
  
    if(confirm)
    {
      const url = constants.deleteCategory(updateCategory);

      console.log(url);
    
      processAPI(url,"Delete","category");
    }
    else{
      handleResetCategories();
    }

}
}


return(  
  <div>
    {isLoading ? (
     <Loading />)
    :
    (
    <>    <div className={myStyle.mainBox}> 
  <h1>Units & Categories</h1>
  </div>
  <div className={myStyle.UnitBox}>
    <label htmlFor="UnitsDropdown">All Units</label>
    <select
    id="UnitsDropdown"
    className={myStyle.Unitsdropdown}
    value={selectedUnit}
    onChange={handleUnitsChange}
    >
       <option value="" className={myStyle.optionValue}>Select a Unit</option>
        {units.map((item) => (
          <option key={item.unitName} value={item.unitName}>
            {item.unitName}
          </option>
        ))}

    </select>
    <button onClick={editUnit} class="bg-btn-lightBlue hover:bg-blue-700 text-white font-bold py-1 px-6 rounded-full " >Edit</button> 
  </div>
  <div className={myStyle.newUnit}>
  <label htmlFor="unit-new">New Unit</label>
    <input className={myStyle.newUnitTextBox} onChange={unitInputChange} type="text" value={newUnit} name="unit-new" />
    <button onClick={createUnit} class="bg-btn-darkBlue hover:bg-green-700 text-white font-bold py-1 px-6 rounded-full " >Create Unit</button> 
  </div>

  <div className={myStyle.newUnit}>
  <label htmlFor="unit-new">Edit Unit</label>
    <input className={myStyle.updateUnitTextBox} disabled={isEditDisabledUnit} onChange={unitUpdateChange} type="text" value={updateUnit} name="unit-update" />
    <button onClick={updateTheUnit} class="bg-btn-firozi hover:bg-purple-700 text-white-bold font-bold py-1 px-6 rounded-full "  >Update</button> 
    <button onClick={DeleteTheUnit}  style={{marginLeft : "1%"}} class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-6 rounded-full " >Delete</button> 
  </div>

  
  <div className={myStyle.CategoriesBox}>
    <label htmlFor="UnitsDropdown">All Categories</label>
    <select
    id="CategoriesDropdown"
    className={myStyle.Categoriesdropdown}
    value={selectedCategory}
    onChange={handleCategoriesChange}
    >
       <option value="" className={myStyle.optionValue}>Select a Category</option>
        {categories.map((item) => (
          <option key={item.categoryName} value={item.categoryName}>
            {item.categoryName}
          </option>
        ))}

    </select>
    <button onClick={editCategory} class="bg-btn-lightBlue hover:bg-blue-700 text-white font-bold py-1 px-6 rounded-full " >Edit</button> 
  </div>
  <div className={myStyle.newCategory}>
  <label htmlFor="unit-new">New Category</label>
    <input className={myStyle.newCategoryTextBox} onChange={categoryInputChange} type="text" value={newCategory} name="category-new" />
    <button onClick={createCategory} class="bg-btn-darkBlue hover:bg-green-700 text-white font-bold py-1 px-6 rounded-full " >Create Category</button> 
  </div>

  <div className={myStyle.newCategory}>
  <label htmlFor="category-new">Edit Category</label>
    <input className={myStyle.updateCategoryTextBox} disabled={isEditDisabledCategory} onChange={categoryUpdateChange} type="text" value={updateCategory} name="category-update" />
    <button onClick={updateTheCategory} class="bg-btn-firozi hover:bg-purple-700 text-white-bold font-bold py-1 px-6 rounded-full "  >Update</button> 
    <button onClick={DeleteTheCategory}  style={{marginLeft : "1%"}} class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-6 rounded-full " >Delete</button> 
  </div>
  </>

  )

}
</div>
  
)

}

export default Units;