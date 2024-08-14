import {Request, Response} from 'express';

export const getAllBoards = (req: Request, res: Response) => {
    res.send('get all boards');    
}

export const getBoard = (req: Request, res: Response) => {
    res.send('get specific board by id');    
}

export const createBoard = (req: Request, res: Response) => {
    res.send('create a new board right now');    
}

export const updateBoard = (req: Request, res: Response) => {
    res.send('update an exisitng board');    
}

export const deleteBoard = (req: Request, res: Response) => {
    res.send('delete a board');    
}
