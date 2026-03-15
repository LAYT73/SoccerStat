import { Input } from 'antd'

interface CompetitionSearchInputProps {
  value: string
  onChange: (value: string) => void
}

const CompetitionSearchInput = ({ value, onChange }: CompetitionSearchInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Input
        value={value}
        allowClear
        size="large"
        placeholder="Поиск по названию лиги или стране"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default CompetitionSearchInput
