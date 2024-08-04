import { Card, CardContent, CardMedia, Divider, Typography } from '@mui/material'
import React from 'react'
import type { VinylType } from '../../types/vinylTypes'

type VinylCardTypes = {
    vinyl: VinylType;
}
export default function VinylCard({vinyl} : VinylCardTypes): JSX.Element {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={vinyl.userImg}
        alt="img"
        sx={{ borderRadius: '16px' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {vinyl.color}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {vinyl.price}
        </Typography>
      </CardContent>
      <Divider />
    </Card>
  )
}
