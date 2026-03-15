import { Input } from 'antd'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import SearchIcon from '@/shared/assets/search_icon.svg?react'

interface EntitySearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const EntitySearchInput = ({
  value,
  onChange,
  placeholder = 'Поиск',
}: EntitySearchInputProps) => {
  const [localValue, setLocalValue] = useState(value)

  const debouncedOnChange = useDebouncedCallback((nextValue: string) => {
    onChange(nextValue)
  }, 300)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleInputChange = (nextValue: string) => {
    setLocalValue(nextValue)
    debouncedOnChange(nextValue)
  }

  return (
    <div className="flex flex-col gap-2">
      <Input
        value={localValue}
        allowClear
        size="large"
        placeholder={placeholder}
        prefix={<SearchIcon width={18} height={18} aria-hidden="true" className="mr-2" />}
        onChange={(event) => handleInputChange(event.target.value)}
      />
    </div>
  )
}

export default EntitySearchInput
