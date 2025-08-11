import { render, screen } from '@testing-library/react'
import CurrentWeatherCard from '@/components/CurrentWeatherCard'

const mockWeatherData = {
  current_temperature: 25,
  sky: '☀️',
  feels_like: 28,
  humidity: 65,
  wind_speed: 15,
  wind_direction: 'NW',
  visibility: 10,
  uv_index: 7,
  description: 'Sunny and warm'
}

describe('CurrentWeatherCard', () => {
  it('renders weather data correctly', () => {
    render(
      <CurrentWeatherCard 
        data={mockWeatherData} 
        city="New York" 
        state="NY" 
      />
    )

    // Check if location is displayed
    expect(screen.getByText('New York, NY')).toBeInTheDocument()
    
    // Check if temperature is displayed
    expect(screen.getByText('25°C')).toBeInTheDocument()
    
    // Check if sky condition is displayed
    expect(screen.getByText('☀️')).toBeInTheDocument()
    
    // Check if feels like temperature is displayed
    expect(screen.getByText('Feels like: 28°C')).toBeInTheDocument()
    
    // Check if description is displayed
    expect(screen.getByText('Sunny and warm')).toBeInTheDocument()
    
    // Check if humidity is displayed
    expect(screen.getByText(/Humidity:/)).toBeInTheDocument()
    expect(screen.getByText(/65%/)).toBeInTheDocument()
    
    // Check if wind information is displayed
    expect(screen.getByText(/Wind:/)).toBeInTheDocument()
    expect(screen.getByText(/15 km\/h NW/)).toBeInTheDocument()
    
    // Check if visibility is displayed
    expect(screen.getByText(/Visibility:/)).toBeInTheDocument()
    expect(screen.getByText(/10 km/)).toBeInTheDocument()
    
    // Check if UV index is displayed
    expect(screen.getByText(/UV Index:/)).toBeInTheDocument()
    expect(screen.getByText(/7/)).toBeInTheDocument()
  })

  it('returns null when no data is provided', () => {
    const { container } = render(
      <CurrentWeatherCard 
        data={null as any} 
        city="New York" 
        state="NY" 
      />
    )
    
    expect(container.firstChild).toBeNull()
  })

  it('handles zero values correctly', () => {
    const zeroWeatherData = {
      ...mockWeatherData,
      current_temperature: 0,
      feels_like: 0,
      humidity: 0,
      wind_speed: 0,
      visibility: 0,
      uv_index: 0
    }

    render(
      <CurrentWeatherCard 
        data={zeroWeatherData} 
        city="Arctic" 
        state="AK" 
      />
    )

    expect(screen.getByText('0°C')).toBeInTheDocument()
    expect(screen.getByText('Feels like: 0°C')).toBeInTheDocument()
    expect(screen.getByText(/0%/)).toBeInTheDocument()
    expect(screen.getByText(/0 km\/h/)).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    render(
      <CurrentWeatherCard 
        data={mockWeatherData} 
        city="New York" 
        state="NY" 
      />
    )

    const card = screen.getByText('New York, NY').closest('div')
    expect(card).toHaveClass('bg-gray-800', 'p-6', 'rounded-2xl', 'border', 'border-gray-700', 'shadow-lg')
  })
})
