import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import EntitySearchInput from './EntitySearchInput'

vi.mock('@/shared/assets/search_icon.svg?react', () => ({
  default: () => <span data-testid="search-icon" />,
}))

afterEach(() => {
  vi.useRealTimers()
})

describe('EntitySearchInput', () => {
  it('calls onChange with 300ms debounce', () => {
    vi.useFakeTimers()
    const onChange = vi.fn()

    render(<EntitySearchInput value="" onChange={onChange} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'ars' } })

    expect(input).toHaveValue('ars')
    expect(onChange).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(299)
    })
    expect(onChange).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(onChange).toHaveBeenCalledWith('ars')
  })

  it('syncs local input value when external value changes', () => {
    const onChange = vi.fn()
    const { rerender } = render(<EntitySearchInput value="bar" onChange={onChange} />)

    expect(screen.getByRole('textbox')).toHaveValue('bar')

    rerender(<EntitySearchInput value="chelsea" onChange={onChange} />)

    expect(screen.getByRole('textbox')).toHaveValue('chelsea')
  })
})
