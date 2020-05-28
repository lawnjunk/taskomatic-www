export const createAction = (action) => (value) => ({
  type: action,
  payload: value,
})

export const INC = 'INC'
export const DEC = 'DEC'
export const inc = createAction(INC)
export const dec = createAction(DEC)

export const INC_ASYNC = 'INC_ASYNC'
export const DEC_ASYNC = 'DEC_ASYNC'
export const incAsync = createAction(INC_ASYNC)
export const decAsync= createAction(DEC_ASYNC)
