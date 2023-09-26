import logo from './logo.svg';
import './App.css';
import { config_4x4, config_5x5, config_6x6 } from './configs';
import { useState, useEffect, useRef } from 'react';
import { Model } from './Model/Model';
import Congratulations from './Boundary/Congratulations'
import { rotateGroup } from './Controller/Controller'
import { rotateGroup as rotateGroupKey } from './Controller/KeyPressController';
import cw from './cw.svg'
import ccw from './ccw.svg'
import reset from './reset.svg'
import home from './home.svg'
import Grid from './Boundary/Grid'

function App() {

  const [config, setConfig] = useState(config_4x4)
  const [model, setModel] = useState(new Model(config))
  const modelRef = useRef(model)

  let keyPressed = (e) => {
    rotateGroupKey(modelRef.current, e.key)
    update()
  }

  useEffect(() => {
    modelRef.current = model
  }, [model])

  useEffect(() => {
    document.addEventListener('keydown', keyPressed, true)
    return () => {
      document.removeEventListener('keydown', keyPressed, true);
    };
  }, [])

  let update = () => {
    const x = Object.create(modelRef.current)
    Object.assign(x, modelRef.current)
    setModel(x)
  }

  let rotate = (direction) => {
    rotateGroup(model, direction)
    update()
  }

  let updateConfig = (c) => {
    setModel(new Model(c))
  }

  return (
    <div className='outside'>
      {model.hasWon && <Congratulations config={config.numColumns} numMoves={model.numMoves} />}
      {!model.hasWon && <div className='moveCountContainer'>
        <h1 className='moveCount'>
          {model.numMoves}
        </h1>
        <h1 className='moveCountLabel'>
          move{model.numMoves == 1 ? '' : 's'}
        </h1>
      </div>}
      <div className='configSelect'>
        {!model.hasWon && <img draggable='false' width={100} src={reset} className='actionButton' onClick={e => setModel(new Model(config))} />}
        <button onClick={e => { setConfig(config_4x4); updateConfig(config_4x4); }}>4x4</button>
        <button onClick={e => { setConfig(config_5x5); updateConfig(config_5x5); }}>5x5</button>
        <button onClick={e => { setConfig(config_6x6); updateConfig(config_6x6); }}>6x6</button>
      </div>
      {!model.hasWon && <Grid config={config} model={model} update={update} />}
      {!model.hasWon &&
        <div className='rotate'>
          <img draggable="false" data-testid="CCW" width={150} src={ccw} className='rotateButton actionButton' onClick={e => rotate('CCW')} />
          <img draggable="false" data-testid="CW" width={150} src={cw} className='rotateButton actionButton' onClick={e => rotate('CW')} />
        </div>
      }
    </div>
  );
}

export default App;
