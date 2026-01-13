import MainHeader from '@/components/Common/MainRight/MainHeader';
import React from 'react'

const UserMainTest = () => {

    const handleCancel = () => {
        alert("Cancelar");
    }

    const handleSave = () => {
        alert("Guardar");
    }

    return (
        <div>
            <h1>Test</h1>
            <MainHeader>
                <>
                    <h1>Test header</h1>
                    <button onClick={handleCancel}>Cancelar</button>
                    <button onClick={handleSave}>Guardar</button>
                </>
            </MainHeader>
        </div>
    )
}

export default UserMainTest