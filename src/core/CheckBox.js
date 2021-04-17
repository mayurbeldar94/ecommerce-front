import React,{useEffect,useState} from 'react'

const CheckBox = ({categories,handleFilters}) => {
    const [checked,setChecked] =useState([])

    const handleToggle = (c) => () => {
        //Returns the index of the first occurrence of a value in an array, or -1 if it is not present.
        const curruntCategoryId = checked.indexOf(c)
        const newCheckedCategoryId = [...checked]
        //if curruntly checked was not in checked state > push
        //else take off
        if(curruntCategoryId === -1){
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(newCheckedCategoryId, 1)
        }
       // console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }

    return categories.map((c,i) => (
        <li key={i} className ='list-unstyle'>
            <input onChange={handleToggle(c._id)} 
            value ={checked.indexOf(c._id === -1)}
             type='checkbox' className='form-check-input'/>
            <label className='form-check-label'>{c.name}</label>
        </li>
    ))
}

export default CheckBox