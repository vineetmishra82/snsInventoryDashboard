import React, { useEffect, useState,useRef } from "react";
import styles from "./TnP.module.css";
import * as constants from "../../assets/Constants";
import uploadFile from "../../assets/images/uploadFile.png"
import excel from "../../assets/images/excel.png";
import * as XLSX from 'xlsx';
import Loading from "../IsLoading/isLoading";

function TnP() {

    //For create T&P section
const[newTnP,setNewTnP] = useState('');
const[selectedCategory,setSelectedCategory] = useState('');
const[categories,setCategories] = useState([]);
const[units,setUnits] = useState([]);
const[selectedUnit,setSelectedUnit] = useState('');
const[isLoading,setIsLoading] = useState(false);
const[TnPQuantity,setTnPQuantity] = useState(0);
const[tnpRemarks,setTnPRemarks] = useState('');
const[uploadFileText,setUploadFileText] = useState("Upload File");
const[uploadFileData,setUploadFileData] = useState([]);
const[uploadEditFileText,setUploadEditFileText] = useState("Upload Edit file")

//For Edit % delete T&P section

const[tnpList,setTnpList] = useState([]);
const[selectedTnPID,setSelectedTnPID] = useState('');
const[selectedTnPName,setSelectedTnPName] = useState('');
const[editCategory,setEditCategory] = useState('');
const[editUnit,setEditUnit] = useState('');
const[editQuantity,setEditQuantity] = useState('');
const[editRemarks,setEditRemarks] = useState('');
const[TnpJson,setTnpJson] = useState([]);
const[isEditFile,setIsEditfile] = useState(false);
const[editUploadFileData,setEditUploadFileData] = useState([]);


const fileInputRef = useRef(null);
const fileInputRef1 = useRef(null);

var tnpUploaded = 0,
unitsCreated = 0,
categoriesCreated = 0,
tnpEdited = 0,
tnpDeleted = 0;


useEffect(() => {
    getCategories();
    getUnits();
    getTnPList();
  
  },[]);

  useEffect(() => {
    GetEditValues();
  }, [selectedTnPID]);
 

const getTnPList = async() => {
 
    try{ 
        setIsLoading(true);
        console.log(constants.getTnP);
          await fetch(constants.getTnP,{
            method : "Get"
          })
                 .then((response) => {
                    return response.json();
                 })
                 .then((myJson) => {
                     setTnpList(myJson);
                    
                     setIsLoading(false);
                   
                 });
         } catch (e) {
             console.log(e);
         }
  };

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
                     
                     setUnits(myJson);
                     setIsLoading(false);
                 });
         } catch (e) {
             console.log(e);
         }
  };

const getCategories = () => {
    try{ 
     console.log(constants.getCategories);
    fetch(constants.getCategories)
             .then((response) => {
                  console.log(response);
                 return response.json();
             })
             .then((myJson) => {
                setCategories(myJson);
             });
     } catch (e) {
         console.log(e);
     }
  };

const handleTnPInput =(e) =>{
setNewTnP(e.target.value);
}

const handleCategoriesChange =(e) => {
setSelectedCategory(e.target.value)
}

const handleUnitsChange = (e) =>{
setSelectedUnit(e.target.value)
console.log(selectedUnit);
}

const handleTnPQty = (e) =>{
setTnPQuantity(e.target.value);
}

const handleTnPRemarks = (e) => {
    setTnPRemarks(e.target.value);
}

const uploadFileDialogue = () => {
 
     fileInputRef.current.click();
}

const uploadEditFileDialogue = () =>{
  fileInputRef1.current.click();
}

const handleFileChange =(e) => {
    console.log("in upload file");
    setUploadFileData([]);
    let reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    const name = (e.target.files[0]).name;
    reader.onload = (e) =>{
        setUploadFileText(name+ " selected");
        const data  = e.target.result;
        const workbook = XLSX.read(data,{type : 'binary'});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setUploadFileData(parsedData);
        console.log(uploadFileData);
   };
   fileInputRef.current.value = '';
   reader = null;
   

   console.log(uploadFileData+"  console.log(uploadFileData);");
}

