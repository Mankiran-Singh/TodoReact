import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash,faCancel, faCheckSquare, faCross, faPager, faPenClip, faSquare } from '@fortawesome/free-solid-svg-icons';
import todoArray from '../array';
function Todo(props) {
    const handleEdit = (index,edit) => {
        props.onEdit(index,edit);
      };
    
      const handleDelete = (index) => {
        props.onDelete(index);
      };
    return (
        <div className="container">
        <h1>Tasks</h1>
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {props.props.map((item, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.newTodo}</td>
                <td>{item.dueDate}</td>
                <td>{item.status}</td>
                <td>
                    <button className="btn btn-sm btn-info mr-2" onClick={() => handleEdit(index,true)}>
                    <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}
export default Todo;