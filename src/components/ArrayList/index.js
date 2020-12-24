import React from 'react'

export const ArrayList = ({tasks, deleteFirestore, editData}) => {
  return (
    <React.Fragment>
      {
        tasks.map(task => (
          <div key={task.id}>
            <div className="row">
              <div className="col-md-6">
                <li className="list-group-item">{task.name}</li>
              </div>
              {/* Delete */}  
              <div className="col-md-3">
                <button className="btn btn-danger" onClick={() => deleteFirestore(task.id)}>
                  Delete
                </button>    
              </div>
              {/* Edit */}
              <div className="col-md-3">
                <button className="btn btn-warning" onClick={() => editData(task)}>
                  Edit
                </button>    
              </div>                
            </div>
          </div>
        ))
      }
    </React.Fragment>
  )
}
