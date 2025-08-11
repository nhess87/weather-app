import { render, screen } from '@testing-library/react'
import TwoDayForecast from '@/components/TwoDayForecast'

const mockForecastData = [
  {
    date: '2024-01-15',
    high: 75,
    low: 60
  },
  {
    date: '2024-01-16',
    high: 78,
    low: 62
  }
]

describe('TwoDayForecast', () => {
  it('renders forecast data correctly', () => {
    render(<TwoDayForecast forecast={mockForecastData} />)

    // Check if title is displayed
    expect(screen.getByText('2-Day Forecast')).toBeInTheDocument()
    
    // Check if first day data is displayed
    expect(screen.getByText('2024-01-15')).toBeInTheDocument()
    expect(screen.getByText('75°F')).toBeInTheDocument()
    expect(screen.getByText('60°F')).toBeInTheDocument()
    
    // Check if second day data is displayed
    expect(screen.getByText('2024-01-16')).toBeInTheDocument()
    expect(screen.getByText('78°F')).toBeInTheDocument()
    expect(screen.getByText('62°F')).toBeInTheDocument()
  })

  it('displays message when no forecast data is available', () => {
    render(<TwoDayForecast forecast={[]} />)

    expect(screen.getByText('2-Day Forecast')).toBeInTheDocument()
    expect(screen.getByText('Forecast data not available.')).toBeInTheDocument()
  })

  it('handles single day forecast', () => {
    const singleDayForecast = [mockForecastData[0]]
    
    render(<TwoDayForecast forecast={singleDayForecast} />)

    expect(screen.getByText('2024-01-15')).toBeInTheDocument()
    expect(screen.getByText('75°F')).toBeInTheDocument()
    expect(screen.getByText('60°F')).toBeInTheDocument()
    
    // Should not display second day
    expect(screen.queryByText('2024-01-16')).not.toBeInTheDocument()
  })

  it('handles zero temperatures correctly', () => {
    const zeroTempForecast = [
      {
        date: '2024-01-15',
        high: 0,
        low: -10
      }
    ]
    
    render(<TwoDayForecast forecast={zeroTempForecast} />)

    expect(screen.getByText('0°F')).toBeInTheDocument()
    expect(screen.getByText('-10°F')).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    render(<TwoDayForecast forecast={mockForecastData} />)

    const container = screen.getByText('2-Day Forecast').closest('div')
    expect(container).toHaveClass('bg-gray-800', 'p-6', 'rounded-2xl', 'border', 'border-gray-700', 'shadow-lg')
  })

  it('renders multiple forecast items with correct structure', () => {
    render(<TwoDayForecast forecast={mockForecastData} />)

    // Check that both forecast items are rendered
    const forecastItems = screen.getAllByText(/2024-01-1[56]/)
    expect(forecastItems).toHaveLength(2)
    
    // Check that high and low temperatures are rendered for each day
    const highTemps = screen.getAllByText(/7[58]°F/)
    const lowTemps = screen.getAllByText(/6[02]°F/)
    expect(highTemps).toHaveLength(2)
    expect(lowTemps).toHaveLength(2)
  })
})
