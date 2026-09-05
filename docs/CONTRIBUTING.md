# Contributing Guide

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make changes
5. Submit a pull request

## Development Setup

See [DEPLOYMENT.md](DEPLOYMENT.md) for local development setup.

## Code Style

### TypeScript/JavaScript

- Use `const` and `let`, avoid `var`
- Use async/await instead of promises
- Add type annotations to all functions
- Use meaningful variable names
- Max line length: 100 characters

### Python

- Follow PEP 8 style guide
- Use type hints
- Add docstrings to functions
- Max line length: 88 characters (Black formatter)

### React Components

- Use functional components with hooks
- Props should be typed with TypeScript
- Extract complex logic to custom hooks
- Keep components small and focused

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "Add amazing feature"

# Push to your fork
git push origin feature/amazing-feature

# Create pull request on GitHub
```

## Commit Messages

Follow conventional commits:

```
feat: add user authentication
fix: resolve bug in search results
docs: update API documentation
test: add tests for bookmark service
refactor: improve database queries
style: format code with prettier
```

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Python tests
pytest
```

## Pull Request Process

1. Update README.md with any new features
2. Ensure all tests pass
3. Add/update tests for new functionality
4. Update API documentation if needed
5. Ensure code follows style guide
6. Request review from maintainers

## Issues

Before opening an issue, check if one already exists. Include:

- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- System information

## Feature Requests

We welcome feature requests! Please include:

- Use case for the feature
- Benefits to users
- Potential implementation approach
- Any concerns or limitations

## Code of Conduct

Be respectful and inclusive. Harassment, discrimination, and abuse will not be tolerated.