const excelExportData = [
[
    "TnPName" ,
    "Category"  ,
    "Unit"   ,
    "CurrentQuantity"  ,
    "Remarks"  ,
],
["Sample Name","Sample Category","Sample Unit","1000","Remove this entry before saving as this is just a sample "]

]

const excelDownloadFileDialogue = async() => {

      // Create a new Excel workbook
      const workbook = XLSX.utils.book_new();
  
      // Add a worksheet to the workbook
      const worksheet = XLSX.utils.aoa_to_sheet(excelExportData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'T&P');
 
      XLSX.writeFile(workbook,"T&P_Upload_File.xlsx");  
}

const createNewUnit = async() => {

      var isOk = true;

    //First checking if its a single entry

    if(newTnP.length>0 && selectedCategory.length>0 && selectedUnit.length>0 &&
        TnPQuantity>=0)
        {
            processAPI(constants.createNewTnP(newTnP,selectedCategory,selectedUnit,
                TnPQuantity,tnpRemarks),"Post","1");
        }
    else if(uploadFileText!=="Upload File"){

      //Checking file consistency

      console.log("uploadfile length is "+uploadFileData.length);

      if(uploadFileData.length<=0)
      {
        alert("Its a blank file...");
        setUploadFileData([]);
        handleResetTnP();

      }
      else{
        
          const keys = Object.keys(uploadFileData[0]);
          
          if(keys[0]!=="TnPName" || keys[1]!=="Category"||keys[2]!=="Unit"||keys[3]!=="CurrentQuantity"||keys[4]!=="Remarks")
          {
            setUploadFileData([]);
            handleResetTnP();
            alert("Invalid file format...");
            isOk = false;
          }

        }
    }

    if(uploadFileData.length>0 && isOk)
    {
        tnpUploaded = 0;
        unitsCreated = 0;
        categoriesCreated = 0;

        var errorLine = "";
       
        for(var i = 0;i<uploadFileData.length;i++)
        {
            var item = uploadFileData[i];

            try{

              if(item.TnPName.length>0 && item.Category.length>0 && item.Unit.length>0 &&
                item.CurrentQuantity>=0)
                {
                  await processAPI(constants.createNewTnP(item.TnPName,item.Category,item.Unit,
                    item.CurrentQuantity,item.Remarks),"Post","2");
                }
                else{
                  errorLine = errorLine.length<=0 ? "Error in lines " : errorLine;

                  errorLine+= (i+1) + ",";
                }
            }catch{
              console.log("Error in line "+(i+1));
              errorLine = errorLine.length<=0 ? "Error in lines " : errorLine;

              errorLine+= (i + 1)+",";
            }
      
            
        }
        handleResetTnP();
        getCategories();
        getUnits();
        getTnPList();
        setUploadFileData([]);


        setTimeout(() =>{

            var alertText = "Total new T&P created : "+tnpUploaded+"\n\nTotal new Categories created : "+categoriesCreated+
            "\n\nTotal new Units created : "+unitsCreated;

            if(errorLine.length>0)
            {
              alertText+=  "\n\n"+errorLine.substring(0,errorLine.length-1);
            }

            alert(alertText);
        },100);

        isOk = true;
       

    }


}

const processAPI = async(url,methodName,type) =>{

    console.log("url is"+url);
    var responseValue ="";
    setIsLoading(true);
    await fetch(url, {
      method : methodName,
      
         })
    .then((response1) => {
       return response1.text();
        })
    .then((response1)=> {
      console.log("server response "+response1);
      responseValue = response1;
    })
    .then(()  => {
      console.log("response is "+responseValue);
      setIsLoading(false);
      const values = responseValue.split("_");  
      handleResetTnP();
      getTnPList();
      if(values[0]==="1" && type==="1")
      {
        alert("T&P created sucessfully !");
      }
      else if(values[0]==="-1" && type==="1")
      {
        alert("T&P already exists...");
      }
      else if(values[0]==="0" && type==="1")
      {
        alert("Could not create T&P...try again ! ");
      }
      else if(type==="2")
      {
        if(values[0]==="1")
        {
            tnpUploaded++;
        }

        if(values[1]==="1")
        {
            categoriesCreated++;
        }
        if(values[2]==="1")
        {
            unitsCreated++;
        }
      }  
      else if(values[0]==="1" && type==="3")
      {
        alert("T&P updated sucessfully !");
      }
      else if(values[0]==="-1" && type==="3")
      {
        alert("T&P could not be updated...try again !");
      }   
      else if(values[0]==="1" && type==="4")
      {
        alert("T&P deleted sucessfully !");
      }
      else if(values[0]==="-1" && type==="4")
      {
        alert("Could not delete T&P...try again !");
      }
      else if(values[0]==="1" && type==="5")
      {
       tnpDeleted++;
      }  
      else if(values[0]==="1" && type==="6")
      {
       tnpEdited++;
      }                 

    })
    .catch((error) => {
        console.error("API Error:", error);
      });
  
  }

  const handleResetTnP =() =>{
    setNewTnP('');
    setSelectedCategory('');
    setSelectedUnit('');
    setTnPQuantity(0);
    setTnPRemarks(0);
    setUploadFileText("Upload File");
}

