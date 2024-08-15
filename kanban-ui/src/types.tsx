export type ColItem = {
  itemId: string;
  itemName: string;
  itemSubtasks: number;
  itemSubtasksComplete: number;
};

export type Board = {
  id: number;
  name: string;
  cols: Col[];
};

export type Col = {
  id: number;
  name: string;
  color: string;
  boardId: number;
  tickets: Ticket[];
};

export type Ticket = {
  id: number;
  title: string;
  text: string;
  status: string;
  colId: number;
  subtasks: Subtask[];
};

export type Subtask = {
  id: number;
  text: string;
  status: boolean;
  ticketId: number;
};
