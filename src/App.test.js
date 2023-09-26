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
  expect(screen.getByText('congrats!')).toBeInTheDocument()
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