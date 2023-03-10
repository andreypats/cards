import React, { useEffect, useState } from 'react'

import { Slider } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppSelector } from '../../../common/hooks/useAppSelector'
import { maxCardsCount, minCardsCount } from '../../../common/selectors/packs-selector'

import s from './filterSlider.module.css'

export const FilterSlider = () => {
  const status = useAppSelector(state => state.app.status)
  const instruction = status === 'loading'
  const minValue = useAppSelector(minCardsCount)
  const maxValue = useAppSelector(maxCardsCount)
  const [value, setValue] = useState<number[]>([minValue, maxValue])

  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const onChangeCommittedHandler = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => {
    const value = newValue as number[]

    searchParams.set('min', String(value[0]))
    searchParams.set('max', String(value[1]))
    searchParams.set('page', String(1))
    setSearchParams(searchParams)
  }

  useEffect(() => {
    if (searchParams.get('min') || searchParams.get('max')) {
      const minSearch = Number(searchParams.get('min'))
      const maxSearch = Number(searchParams.get('max'))

      setValue([minSearch, maxSearch])
    } else {
      setValue([minValue, maxValue])
    }
  }, [searchParams, minValue, maxValue])

  return (
    <div className={s.sliderContainer}>
      <h3>Number of cards</h3>
      <div className={s.slider}>
        <div className={s.number}>
          <span>{value[0]}</span>
        </div>
        <Slider
          min={minValue}
          max={maxValue}
          value={value}
          onChange={handleChange}
          onChangeCommitted={onChangeCommittedHandler}
          valueLabelDisplay="auto"
          sx={{ width: '180px', marginLeft: '20px', marginRight: '20px' }}
          disabled={instruction}
        />
        <div className={s.number}>
          <span>{value[1]}</span>
        </div>
      </div>
    </div>
  )
}
