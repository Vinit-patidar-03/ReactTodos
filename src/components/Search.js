import React, { useEffect, useState } from "react";
import Item from "./Item";

const Search = () => {

  //to get data from localstrorage
  const getLocalData = () => {
    const List = localStorage.getItem("todos");

    if (List) {
      return JSON.parse(List);
    } else {
      return [];
    }
  };

  //defining states for doing different things
  const [content, setContent] = useState("");
  const [items, setItems] = useState(getLocalData);
  const [edit, setEdit] = useState("");
  const [button, setbutton] = useState(false);

  //to delete Items
  const deleteItem = (id) => {
    setItems(
      items.filter((elem) => {
        return elem.id !== id;
      })
    );
  };

  //to add Items
  const addItem = (e) => {
    if (!content) {
      console.log("please input data");
    } else if (content && button) {
      setItems(
      items.map((e) => {
        if (e.id === edit) {
          return { ...e, name: content };
        }
        return e;
      }));
      setContent("");
      setbutton(false);
    } else {
      let myContent = {
        id: new Date().getTime().toString(),
        name: content,
      }
      setItems([...items, myContent]);
      setContent("");
    }
  };

  //to edit Items
  const editItem = (id) => {
    let toEdit = items.find((elem) => {
      return elem.id === id;
    });
    setContent(toEdit.name);
    setEdit(id);
    setbutton(true);
  };

  //Saving data in localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <div className="container-fluid d-flex justify-content-center align-items-center my-5">
          <input
            className="form-control"
            type="search"
            value={content}
            placeholder="Search"
            aria-label="Search"
            style={{backgroundColor:'#393E46',color:'white'}}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          {button ? (
            <i className="fa-solid fa-pen-to-square fa-xl " style={{color:'white',cursor:'pointer',position:'absolute',right:'20px'}} onClick={addItem}></i>
          ) : (
            <i className="fa-solid fa-plus fa-xl" style={{color:'white',cursor:'pointer',position:'absolute',right:'20px'}} onClick={addItem}></i>
          )}
          </div>
        <div className="d-flex w-75 justify-content-center flex-wrap">
          {items.map((elem) => {
            return (
              <Item
                content={elem.name}
                key={elem.id}
                deleteItem={deleteItem}
                id={elem.id}
                editItem={editItem}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
