import React from 'react'

export const Form = ({ register, handleSubmit, errors, reset, edit, field }) => {    
  return (
    <form onSubmit={handleSubmit} onReset={reset}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Name task</label>
        <input type="text" defaultValue={field.name || ''} className="form-control" name="name" placeholder="task" ref={register({ required: true })} />
        {errors.name && <span>This field is required</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Fecha</label>
        <input type="date" defaultValue={field.date || ''} className="form-control" name="date" ref={register({ required: true })} />
        {errors.date && <span>This field is required</span>}
      </div>
      <button type="submit" className={edit ? 'btn btn-warning' : 'btn btn-primary'}>
        {edit ? 'Edit' : 'Send'}
      </button>
    </form>
  )
}