const setEditValuesFromName = (e) => {
  setSelectedTnPID(e.target.value);
  setSelectedTnPName(e.target.value);
  GetEditValues();
 
}

const setEditValuesFromId = (e) => {
 
  setSelectedTnPID(e.target.value);
  setSelectedTnPName(e.target.value);
  GetEditValues();
 
}

const GetEditValues = () => {
  
  const values = selectedTnPID.split('_');
  const tnp = tnpList.find((item) =>{
    return item.tnpId=== values[0];
  })

  if (tnp) {
    setEditCategory(tnp.category.categoryName);
    setEditUnit(tnp.unit.unitName);
    setEditQuantity(tnp.currentQuantity);
    setEditRemarks(tnp.remarks);
  }


}

const handleEditCategoryChange = (e) =>{
  console.log("here in editcat value - "+e.target.value);
  setEditCategory(e.target.value);
}

const getCurrentTnp = () => {

  const values = selectedTnPID.split("_");

  console.log(values);
  
  const tnp = tnpList.find((item) =>{
    return item.tnpId===values[0];
  });

  return tnp;

}

const UpdateTnP = async() =>{

  const tnp = getCurrentTnp();
  var isOk = true;

  if(tnp)
  {
    if(tnp.category.categoryName!==editCategory || tnp.unit.unitName!==editUnit
      || tnp.remarks!==editRemarks)
      {
        const url = constants.updateTnP(tnp.tnpId,editCategory,editUnit,editRemarks);
  
        console.log(url);
        
        processAPI(url,"Post","3");
       
      }
      else{
        console.log("Nothing to update");
      } 
  }

  if(uploadEditFileText!=="Upload Edit file"){

    //Checking file consistency

    console.log("uploadfile length is "+uploadEditFileText.length);

    if(uploadEditFileText.length<=0)
    {
      alert("Its a blank file...");
      setEditUploadFileData([]);
      setUploadEditFileText("Upload Edit file");

    }
    else{
      
        const keys = Object.keys(editUploadFileData[0]);

        console.log("keys is "+keys);
        
        if(keys[0]!=="T&P ID" || keys[1]!=="T&P Name"||keys[2]!=="Category"||keys[3]!=="Quantity"||keys[4]!=="Unit"
        || keys[5]!=="Remarks" || keys[6]!=="New Category"||keys[7]!=="New Unit"||keys[8]!=="New Remarks"||keys[9]!=="To be Deleted")
        {
        
          alert("Invalid file format...");
          isOk = false;
        }

      }
  }

  if(editUploadFileData.length>0 && isOk)
  {
      tnpEdited = 0;
      tnpDeleted = 0;

      var errorLine = "";
     
      for(var i = 0;i<editUploadFileData.length;i++)
      {
          var item = editUploadFileData[i];           
          
          console.log("item[Remarks] is "+item["Remarks"]);
        
          try{
            //checking if id is present
            if(item["T&P ID"].length>0)
              { 

                const editTnp = tnpList.find((itemHere) =>{
                  return itemHere.tnpId===item["T&P ID"];
                });

                if(editTnp)
                {
                //Checking if marked for delete
                if(item["To be Deleted"].length>0 && (item["To be Deleted"].toLowerCase()==="Yes".toLowerCase()
                || item["To be Deleted"].toLowerCase()==="Y".toLowerCase()))
              {
                console.log("in delete TnP");
                const url = constants.deleteTnP(item["T&P ID"]);

                console.log(url);
            
                processAPI(url,"Delete","5");
              }
              else if(item["New Category"].length>0 || item["New Unit"].length>0 || item["Remarks"].length>0)
              {
                const newCategory = item["New Category"]==="" ? editTnp.category.categoryName : item["New Category"] ;
                const newUnit = item["New Unit"]==="" ? editTnp.unit.unitName : item["New Unit"];
                console.log("new category is "+newCategory+"  new unit is "+newUnit);

                if(newCategory!==editTnp.category.categoryName || newUnit!==editTnp.unit.unitName ||
                  editTnp.remarks!==item["New Remarks"])
                  {
                    await processAPI(constants.updateTnP(editTnp.tnpId,newCategory,newUnit,item["New Remarks"]),"Post","6");
                  }
               
              }                
              }
              else{
                console.log("No line found for "+item["T&P ID"]);
              }
                } 

             
             
          }catch{
            console.log("Error in line "+(i+1));
            errorLine = errorLine.length<=0 ? "Error in lines " : errorLine;

            errorLine+= (i + 1)+",";
          }
    
          
      }
      
      getTnPList();
      

      setTimeout(() =>{

          var alertText = "Total T&P Edited : "+tnpEdited+"\n\nTotal T&P deleted : "+tnpDeleted;

          if(errorLine.length>0)
          {
            alertText+=  "\n\n"+errorLine.substring(0,errorLine.length-1);
          }

          alert(alertText);
      },100);

      isOk = true;
     
      setEditUploadFileData([]);
      setUploadEditFileText("Upload Edit file");
    
  }

  getCategories();
  getUnits();
  getTnPList();

}

