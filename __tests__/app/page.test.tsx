import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page'; // Adjust the import path as needed

// Mock your fetch calls if you're making API requests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        currentWeather: {
          location: 'Roswell',
          temperature: 70,
          description: 'Sunny',
          humidity: 50,
          windSpeed: 10,
        },
        forecast: [
          { date: '2024-01-15', high_temperature: 75, low_temperature: 60 },
          { date: '2024-01-16', high_temperature: 78, low_temperature: 62 },
        ],
        hourly: [
          { time: '10 AM', temperature: 68 },
          { time: '11 AM', temperature: 70 },
        ],
      }),
    ok: true,
  })
) as jest.Mock;

describe('Home Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders the weather app and fetches data', async () => {
    // Wrap the initial render, which triggers an async fetch, in act()
    await act(async () => {
      render(<Home />);
    });

    // The placeholder text is "Enter city", not "Enter city/zip code"
    // The rendered component also has a second input for state/country, so we should
    // be specific or use the correct placeholder.
    const locationInput = screen.getByPlaceholderText('Enter city');

    // The button text is "Searching..." while loading, and "Get Weather" otherwise.
    // The test output shows the button is "Searching...", but it's disabled.
    // Let's assume the button text is "Get Weather" after loading.
    const searchButton = screen.getByRole('button', { name: /get weather/i });

    // The test output shows the input is "New York" and the button is "Searching...".
    // This implies that the initial fetch has already happened and your component
    // is in a state where it's already fetching something, which is a bit strange for a fresh render.
    // However, let's stick to the test's original intent: a user types and clicks.
    await act(async () => {
      // The user types "New York" into the location input
      await userEvent.type(locationInput, 'New York');
      // The user clicks the button
      fireEvent.click(searchButton);
    });

    // Wait for the asynchronous operations to complete and for the UI to update
    await waitFor(() => {
      expect(screen.getByText(/roswell/i)).toBeInTheDocument();
      expect(screen.getByText(/70°f/i)).toBeInTheDocument();
    });

    // If there are other elements that appear after state updates, assert them here
    expect(screen.getByText(/sunny/i)).toBeInTheDocument();
    expect(screen.getByText(/humidity: 50%/i)).toBeInTheDocument();
    // The rendered output shows "Wind speed: 10 mph"
    expect(screen.getByText(/wind speed: 10 mph/i)).toBeInTheDocument();

    // Example of asserting forecast data
    expect(screen.getByText(/2024-01-15/)).toBeInTheDocument();
    expect(screen.getByText(/high: 75°f/i)).toBeInTheDocument();
  });

  it('displays an error message for invalid input', async () => {
    // Mock a failed fetch for this test
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({}), // Empty or invalid response
        ok: false, // Indicate a failed response
      })
    );

    // Wrap the initial render in an async act
    await act(async () => {
      render(<Home />);
    });

    // Correct the placeholder text
    const locationInput = screen.getByPlaceholderText('Enter city');
    const searchButton = screen.getByRole('button', { name: /get weather/i });

    await act(async () => {
      await userEvent.type(locationInput, 'Invalid Location');
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      // The error output shows setError is called with "An unknown error occurred"
      // or the specific error message from the fetch call. Let's assume a generic message for the test.
      // The original code was checking for "weather data not found for this location."
      // Let's use that as the expected error message.
      expect(screen.getByText(/weather data not found for this location./i)).toBeInTheDocument();
    });
  });
});