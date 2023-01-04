import React from 'react'

import { Rating } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../common/routePaths/routePaths.enum'

import { EditCardModal } from '../../modals/basicCardModal/editCardModal/EditCardModal'
import { DeleteCardModal } from '../../modals/basicDeleteModal/deleteCardModal/DeleteCardModal'

import s from './Card.module.css'

import { StyledBodyTableCell, StyledBodyTableRow } from 'common/styles/tableStyleWrapper'

type CardPropsType = {
  question: string
  answer: string
  updated: Date | string
  grade: number
  _id: string
}

export const Card = ({ question, answer, updated, grade, _id }: CardPropsType) => {
  const date = updated.toString()
  const day = date.substr(8, 2)
  const month = date.substr(5, 2)
  const year = date.substr(0, 4)
  const updatedDate = `${day}.${month}.${year}`

  const navigate = useNavigate()

  const runLearn = () => {
    navigate(PATH.LEARN)
  }

  return (
    <StyledBodyTableRow>
      <StyledBodyTableCell component="th" scope="row" onClick={runLearn}>
        {question}
      </StyledBodyTableCell>
      <StyledBodyTableCell align="center">{answer}</StyledBodyTableCell>
      <StyledBodyTableCell align="center">{updatedDate}</StyledBodyTableCell>
      <StyledBodyTableCell align="center">
        <Rating name="rating" defaultValue={grade} precision={0.1} readOnly />
      </StyledBodyTableCell>
      <StyledBodyTableCell align="center">
        <div className={s.actions}>
          <EditCardModal _id={_id} />
          <DeleteCardModal id={_id} />
        </div>
      </StyledBodyTableCell>
    </StyledBodyTableRow>
  )
}
