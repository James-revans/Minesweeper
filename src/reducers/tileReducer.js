export default function TileReducer(state = [], {type, payload}) {
    switch (type) {
        case 'updateShowingTiles':
            return payload; 
        default:
            return state 
    }
}