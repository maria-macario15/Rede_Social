function postar(){

    return(
    
           <div className='container postar col-3 te' onSubmit={handleSubmit}>
<input className="container te mn" type="file" onChange={handleFileChange} />
<input className="form-control form-control-sm " type="text" aria-label=".form-control-sm example" />

<button className="btn btn-outline-light" type="submit">Postar</button> 
        </div>
    )
}