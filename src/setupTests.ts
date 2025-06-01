// Import custom DOM matchers for testing
import '@testing-library/jest-dom'; 

// Mock browser intersection observer API
const mockIntersectionObserver = jest.fn(); 
mockIntersectionObserver.mockReturnValue({ 
  observe: () => null, 
  unobserve: () => null, 
  disconnect: () => null 
}); 
window.IntersectionObserver = mockIntersectionObserver; 

// Mock browser resize observer API
window.ResizeObserver = jest.fn().mockImplementation(() => ({ 
  observe: jest.fn(), 
  unobserve: jest.fn(), 
  disconnect: jest.fn() 
})); 

// Mock browser media query API
Object.defineProperty(window, 'matchMedia', { 
  writable: true, 
  value: jest.fn().mockImplementation(query => ({ 
    matches: false, 
    media: query, 
    onchange: null, 
    addListener: jest.fn(), 
    removeListener: jest.fn(), 
    addEventListener: jest.fn(), 
    removeEventListener: jest.fn(), 
    dispatchEvent: jest.fn() 
  })) 
}); 

// Mock browser fetch API
global.fetch = jest.fn(); 

// Reset mocks between tests
afterEach(() => { 
  jest.clearAllMocks(); 
}); 

// Filter noisy React warnings
const originalError = console.error; 
beforeAll(() => { 
  console.error = (...args: any[]) => { 
    if ( 
      /Warning: ReactDOM.render is no longer supported/.test(args[0]) || 
      /Warning: An update to .* inside a test was not wrapped/.test(args[0]) 
    ) { 
      return; 
    } 
    originalError.call(console, ...args); 
  }; 
}); 

// Restore original console behavior
afterAll(() => { 
  console.error = originalError; 
});
