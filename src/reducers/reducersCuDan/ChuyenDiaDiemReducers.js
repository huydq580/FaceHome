const ChuyenDiaDiemReducers = (state = [], action) => {
    switch (action.type) {
        case 'CHUYEN_DIA_DIEM':
            return action.payload
        default:
            return state
    }
}

export default ChuyenDiaDiemReducers