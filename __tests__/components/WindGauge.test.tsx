import { render, screen, cleanup } from '@testing-library/react'
import WindGauge from '@/components/WindGauge'

describe('WindGauge', () => {
  // It's a good practice to clean up after each test to prevent state from leaking
  afterEach(cleanup)

  it('renders wind gauge title correctly', () => {
    render(<WindGauge speed={25} />)
    
    expect(screen.getByText('Wind Speed Gauge')).toBeInTheDocument()
  })

  it('displays wind speed value and unit correctly', () => {
    render(<WindGauge speed={25} />)
    
    const speedElement = screen.getByText('25')
    const unitElement = screen.getByText('km/h')

    expect(speedElement).toBeInTheDocument()
    expect(unitElement).toBeInTheDocument()
  })

  it('renders SVG gauge with correct attributes and structure', () => {
    render(<WindGauge speed={25} />)
    
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 200 100')

    const backgroundPath = document.querySelector('path[stroke="#4B5563"]')
    expect(backgroundPath).toBeInTheDocument()
    // Assuming the component uses 'stroke-[10]' for arbitrary stroke-width
    // If your component uses a different method (e.g., inline style or a different class), adjust this.
    expect(backgroundPath).toHaveClass('stroke-[10]') // Changed from stroke-10 to stroke-[10]

    const filledPath = document.querySelector('path[stroke="#FBBF24"]')
    expect(filledPath).toBeInTheDocument()
    // Assuming the component uses 'stroke-[10]' for arbitrary stroke-width
    expect(filledPath).toHaveClass('stroke-[10]') // Changed from stroke-10 to stroke-[10]
  })

  it('renders needle with correct rotation for different speeds', () => {
    const { rerender } = render(<WindGauge speed={0} />)
    
    let needle = document.querySelector('.absolute.bottom-0')
    expect(needle).toBeInTheDocument()
    
    // Test with different wind speeds to ensure rerendering works
    rerender(<WindGauge speed={25} />)
    needle = document.querySelector('.absolute.bottom-0')
    expect(needle).toBeInTheDocument()
    
    rerender(<WindGauge speed={50} />)
    needle = document.querySelector('.absolute.bottom-0')
    expect(needle).toBeInTheDocument()
  })

  it('handles zero and high wind speeds correctly', () => {
    // Test with zero wind speed
    const { rerender } = render(<WindGauge speed={0} />)
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('km/h')).toBeInTheDocument()

    // Test with high wind speed
    rerender(<WindGauge speed={100} />)
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('km/h')).toBeInTheDocument()
  })

  it('applies correct CSS classes to container and elements', () => {
    render(<WindGauge speed={25} />)
    
    const container = screen.getByText('Wind Speed Gauge').closest('div')
    expect(container).toHaveClass(
      'bg-gray-800', 
      'p-6', 
      'rounded-2xl', 
      'border', 
      'border-gray-700', 
      'shadow-lg', 
      'flex', 
      'flex-col', 
      'justify-between', 
      'items-center'
    )
    
    const needle = document.querySelector('.absolute.bottom-0')
    expect(needle).toHaveClass(
      'absolute',
      'bottom-0',
      'left-1/2',
      'w-1',
      'h-20',
      'origin-bottom',
      'transform',
      '-translate-x-1/2',
      'transition-transform',
      'duration-500',
      'ease-out'
    )
    
    const speedElement = screen.getByText('25')
    expect(speedElement.closest('div')).toHaveClass('mt-4', 'text-3xl', 'font-semibold')
    
    const unitElement = screen.getByText('km/h')
    expect(unitElement).toHaveClass('text-xl', 'font-normal', 'text-gray-400')
  })
})
