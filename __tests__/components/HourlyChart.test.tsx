import { render, screen } from '@testing-library/react'
import HourlyChart from '@/components/HourlyChart'

const mockHourlyData = [
  { time: '12:00', temp: 25 },
  { time: '13:00', temp: 27 },
  { time: '14:00', temp: 30 },
  { time: '15:00', temp: 28 },
  { time: '16:00', temp: 26 }
]

describe('HourlyChart', () => {
  it('renders chart title correctly', () => {
    render(<HourlyChart data={mockHourlyData} />)
    
    expect(screen.getByText('Hourly Temperature Chart')).toBeInTheDocument()
  })

  it('renders SVG chart with correct structure', () => {
    render(<HourlyChart data={mockHourlyData} />)
    
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 400 160')
  })

  it('renders time labels correctly', () => {
    render(<HourlyChart data={mockHourlyData} />)
    
    expect(screen.getByText('12:00')).toBeInTheDocument()
    expect(screen.getByText('13:00')).toBeInTheDocument()
    expect(screen.getByText('14:00')).toBeInTheDocument()
    expect(screen.getByText('15:00')).toBeInTheDocument()
    expect(screen.getByText('16:00')).toBeInTheDocument()
  })

  it('renders chart with empty data', () => {
    render(<HourlyChart data={[]} />)
    
    expect(screen.getByText('Hourly Temperature Chart')).toBeInTheDocument()
    
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders data points as circles', () => {
    render(<HourlyChart data={mockHourlyData} />)
    
    const circles = document.querySelectorAll('circle')
    expect(circles).toHaveLength(mockHourlyData.length)
    
    circles.forEach((circle) => {
      expect(circle).toHaveAttribute('r', '4')
      expect(circle).toHaveAttribute('fill', '#8B5CF6')
    })
  })

  it('renders chart path with correct attributes', () => {
    render(<HourlyChart data={mockHourlyData} />)

    const path = document.querySelector('path[stroke="#8B5CF6"]')
    expect(path).toBeInTheDocument()
    // Using a different approach to check stroke width since `toHaveClass` might not work for arbitrary values
    expect(path).toHaveAttribute('stroke-width', '3')
    expect(path).toHaveAttribute('fill', 'none')
  })

  it('applies correct CSS classes to container', () => {
    render(<HourlyChart data={mockHourlyData} />)
    
    const container = screen.getByText('Hourly Temperature Chart').closest('div')
    expect(container).toHaveClass('bg-gray-800', 'p-6', 'rounded-2xl', 'border', 'border-gray-700', 'shadow-lg')
  })

  it('handles single data point', () => {
    const singleDataPoint = [{ time: '12:00', temp: 25 }]
    render(<HourlyChart data={singleDataPoint} />)
    
    expect(screen.getByText('12:00')).toBeInTheDocument()
    
    const circles = document.querySelectorAll('circle')
    expect(circles).toHaveLength(1)
  })
})