const DeleteTnP =() =>{

  const tnp = getCurrentTnp();

  if(selectedTnPID.length>0 && tnp)
  {
    const confirm = window.confirm("Are you sure you want to delete the T&P ?");
  
    if(confirm)
    {
     
      const url = constants.deleteTnP(tnp.tnpId);

      console.log(url);
    
      processAPI(url,"Delete","4");

      
    }

}
  
}

const handleEditFileChange = (e) =>{

  console.log("in upload file");
  setEditUploadFileData([]);
  let reader = new FileReader();
  reader.readAsBinaryString(e.target.files[0]);
  const name = (e.target.files[0]).name;
  reader.onload = (e) =>{
      setUploadEditFileText(name+ " selected");
      const data  = e.target.result;
      const workbook = XLSX.read(data,{type : 'binary'});
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setEditUploadFileData(parsedData);
      console.log(uploadFileData);
 };
 fileInputRef1.current.value = '';
 reader = null;
 

 console.log(uploadFileData+"  console.log(uploadFileData);");
}


const excelEditDownloadFileDialogue = () => {

  setIsEditfile(true);
  setIsLoading(true);
  setTnpJson([]);

  // Creating TNP JSON
  tnpList.forEach((item) => {
    const tnp = {
      'T&P ID': item.tnpId,
      'T&P Name': item.tnpName,
      'Category': item.category.categoryName,
      'Quantity': item.currentQuantity,
      'Unit': item.unit.unitName,
      'Remarks': item.remarks,
      'New Category' : '',
      'New Unit' : '',
      'New Remarks' : '',
      'To be deleted' : 'No',

    };

    setTnpJson((prevJson) => [...prevJson, tnp]);
  });

  setIsLoading(false);
 

}

