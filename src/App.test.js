import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { config_6x6 as config, config_6x6 } from './configs';
import { Model, Group } from './Model/Model'
import { selectGroup, rotateGroup } from './Controller/Controller';
import { rotateGroup as pressKey } from './Controller/KeyPressController';
import Congratulations from './Boundary/Congratulations';


test('select group', () => {
  let model = new Model(config_6x6)
  model.selectGroup(new Group(1, 1))
  expect(model.selectedGroup).toEqual(new Group(1, 1))
});

test('rotate group', () => {
  let model = new Model(config_6x6)
  let i = 2
  let j = 1
  selectGroup(model, new Group(i, j))
  let model_2 = new Model(config_6x6)
  rotateGroup(model, 'CW')
  i -= 1
  j -= 1
  let temp = model_2.config[i][j]
  model_2.config[i][j] = model_2.config[i + 1][j]
  model_2.config[i + 1][j] = model_2.config[i + 1][j + 1]
  model_2.config[i + 1][j + 1] = model_2.config[i][j + 1]
  model_2.config[i][j + 1] = temp
  expect(model.config).toEqual(model_2.config)
});

test('rotate group CCW', () => {
  let model = new Model(config_6x6)
  let i = 2
  let j = 1
  selectGroup(model, new Group(i, j))
  let model_2 = new Model(config_6x6)
  rotateGroup(model, 'CCW')
  i -= 1
  j -= 1
  let temp = model_2.config[i][j]
  model_2.config[i][j] = model_2.config[i][j + 1]
  model_2.config[i][j + 1] = model_2.config[i + 1][j + 1]
  model_2.config[i + 1][j + 1] = model_2.config[i + 1][j]
  model_2.config[i + 1][j] = temp
  expect(model.config).toEqual(model_2.config)
});

test('congratulations', () => {
  render(<Congratulations />)
  expect(screen.getByText('Congratulations!')).toBeInTheDocument()
})

test('click', () => {
  render(<App />)
  let buttons = screen.getAllByTestId('gridButtons')
  fireEvent.click(buttons[1])
  fireEvent.click(screen.getByTestId('CW'))
  expect(screen.getByText('1')).toBeInTheDocument()
})

test('keypress', () => {
  let model = new Model(config_6x6)
  let i = 2
  let j = 1
  selectGroup(model, new Group(i, j))
  let model_2 = new Model(config_6x6)
  pressKey(model, 'ArrowLeft')
  i -= 1
  j -= 1
  let temp = model_2.config[i][j]
  model_2.config[i][j] = model_2.config[i][j + 1]
  model_2.config[i][j + 1] = model_2.config[i + 1][j + 1]
  model_2.config[i + 1][j + 1] = model_2.config[i + 1][j]
  model_2.config[i + 1][j] = temp
  expect(model.config).toEqual(model_2.config)
})

test('keypress cw', () => {
  let model = new Model(config_6x6)
  let i = 2
  let j = 1
  selectGroup(model, new Group(i, j))
  let model_2 = new Model(config_6x6)
  pressKey(model, 'ArrowRight')
  i -= 1
  j -= 1
  let temp = model_2.config[i][j]
  model_2.config[i][j] = model_2.config[i + 1][j]
  model_2.config[i + 1][j] = model_2.config[i + 1][j + 1]
  model_2.config[i + 1][j + 1] = model_2.config[i][j + 1]
  model_2.config[i][j + 1] = temp
  expect(model.config).toEqual(model_2.config)
})

test('remove group', () => {
  let config = {
    "name": "Configuration #1",
    "numRows": "2",
    "numColumns": "2",
    "baseSquares": [
      { "color": "green", "row": "0", "column": "0" },
      { "color": "green", "row": "0", "column": "1" },
      { "color": "green", "row": "1", "column": "0" },
      { "color": "green", "row": "1", "column": "1" },
    ]
  }
  let model = new Model(config)
  model.selectGroup(new Group(1, 1))
  expect(model.hasWon).toBe(true)
  expect(model.numMoves).toBe(0)
})