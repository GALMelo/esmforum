import { Request, Response } from 'express'
import { Comment, commentModel } from '../models/comment'

const insertComment = (req: Request, res: Response) => {
  const com = req.body
  if (!com) { return res.status(400).json('Invalid Comment') }

  if (!com.text) { return res.status(400).json('Add text to your comment') }
  const id = parseInt(req.params.id)
  const comment = req.body as Comment
  return commentModel.insertComment(comment, id)
    .then(comment => {
      res.json(comment)
    })
    .catch(err => res.status(500).json(err.message))
}

const insertQuestion = (req: Request, res: Response) => {
  const com = req.body
  if (!com) { return res.status(400).json('Invalid Comment') }

  if (!com.text) { return res.status(400).json('Add text to your comment') }

  const comment = req.body as Comment
  return commentModel.insertComment(comment, 0)
    .then(comment => {
      res.json(comment)
    })
    .catch(err => res.status(500).json(err.message))
}

const updateComment = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  const com = req.body
  if (!com) { return res.status(400).json('Invalid Comment') }

  if (!com.text) { return res.status(400).json('Add text to your comment') }

  const commentSaved = await commentModel.getComment(id)
  if (!commentSaved) { return res.sendStatus(404) }
  if (commentSaved.userid !== com.userid) { return res.status(400).json('Invalid User') }

  const comment = req.body as Comment
  comment.commentid = id
  return commentModel.updateComment(comment)
    .then(comment => {
      res.json(comment)
    })
    .catch(err => res.status(500).json(err.message))
}

const listQuestions = (req : Request, res: Response) => {
  return commentModel.listAllComments()
    .then((comment) => {
      if (comment) { return res.json(comment) } else { return res.sendStatus(404) }
    })
    .catch(err => res.status(500).json(err.message))
}

const listComments = (req : Request, res: Response) => {
  const id = parseInt(req.params.id)
  return commentModel.listComments(id)
    .then((comment) => {
      if (comment) { return res.json(comment) } else { return res.sendStatus(404) }
    })
    .catch(err => res.status(500).json(err.message))
}

const deleteComment = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  const commentSaved = await commentModel.getComment(id)
  if (!commentSaved) { return res.sendStatus(404) }

  return commentModel.deleteComment(id)
    .then(comment => res.json(comment))
    .catch(err => res.status(500).json(err.message))
}

export const commentController = {
  insertComment,
  insertQuestion,
  listQuestions,
  listComments,
  deleteComment,
  updateComment
}
