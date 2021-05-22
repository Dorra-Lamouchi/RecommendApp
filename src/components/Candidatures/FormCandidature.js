import React from 'react'

const FormCandidature = (props) => {
    return (
        <div>
            <h1>Ici Le Formulaire De Candidature avec id= {props.match.params.id}</h1>
        </div>
    )
}

export default FormCandidature
