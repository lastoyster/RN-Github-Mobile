//  Todo: figure out global states needed for the app

// import { StyleSheet, Text, View } from 'react-native'
// import React, { FC, ReducerAction, ReducerState, useContext } from 'react'
// import { GlobalState, AppReducer } from '../types'


// const initialState: GlobalState = { userDetails: null, organizations: [], starredRepos: [] }

// const Context = React.createContext({ state: initialState, dispatch: (value: AppReducer) => { } })

// const appReducer = (state: GlobalState, action: AppReducer) => {
//     switch (action.type) {
//         case 'SET_USER_DETAILS':
//             return { ...state, userDetails: action.payload }
//         case 'SET_ORGANIZATIONS':
//             return { ...state, organizations: action.payload }
//         case 'SET_STARRED_REPOS':
//             return { ...state, starredRepos: action.payload }
//     }
// }

// const AppContext: FC = ({ children }) => {
//     const [state, dispatch] = React.useReducer(appReducer, initialState)
//     return (
//         <Context.Provider value={{ state, dispatch }} >
//             {(children)}
//         </Context.Provider>
//     )
// }

// // const ContextChildren = React.memo(({ children }) => <>{children}</>)

// const useAppContext = () => useContext(Context)
// export const useAppDispatch = () => {
//     const context = useAppContext()
//     return context.dispatch
// }
// export const useAppState = () => {
//     const context = useAppContext()
//     return context.state
// }


// export default AppContext

// const styles = StyleSheet.create({})