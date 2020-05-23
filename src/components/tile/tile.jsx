import React from 'react';
import { updateShowingTiles } from '../../actions/tile-action';
import { connect } from 'react-redux';

import './tile.scss';

function Tile(props) {

    function selectTile(item) {
        let replaceShowingTiles = [...props.showingTiles];
        replaceShowingTiles.push(`${props.colIndex}${props.index}`);

        if(item === -1) {
            props.tileArr.forEach((col, colI) => {
                col.forEach((row, rowI) => {
                    replaceShowingTiles.push(`${colI}${rowI}`);
                })
            })
        }

        else if (item === null) {
            clearTiles(props.colIndex, props.index);
        }
        function clearTiles(col, row) {
            if(replaceShowingTiles.filter(tile => tile === `${col}${row}`).length > 1) return
            for(let i = -1; i < 2; i++) {
                for(let j = -1; j < 2; j++) {
                    if(props.tileArr[col+i] !== undefined && props.tileArr[col+i][row+j] !== undefined && props.tileArr[col+i][row+j] !== -1) {
                        replaceShowingTiles.push(`${col+i}${row+j}`);
                        if(props.tileArr[col+i][row+j] === null) {
                            clearTiles(col+i, row+j);
                        }
                    }
                }
            }
        }
        props.onupdateShowingTiles(replaceShowingTiles);
    }
    return (
        <div className={ props.showingTiles.filter(tile => tile === `${props.colIndex}${props.index}`).length > 0 ? `un-cover tile ${props.colIndex}${props.index}` : `cover tile ${props.colIndex}${props.index}` } onClick={() => selectTile(props.tile)}>
            {props.tile < 0 ? (
                <div className="tile__bomb" onClick={props.bombClick}><i className="fas fa-bomb"></i></div>
            ) : (
                <div className="tile__num">{props.tile}</div>
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    showingTiles: state.showingTiles,
});

const mapActionsToProps = {
    onupdateShowingTiles: updateShowingTiles,
};

export default connect(mapStateToProps, mapActionsToProps) (Tile);