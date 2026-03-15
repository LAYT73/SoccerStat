import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import LazyImage from '../LazyImage'

describe('LazyImage', () => {
  it('renders fallback when src is missing', () => {
    render(
      <LazyImage
        src={null}
        alt="team"
        width={120}
        height={120}
        fallback={<div data-testid="fallback">Fallback</div>}
      />,
    )

    expect(screen.getByTestId('fallback')).toBeInTheDocument()
    expect(screen.queryByRole('img', { name: 'team' })).not.toBeInTheDocument()
  })

  it('renders image and shows it after load', () => {
    render(
      <LazyImage
        src="https://example.com/team.png"
        alt="team"
        width={120}
        height={120}
        fallback={<div data-testid="fallback">Fallback</div>}
      />,
    )

    const image = screen.getByRole('img', { name: 'team' })
    expect(image).toHaveClass('hidden')

    fireEvent.load(image)
    expect(image).toHaveClass('block')
  })

  it('switches to fallback when image load fails', () => {
    render(
      <LazyImage
        src="https://example.com/broken.png"
        alt="team"
        width={120}
        height={120}
        fallback={<div data-testid="fallback">Fallback</div>}
      />,
    )

    const image = screen.getByRole('img', { name: 'team' })
    fireEvent.error(image)

    expect(screen.getByTestId('fallback')).toBeInTheDocument()
    expect(screen.queryByRole('img', { name: 'team' })).not.toBeInTheDocument()
  })
})
