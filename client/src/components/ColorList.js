import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

// const addColor = {
//     color: "",
//     code: {
//       hex: ""
//     },
//     id: Date.now()
//   }


const ColorList = ({ colors, updateColors, props }) => {
  console.log(props);
  

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  //const [newColor, setNewColor] = useState(addColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    axiosWithAuth()
    .put(`colors/${colorToEdit.id}`, colorToEdit)
    .then(res =>{
      //console.log(res.data);
      setColorToEdit(res.data)
      setEditing(false);
      props.history.push(`/protected`) 
    })
    .catch(err => console.log(err))
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`colors/${color.id}`)
    .then(res => {
      setColorToEdit(res.data)
      props.history.push(`/protected`);
    })
    .catch(err=> console.log(err))
  };

  // const addColor = e => {
  //   axiosWithAuth()
  //   .post(`colors/`, newColor)
  //   .then(res =>{
  //     console.log(res.data);
  //     setNewColor({colors: [res.data,
  //     res.data.payload]});
  //     props.history.push(`/protected`);
  //   })
  //   .catch(err=> console.log(err));
  // }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <div className="buttom-row">

        <button>Add New color </button>

      </div>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
