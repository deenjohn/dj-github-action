# DJ GitHub Action - Accessibility Testing

This repository includes automated accessibility testing for every pull request and merge to ensure your application meets accessibility standards.

## Accessibility Testing Setup

### What's Included

1. **GitHub Actions Workflow** (`.github/workflows/accessibility.yml`)
   - Runs on every pull request and push to main/master/develop branches
   - Performs automated accessibility checks
   - Uses Lighthouse for comprehensive accessibility auditing
   - Checks for common accessibility issues in HTML

2. **Accessibility Test Suite** (`my-app/__tests__/accessibility.test.tsx`)
   - Tests for proper image alt text
   - Validates form labels and accessibility
   - Checks heading structure
   - Ensures button and link accessibility
   - Uses regex-based HTML parsing for reliability

3. **Configuration Files**
   - `.pa11yci.json` - Pa11y accessibility testing configuration
   - `lighthouserc.json` - Lighthouse CI configuration

### How It Works

The accessibility testing workflow:

1. **Builds your application** to ensure all components are compiled
2. **Runs basic accessibility tests** using the test suite
3. **Scans built HTML files** for common accessibility issues:
   - Images without alt text
   - Form inputs without proper labels
   - Improper heading structure
4. **Runs Lighthouse accessibility audit** for comprehensive testing
5. **Uploads test results** as artifacts for review

### Accessibility Standards

The tests check for compliance with:
- **WCAG 2.1 AA** standards
- **Section 508** requirements
- Common accessibility best practices

### Running Tests Locally

To run accessibility tests locally:

```bash
cd my-app
npm test
```

To run only accessibility tests:

```bash
cd my-app
npm run test:accessibility
```

### What Gets Tested

#### 1. Image Accessibility
- ✅ All images have alt text
- ✅ Decorative images have empty alt attributes
- ❌ Images without alt text are flagged

#### 2. Form Accessibility
- ✅ Form inputs have associated labels
- ✅ Inputs with IDs have corresponding label elements
- ✅ Inputs use aria-label or aria-labelledby when appropriate
- ❌ Unlabeled inputs are flagged

#### 3. Heading Structure
- ✅ Headings follow proper hierarchy (h1 → h2 → h3)
- ❌ Skipped heading levels are flagged

#### 4. Interactive Elements
- ✅ Buttons have accessible names (text, aria-label, or title)
- ✅ Links have descriptive text or aria-labels
- ❌ Elements without accessible names are flagged

#### 5. Lighthouse Accessibility Audit
- Comprehensive accessibility scoring
- Detailed violation reports
- Performance and best practices checks

### Customizing Tests

You can customize the accessibility tests by:

1. **Modifying test thresholds** in `lighthouserc.json`
2. **Adding custom test cases** in `accessibility.test.tsx`
3. **Updating pa11y configuration** in `.pa11yci.json`
4. **Adjusting GitHub Actions workflow** in `.github/workflows/accessibility.yml`

### Viewing Results

After a pull request or push:
1. Go to the **Actions** tab in your GitHub repository
2. Click on the **Accessibility Testing** workflow run
3. Download the **accessibility-test-results** artifact
4. Review the Lighthouse accessibility report

### Common Issues and Fixes

#### Images Without Alt Text
```html
<!-- ❌ Bad -->
<img src="logo.png" />

<!-- ✅ Good -->
<img src="logo.png" alt="Company Logo" />
<img src="decorative.png" alt="" />
```

#### Form Inputs Without Labels
```html
<!-- ❌ Bad -->
<input type="text" id="name" />

<!-- ✅ Good -->
<label for="name">Name:</label>
<input type="text" id="name" />
```

#### Improper Heading Structure
```html
<!-- ❌ Bad -->
<h1>Main Title</h1>
<h3>Subsection</h3>

<!-- ✅ Good -->
<h1>Main Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
```

### Getting Help

If you encounter issues with the accessibility testing:

1. Check the GitHub Actions logs for detailed error messages
2. Review the Lighthouse accessibility report for specific violations
3. Use browser developer tools to test accessibility manually
4. Consider using screen readers for manual testing

### Contributing

When contributing to this repository:
1. Ensure your changes pass all accessibility tests
2. Add new test cases for any accessibility features you implement
3. Update documentation if you modify the testing configuration