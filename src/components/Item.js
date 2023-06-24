import React from "react";

const Item = (props) => {
  return (
    <><div className="d-flex justify-content-center my-2 mx-3">
      <div className="card" style={{backgroundColor:'#393E46',color:'white'}}>
        <div className="card-body">
          <p className="card-title">{props.content}</p>
          <i className="fa-solid fa-pen-to-square mx-2" style={{cursor:"pointer"}} onClick={()=>{props.editItem(props.id)}}></i>
          <i className="fa-solid fa-trash" style={{cursor:"pointer"}} onClick={()=>
            {
              props.deleteItem(props.id)
            }
          }></i>
        </div>
      </div>
      </div>
    </>
  );
};

export default Item;
