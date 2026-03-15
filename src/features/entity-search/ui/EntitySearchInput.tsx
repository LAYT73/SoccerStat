import { Input } from 'antd'

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
  return (
    <div className="flex flex-col gap-2">
      <Input
        value={value}
        allowClear
        size="large"
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default EntitySearchInput
