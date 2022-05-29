export const initialState = null

export const reducer = (state, action)=>{
    if(action.type === "CLEAR"){
        return null
    }
    return state
}