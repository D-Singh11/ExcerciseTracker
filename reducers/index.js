import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions/index';


// reducer used to update the state of application in redux store
// entries/state has
// key-represents a specific day
// value- which reprsents the metric/data/entry for that day
function entries(state = {}, action) {
    switch (action.type) {

        case RECEIVE_ENTRIES:
            return {
                ...state,
                ...action.entries
            }

        case ADD_ENTRY:
            return {
                ...state,
                ...action.entry
            }

        default:
            return state;
    }
}

export default entries;