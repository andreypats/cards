import * as React from 'react'
import { ChangeEvent, ReactNode, useState } from 'react'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Divider, IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Modal from '@mui/material/Modal'
import { useParams } from 'react-router-dom'

import noCover from '../../../assets/images/cardNoCover.png'
import { InputTypeFileCover } from '../../../common/components/inputTypeFileCover/InputTypeFileCover'
import { useAppDispatch } from '../../../common/hooks/useAppDispatch'
import { UniButton } from '../../../common/uniComponents/uniButton/UniButton'
import st from '../../../common/uniComponents/uniButton/UniButton.module.css'
import { UniInput } from '../../../common/uniComponents/uniInput/UniImput'
import { addNewCardTC, editCardTC } from '../../cards/cardList/cards-reducer'

import s from './BasicCardModal.module.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
}

type PropsType = {
  children: ReactNode
  title: string
  open: boolean
  setOpen: (open: boolean) => void
  comp: string
  _id?: string
}

export const BasicCardModal = ({ children, title, open, setOpen, comp, _id }: PropsType) => {
  const dispatch = useAppDispatch()
  const { packId } = useParams()

  const [questionValue, setQuestionValue] = useState<string>('')
  const [questionImg, setQuestionImg] = useState<string>(noCover)
  const [answerValue, setAnswerValue] = useState<string>('')
  const [selectValue, setSelectValue] = useState('Text')

  const handleChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value)
  }

  const onChangeQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setQuestionValue(e.currentTarget.value)
  }

  const onChangeAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAnswerValue(e.currentTarget.value)
  }

  const addNewCard = () => {
    const addNewCardLocalState = {
      card: {
        cardsPack_id: packId as string,
        question: questionValue,
        questionImg: questionImg,
        answer: answerValue,
      },
    }

    dispatch(addNewCardTC(addNewCardLocalState))
    setOpen(false)
    setQuestionValue('')
    setQuestionImg(noCover)
    setAnswerValue('')
    setSelectValue('Text')
  }

  const editCardName = () => {
    const editCardLocalState = {
      card: {
        _id: _id as string,
        question: questionValue,
        questionImg: questionImg,
        answer: answerValue,
        grade: 0,
        shots: 0,
      },
    }

    dispatch(editCardTC(editCardLocalState))
    setOpen(false)
    setQuestionValue('')
    setQuestionImg(noCover)
    setAnswerValue('')
    setSelectValue('Text')
  }

  const handleClose = () => {
    setOpen(false)
    setQuestionValue('')
    setQuestionImg(noCover)
    setAnswerValue('')
    setSelectValue('Text')
  }

  return (
    <div>
      {children}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className={s.titleContainer}>
            <span className={s.title}>{title}</span>
            <IconButton onClick={handleClose}>
              <CloseOutlinedIcon />
            </IconButton>
          </div>
          <Divider />
          <FormControl className={s.formContainer}>
            <div className={s.selectorTitle}>Choose a question format</div>
            <Select
              value={selectValue}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={'Text'}>Text</MenuItem>
              <MenuItem value={'Image'}>Image</MenuItem>
            </Select>
            {selectValue === 'Text' ? (
              <UniInput
                value={questionValue}
                label={'Question'}
                onChange={onChangeQuestionHandler}
              />
            ) : (
              <InputTypeFileCover
                cover={questionImg}
                setCover={setQuestionImg}
                text={'Question:'}
                defaultCover={noCover}
              />
              /*<UniButton className={'addImageBtn'} title={'Upload the question as an image'} />*/
            )}
            <UniInput value={answerValue} label={'Answer'} onChange={onChangeAnswerHandler} />
          </FormControl>
          <div className={st.buttons}>
            <UniButton className={'cancelBtn'} title={'Cancel'} onClick={handleClose} />
            <UniButton
              className={'saveBtn'}
              title={'Save'}
              onClick={comp === 'edit' ? editCardName : addNewCard}
            />
          </div>
        </Box>
      </Modal>
    </div>
  )
}
