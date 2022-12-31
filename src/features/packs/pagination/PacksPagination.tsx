import React, { useEffect, useState } from 'react'

import { Container, MenuItem, Pagination, Select, SelectChangeEvent, Stack } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

type PropsType = {
  page: number
  packsCount: number
  totalPacksCount: number
}

export const PacksPagination: React.FC<PropsType> = ({ page, packsCount, totalPacksCount }) => {
  const [packsPerPage, setPacksPerPage] = useState<number>(4)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [searchParams, setSearchParams] = useSearchParams()

  const handleChangePage = (event: unknown, page: number) => {
    searchParams.set('page', String(page))
    setSearchParams(searchParams)
    setCurrentPage(page)
  }

  const handleChangePacksPerPage = (event: SelectChangeEvent) => {
    const ev = event.target.value

    searchParams.set('pageCount', ev)
    setSearchParams(searchParams)
    setPacksPerPage(+ev)
  }

  useEffect(() => {
    if (searchParams.get('page')) {
      const pageParams = Number(searchParams.get('page'))

      setCurrentPage(pageParams)
    } else {
      setCurrentPage(page)
    }
    if (searchParams.get('pageCount')) {
      const pageCountParam = Number(searchParams.get('pageCount'))

      setPacksPerPage(pageCountParam)
    } else {
      setPacksPerPage(packsPerPage)
    }
  }, [searchParams, packsPerPage, page])

  return (
    <Container sx={{ marginTop: 5 }} maxWidth={'md'}>
      <Stack spacing={2}>
        <Pagination
          color="primary"
          shape="rounded"
          count={totalPacksCount}
          page={currentPage}
          onChange={handleChangePage}
          sx={{ marginY: 3, marginX: 'auto' }}
        />
        Show
        <Select
          value={String(packsPerPage)}
          onChange={handleChangePacksPerPage}
          sx={{ width: '65px', height: '40px' }}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
        Packs per Page
      </Stack>
    </Container>
  )
}
