import '@testing-library/jest-dom'

// Mock fetch globally
global.fetch = jest.fn()

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock react-icons
jest.mock('react-icons/lu', () => ({
  LuSearch: () => <div data-testid="search-icon">Search Icon</div>,
}))

// Setup for each test
beforeEach(() => {
  fetch.mockClear()
})
