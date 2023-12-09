// src/setupTests.js
import '@testing-library/jest-dom';

// Extend expect
import { toBeInTheDocument, toHaveClass } from '@testing-library/jest-dom/matchers';
expect.extend({ toBeInTheDocument, toHaveClass });
