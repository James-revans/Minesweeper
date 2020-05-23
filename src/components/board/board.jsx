import React, { useState } from 'react';
import './board.scss';

import { updateShowingTiles } from '../../actions/tile-action';
import { connect } from 'react-redux';

import Tile from '../tile/tile';

function Board(props) {
    const [tiles, setTiles] = useState([]);
    const [showExplosion, setExplosion] = useState(false);

    function genTiles() {
        props.onupdateShowingTiles([]);
        setExplosion(false);
        let replaceTiles = Array.from(Array(10), _ => Array(10).fill(null));
        replaceTiles.forEach((arr, arrIndex) => {
            arr.forEach((item, index) => {
                let num = Math.floor(Math.random() * (5 + 1)) -1;
                if(num === -1) {
                    replaceTiles[arrIndex][index] = num;
                }
            })
        })

        replaceTiles.forEach((arr, arrIndex) => {
            arr.forEach((item, index) => {
                if (item === -1) {
                    for(let i = -1; i < 2; i++) {
                        for(let j = -1; j < 2; j++) {
                            if(replaceTiles[arrIndex+i] !== undefined && replaceTiles[arrIndex+i][index+j] !== undefined && replaceTiles[arrIndex+i][index+j] !== -1) {
                                replaceTiles[arrIndex+i][index+j]+=1;
                            }
                        }
                    }
                }
            })
        })
        setTiles(replaceTiles);
    }

    function bombClick() {
        setExplosion(true);
    }

    if(showExplosion) {
        return (
            <div className="game-over">
                <div className="explosion-gif">
                    <iframe src="https://giphy.com/embed/rhYsUMhhd6yA0" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                </div>
                <div className="play-again"><button onClick={() => setExplosion(false)}>Return To Board</button></div>
            </div>
        )
    }
    else {
        return (
            <div className="board">
                <div className="board__message">Minesweeper</div>
                <button onClick={genTiles}>Create New Game</button>
                <div className="board__tiles">
                    {tiles.map((col, colIndex) => (
                        <div key={colIndex}>
                            {col.map((tile, index) => (
                                <Tile key={index} tile={tile} index={index} colIndex={colIndex} tileArr={tiles} bombClick={bombClick}/>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    showingTiles: state.showingTiles,
});

const mapActionsToProps = {
    onupdateShowingTiles: updateShowingTiles,
};

export default connect(mapStateToProps, mapActionsToProps) (Board);