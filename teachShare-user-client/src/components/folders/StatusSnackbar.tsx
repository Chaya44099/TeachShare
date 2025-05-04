// src/components/common/StatusSnackbar.tsx
import React from "react"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"

interface StatusSnackbarProps {
  open: boolean
  onClose: () => void
  message: string
  severity: "success" | "error"
}

const StatusSnackbar: React.FC<StatusSnackbarProps> = ({ open, onClose, message, severity }) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={4000} 
      onClose={onClose} 
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default StatusSnackbar