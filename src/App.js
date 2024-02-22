import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Todo from './todo-list/todo-list'
import todoArray from './array';

function App() {
  const [formData, setFormData] = useState({
    newTodo: '',
    dueDate: '',
    status: ''
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [edit, setEdit] = useState(false);
  const [todoArray, setTodoArray] = useState([]);
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (edit && submittedData !== null) {
      const index = todoArray.findIndex((todo) => todo === submittedData);
      if (index !== -1) {
        const updatedArray = [...todoArray];
        updatedArray[index] = formData;
        setTodoArray(updatedArray);
      }
      setEdit(false); // Reset edit state
    } else {
      setTodoArray([...todoArray, formData]);
    }
    setSubmittedData(formData);
  };

  const handleClear = () => {
    setFormData({
      newTodo: '',
      dueDate: '',
      status: ''
    });
  };

  useEffect(() => {
    if (submittedData !== null) {
      setFormData({
        newTodo: '',
        dueDate: '',
        status: ''
      });
    }
  }, [submittedData]);

  const handleEdit = (index) => {
    setFormData({
      newTodo: todoArray[index].newTodo,
      dueDate: todoArray[index].dueDate,
      status: todoArray[index].status
    });
    setEdit(true); 
  };


  const handleDelete = (index) => {
    const updatedArray = [...todoArray];
    updatedArray.splice(index, 1);
    setTodoArray(updatedArray);
  };

  return (
    <div className="App">
      <div className="container m-5 p-2 rounded mx-auto bg-light shadow">
        <div className="row m-1 p-4">
          <div className="col">
            <div className="p-1 h1 text-primary text-center mx-auto display-inline-block">
              <FontAwesomeIcon icon={faCheckSquare} />
              <u>My Todo-s</u>
            </div>
          </div>
        </div>
        <div className="row m-1 p-3">
          <div className="col col-11 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                <div className="col">
                  <input
                    type="text"
                    name="newTodo"
                    value={formData.newTodo}
                    onChange={handleInputChange}
                    className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                    placeholder="Add new .."
                    required
                  />
                </div>
                <div className="col-auto m-0 px-2 d-flex align-items-center">
                  <label className="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">Due date not set</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="my-2 px-1 text-primary btn due-date-button cursor-pointer"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Set a Due date"
                    required
                  />
                </div>
                <div className="col-auto m-0 px-2 d-flex align-items-center">
                  <label className="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">Due date not set</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="my-2 px-1 text-primary btn cursor-pointer"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Set Status"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Open">Open</option>
                    <option value="Ready for Testing">Ready for Testing</option>
                    <option value="In Testing">In Testing</option>
                    <option value="Testing Complete">Testing Complete</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div className="col-auto px-0 mx-0 mr-2">
                <button type="submit" className="btn btn-primary">
                    {edit ? 'Update' : 'Add'}
                </button>
                </div>
                <div className="col-auto px-0 mx-0 mr-2">
                  <button type="button" className="btn btn-warning" onClick={handleClear}>Clear</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {submittedData !== null && <Todo props={todoArray} onEdit={handleEdit} onDelete={handleDelete}/>}
    </div>
  );
}

export default App;
