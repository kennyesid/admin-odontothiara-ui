import React from 'react'

const MainHeader = ({ children, handleSave, handleCancel, handleOpenModal, valueParamOne, valueParamsTwo }) => {
    return (
        <div className="mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-2 md:px-12 rounded-3xl shadow-sm border border-slate-100 flex-shrink-0">
            {children}
        </div>
    )
}

export default MainHeader