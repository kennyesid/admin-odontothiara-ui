import React from 'react'

const MainRight = ({ headerChildren, contentChildren }) => {
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="mb-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-2 md:px-12 rounded-3xl shadow-sm border border-slate-100 flex-shrink-0">
                {headerChildren}
            </div>
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 flex flex-col flex-1 overflow-hidden">
                {contentChildren}
            </div>
        </div>
    )
}

export default MainRight