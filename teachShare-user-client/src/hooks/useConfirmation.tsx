"use client"

import { useState } from "react"

interface UseConfirmationOptions {
  onConfirm: () => void | Promise<void>
  title?: string
  description?: string
  itemName?: string
}

export function useConfirmation() {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<UseConfirmationOptions | null>(null)

  const confirm = (options: UseConfirmationOptions) => {
    setOptions(options)
    setIsOpen(true)

    // החזרת הבטחה שתתממש כאשר המשתמש יאשר או יבטל
    return new Promise<boolean>((resolve) => {
      setOptions({
        ...options,
        onConfirm: async () => {
          if (options.onConfirm) {
            await options.onConfirm()
          }
          resolve(true)
          setIsOpen(false)
        },
      })
    })
  }

  const handleClose = () => {
    setIsOpen(false)
    return false
  }

  return {
    isOpen,
    options,
    confirm,
    handleClose,
  }
}
