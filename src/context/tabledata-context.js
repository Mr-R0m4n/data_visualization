import {createContext, useReducer} from "react";

export const TabledataContext = createContext({});

const TabledataProvider = props => {
    const initialState = {
        titles: [],
        values: [],
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'TITLE':
                return {
                    titles: action.payload,
                    values: state.values
                };
            case 'VALUE':
                return {
                    titles: state.titles,
                    values: action.payload
                };
            default:
                throw new Error();
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TabledataContext.Provider value={[state, dispatch]}>
            {props.children}
        </TabledataContext.Provider>
    );
};

export default TabledataProvider;