import React, { useState, useEffect } from 'react'

function Testaffichage(props) {
  
    return (
        <div >
    <h2>id post : {props.match.params.id}</h2>
           
        </div>
    )
}

export default Testaffichage;