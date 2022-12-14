import { Request, Response, NextFunction } from 'express'

import Book from '../models/Book'
import bookService from '../services/book.service'
import { BadRequestError } from '../helpers/apiError'

// POST /books
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      publishedYear,
      ISBN,
      author,
      publisher,
      description,
      genres,
      borrowerID,
      borrowDate,
      returnDate,
      imageUrl,
    } = req.body

    const book = new Book({
      name,
      publishedYear,
      ISBN,
      author,
      publisher,
      description,
      genres,
      borrowerID,
      borrowDate,
      returnDate,
      imageUrl,
    })

    await bookService.create(book)
    res.json(book)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/borrowed/:bookId
export const addBorrower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId
    const body = req.body
    const updatedBook = await bookService.addBorrower(bookId, body)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/return/:bookId
export const removeBorrower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId
    const body = req.body
    const updatedBook = await bookService.removeBorrower(bookId, body)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /books/:bookId
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const bookId = req.params.bookId
    const updatedBook = await bookService.update(bookId, update)
    res.json(updatedBook)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /books/:bookId
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await bookService.deleteBook(req.params.bookId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books/:bookId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findById(req.params.bookId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//GET /books/ISBN/:ISBN
export const findByISBN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findByISBN(req.params.ISBN))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//GET /books/borrowed/:userId
export const findByBorrower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findByBorrower(req.params.userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

//GET /available
export const findAllAvailable = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findAllAvailable())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /books
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await bookService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
