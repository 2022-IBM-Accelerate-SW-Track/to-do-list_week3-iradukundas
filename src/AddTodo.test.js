import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  let i = 0;
  while(i < 2)
  {
    const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
    const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
    const element = screen.getByRole('button', {name: /Add/i});
    const dueDate = "05/30/2023";

    fireEvent.change(inputTask, { target: { value: "DTest"}});
    fireEvent.change(inputDate, { target: { value: dueDate}});
    fireEvent.click(element);
    i++;
  }
  
  const check =screen.getByText(/DTest/i);
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: ""}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

 const check = screen.getByText(/You have no todo's left/i);
 expect(check).toBeInTheDocument(); 
 
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, { target: { value: "task"}});
  fireEvent.change(inputDate, { target: { value: ""}});
  fireEvent.click(element);

 const check = screen.getByText(/You have no todo's left/i);
 expect(check).toBeInTheDocument(); 
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);

  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";

  fireEvent.change(inputTask, { target: { value: "task"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const checkBox = screen.getByRole('checkbox');
  fireEvent.click(checkBox);

  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument(); 

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  
  const element = screen.getByRole('button', {name: /Add/i});
  
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  
  const dueDate = "05/30/2019"; //past date

  fireEvent.change(inputTask, { target: { value: "task"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);

  const check = screen.getByTestId(/task/i)
  expect(check.style.background == 'rgb(128, 128, 128)').toBe(true)
 });


