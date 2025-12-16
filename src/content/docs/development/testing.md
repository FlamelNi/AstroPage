---
title: "Testing Guide"
description: "Best practices for testing your code"
---

Testing is essential for building reliable software. This guide covers testing strategies, tools, and best practices for your project.

## Why Testing Matters

Good tests help you:

- Catch bugs before they reach production
- Refactor code with confidence
- Document expected behavior
- Speed up development in the long run

## Testing Philosophy

Follow the testing pyramid principle:

1. **Unit tests** - Many small, fast tests for individual functions
2. **Integration tests** - Fewer tests for component interactions
3. **End-to-end tests** - A few tests for critical user flows

## Unit Testing

Unit tests verify that individual functions work correctly in isolation.

### Example: Testing a Utility Function

```typescript
// src/lib/utils.ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
```

```typescript
// src/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate } from './utils';

describe('formatDate', () => {
  it('formats a date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('January 15, 2024');
  });

  it('handles different months', () => {
    const date = new Date('2024-06-01');
    expect(formatDate(date)).toBe('June 1, 2024');
  });
});
```

### Best Practices for Unit Tests

- Test one thing per test case
- Use descriptive test names
- Arrange, Act, Assert (AAA) pattern
- Keep tests independent of each other

## Integration Testing

Integration tests verify that multiple components work together correctly.

### Testing Component Interactions

```typescript
// src/components/Counter.test.ts
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/dom';

describe('Counter component', () => {
  it('increments count when button is clicked', async () => {
    // Arrange
    const container = render(Counter);
    const button = container.querySelector('button');

    // Act
    await fireEvent.click(button);

    // Assert
    expect(container.textContent).toContain('Count: 1');
  });
});
```

## Running Tests

### Run All Tests

```bash
npm run test
```

### Run Tests in Watch Mode

```bash
npm run test -- --watch
```

### Run a Specific Test File

```bash
npm run test -- src/lib/utils.test.ts
```

### Run Tests Matching a Pattern

```bash
npm run test -- --grep "formatDate"
```

## Code Coverage

Code coverage shows how much of your code is exercised by tests.

### Generate Coverage Report

```bash
npm run test -- --coverage
```

This creates a coverage report in the `coverage/` directory. Open `coverage/index.html` in a browser to view detailed results.

### Coverage Thresholds

Aim for these minimum coverage levels:

| Metric     | Target |
|------------|--------|
| Statements | 80%    |
| Branches   | 75%    |
| Functions  | 80%    |
| Lines      | 80%    |

## Testing Tips

### Mock External Dependencies

```typescript
import { vi } from 'vitest';

// Mock a fetch call
vi.mock('./api', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'test' })
}));
```

### Test Error Cases

Don't just test the happy path:

```typescript
it('throws an error for invalid input', () => {
  expect(() => parseConfig(null)).toThrow('Config cannot be null');
});
```

### Use Fixtures for Complex Data

```typescript
// tests/fixtures/users.ts
export const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com'
};
```

## Next Steps

- [Development Overview](/docs/development/) - Return to the development guide
- [Environment Setup](/docs/development/environment-setup/) - Configure your dev environment
- [Deployment Guide](/docs/guides/deployment/) - Deploy your tested code