useEffect(() => {
  if (TnpJson.length > 0 && !isLoading) {
    // Create a new Excel workbook
    const workbook = XLSX.utils.book_new();

    // Add a worksheet to the workbook
    const worksheet = XLSX.utils.json_to_sheet(TnpJson);
      
    const fileName = isEditFile ? 'Edit_T&P_Format.xlsx' : 'T&P_MasterList.xlsx';

    const wscols = [{ wpx: 120 }, { wpx: 120 }, { wpx: 120 }, { wpx: 80 }, { wpx: 80 }, { wpx: 120 }, { wpx: 120 }, { wpx: 80 }, { wpx: 80 }, { wpx: 120 }];
    worksheet['!cols'] = wscols;
    

    if(isEditFile)
    {
    
      worksheet['J1'] = { v: 'To be Deleted', t: 's' }; // Optional: Set a header for column J
      worksheet['J2'] = { v: 'No', t: 's' }; // Optional: Set a default value

      
      // Create data validation for "Yes" or "No" in column J
      worksheet['!dataValidation'] = [
        {
          Range: 'J2:J1048576', // Apply to all rows in column J
          formula1: "Yes,No",
        },
      ];
    
        setIsEditfile(false);
    }
    XLSX.utils.book_append_sheet(workbook, worksheet, 'T&P');
    XLSX.writeFile(workbook, fileName);
    
  }
}, [TnpJson, isLoading]);

const DownLoadMasterFileDialogue = () =>{
  setIsLoading(true);
  setTnpJson([]);

  // Creating TNP JSON
  tnpList.forEach((item) => {
    const tnp = {
      'T&P ID': item.tnpId,
      'T&P Name': item.tnpName,
      'Category': item.category.categoryName,
      'Quantity': item.currentQuantity,
      'Unit': item.unit.unitName,
      'Remarks': item.remarks,
    };

    setTnpJson((prevJson) => [...prevJson, tnp]);
  });

  setIsLoading(false);
}

return(
    <div>
    {isLoading ? (
      <Loading />)
    :
    (
    <>
    <div className={styles.headerBox}>
    <h1>T&P</h1>
    </div>
    <div className={styles.createTnPBox}>
        <h1 className={styles.headers}>Create New T&P</h1>
     </div>
    <div className={styles.TnPCreateRow}>
    <label htmlFor="TnPName">Name of T&P</label>
    <input type="text" name="TnPName" className={styles.InputTextBox} onChange={handleTnPInput}/>
    
    <label className={styles.categoryLabel} htmlFor="categoryDropdown">Choose Category</label>
   <select
   value={selectedCategory}
   onChange={handleCategoriesChange}
   id="categoryDropdown"
   className={styles.categoryDropdown}
   >
    <option value="" className={styles.optionValue}>Select a Category</option>
        {categories.map((item) => (
          <option key={item.categoryName} value={item.categoryName}>
            {item.categoryName}
          </option>
        ))}
   </select>

   <label className={styles.categoryLabel} htmlFor="categoryDropdown">Choose Unit</label>
   <select
   value={selectedUnit}
   onChange={handleUnitsChange}
   id="unitsDropdown"
   className={styles.categoryDropdown}
   >
    <option value="" className={styles.optionValue}>Select a Category</option>
        {units.map((item) => (
          <option key={item.unitName} value={item.unitName}>
            {item.unitName}
          </option>
        ))}
   </select>

   <label htmlFor="TnPQty">Current Quantity</label>
    <input type="number" name="TnPQty" className={styles.InputTextBox} value={TnPQuantity} onChange={handleTnPQty}/>
    
    </div>

    <div className={styles.TnPSubmitRow}>
    <label htmlFor="TnPRemarks">Remarks</label>
    <input type="text" name="TnPRemarks" className={styles.InputTextBox} onChange={handleTnPRemarks}/>

    <button style={{marginLeft : '1%'}} class="bg-btn-firozi hover:bg-purple-700 text-white-bold font-bold py-1 px-6 rounded-full " onClick={createNewUnit}>Submit</button>        
    <img className={styles.uploadIcon} name="uploadIcon" onClick={uploadFileDialogue} alt="upload icon" src={uploadFile} />        
    <text className={styles.uploadFileText} onClick={uploadFileDialogue}>{uploadFileText}</text>
    <input type="file" accept=".xlsx,.xls" ref={fileInputRef} className={styles.inputFile}
        onChange={handleFileChange} />

<img className={styles.uploadIcon} name="uploadIcon" onClick={uploadFileDialogue} alt="upload icon" src={excel} />        
    <text className={styles.ExcelFileText} onClick={excelDownloadFileDialogue}>Download Excel Format</text>
  
    </div>

{ <div className={styles.editBox}>
<div className={styles.createTnPBox}>
        <h1 className={styles.headers1}>Edit T&P</h1>
     </div>
    <div className={styles.TnPCreateRow}>
    <label htmlFor="TnPDropdown">Select T&P</label>
    <select
   value={selectedTnPName}
   onChange={setEditValuesFromName}
   id="TnPDropdown"
   className={styles.categoryDropdown}
   >
    <option value="" className={styles.optionValue}>Select a T&P</option>
        {tnpList.map((item) => (
          <option key={`${item.tnpId}_${item.tnpName}`} value={`${item.tnpId}_${item.tnpName}`}>
            {item.tnpName}
          </option>
        ))}
   </select>

   <label htmlFor="TnPIDDropdown">T&P ID</label>
    <select
   value={selectedTnPID}
   onChange={setEditValuesFromId}
   id="TnPIDDropdown"
   className={styles.categoryDropdown}
   >
    <option value="" className={styles.optionValue}>Select T&P ID</option>
        {tnpList.map((item) => (
          <option key={`${item.tnpId}_${item.tnpName}`} value={`${item.tnpId}_${item.tnpName}`}>
            {item.tnpId}
          </option>
        ))}
   </select>
    
   <label className={styles.categoryLabel} htmlFor="categoryDropdown">Category</label>
   <select
   value={editCategory}
   onChange={handleEditCategoryChange}
   id="categoryDropdown"
   className={styles.categoryDropdown}
   >
    <option value="" className={styles.optionValue}>Categories</option>
        {categories.map((item) => (
          <option key={item.categoryName} value={item.categoryName}>
          {item.categoryName}
          </option>
        ))}
   </select>

   <label className={styles.categoryLabel} htmlFor="categoryDropdown">Unit</label>
   <select
   value={editUnit}
   onChange={(e) => setEditUnit(e.target.value)}
   id="unitsDropdown"
   className={styles.categoryDropdown}
   >
    <option value="" className={styles.optionValue}>Units</option>
        {units.map((item) => (
          <option key={item.unitName} value={item.unitName}>
            {item.unitName}
          </option>
        ))}
   </select>  
    
    </div>

    <div className={styles.TnPSubmitRow}>
    <label htmlFor="TnpEditQty">Current Quantity</label>
   <text name="TnpEditQty" className={styles.QtyTxt} >{editQuantity}</text>     

    <label htmlFor="TnPRemarks">Remarks</label>
    <input type="text" name="TnPRemarks" className={styles.InputTextBox} value={editRemarks} 
    onChange={(e)=> setEditRemarks(e.target.value)}/>

    <button style={{marginLeft : '1%'}} class="bg-btn-lightBlue hover:bg-blue-700 text-white-bold font-bold py-1 px-6 rounded-full " onClick={UpdateTnP}>Update</button> 
    <button style={{marginLeft : '1%'}} class="bg-red-500 hover:bg-red-700 text-white-bold font-bold py-1 px-6 rounded-full " onClick={DeleteTnP}>Delete</button>        
   
    <img className={styles.uploadIcon} name="uploadIcon" onClick={uploadFileDialogue} alt="uploadicon" src={uploadFile} />        
    <text className={styles.uploadFileText} onClick={uploadEditFileDialogue}>{uploadEditFileText}</text>
    <input type="file" accept=".xlsx,.xls" ref={fileInputRef1} className={styles.inputFile}
        onChange={handleEditFileChange} />

<img className={styles.uploadIcon} name="excelIcon" onClick={excelEditDownloadFileDialogue} alt="excel icon" src={excel} />        
    <text className={styles.ExcelFileText} onClick={excelEditDownloadFileDialogue}>Download Edit File Format</text>

    </div>
  </div>     }

  { <div className={styles.downloadMasterButton}>
  <img className={styles.uploadIcon} name="uploadIcon" onClick={DownLoadMasterFileDialogue} alt="upload icon" src={excel} />        
    <text className={styles.ExcelFileText} onClick={DownLoadMasterFileDialogue}>Download T&P MasterList</text>  

  </div> }

    </>
)}
</div>
  
)

}


export default TnP;