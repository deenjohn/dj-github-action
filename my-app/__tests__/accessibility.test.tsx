import { describe, test, expect } from 'vitest';

// Basic accessibility test helpers
function checkForAltText(html: string): boolean {
  const imgRegex = /<img[^>]*>/g;
  const matches = html.match(imgRegex) || [];
  
  for (const match of matches) {
    if (!match.includes('alt=')) {
      return false;
    }
  }
  return true;
}

function checkForFormLabels(html: string): boolean {
  const inputRegex = /<input[^>]*>/g;
  const matches = html.match(inputRegex) || [];
  
  for (const match of matches) {
    const hasAriaLabel = match.includes('aria-label=') || match.includes('aria-labelledby=');
    const hasId = match.includes('id=');
    
    if (hasId && !hasAriaLabel) {
      // Check if there's a corresponding label
      const idMatch = match.match(/id="([^"]*)"/);
      if (idMatch) {
        const id = idMatch[1];
        const labelRegex = new RegExp(`<label[^>]*for="${id}"[^>]*>`, 'g');
        if (!html.match(labelRegex)) {
          return false;
        }
      }
    }
  }
  return true;
}

function checkForHeadingStructure(html: string): boolean {
  const headingRegex = /<h([1-6])[^>]*>/g;
  const matches = html.match(headingRegex) || [];
  let previousLevel = 0;
  
  for (const match of matches) {
    const levelMatch = match.match(/<h([1-6])/);
    if (levelMatch) {
      const level = parseInt(levelMatch[1]);
      if (level > previousLevel + 1) {
        return false; // Skip levels
      }
      previousLevel = level;
    }
  }
  return true;
}

function checkForButtonNames(html: string): boolean {
  const buttonRegex = /<button[^>]*>.*?<\/button>/g;
  const matches = html.match(buttonRegex) || [];
  
  for (const match of matches) {
    const hasText = match.includes('>') && match.includes('</button>') && 
                   match.replace(/<[^>]*>/g, '').trim().length > 0;
    const hasAriaLabel = match.includes('aria-label=');
    const hasTitle = match.includes('title=');
    
    if (!hasText && !hasAriaLabel && !hasTitle) {
      return false;
    }
  }
  return true;
}

function checkForLinkText(html: string): boolean {
  const linkRegex = /<a[^>]*>.*?<\/a>/g;
  const matches = html.match(linkRegex) || [];
  
  for (const match of matches) {
    const hasText = match.includes('>') && match.includes('</a>') && 
                   match.replace(/<[^>]*>/g, '').trim().length > 0;
    const hasAriaLabel = match.includes('aria-label=');
    const hasTitle = match.includes('title=');
    
    if (!hasText && !hasAriaLabel && !hasTitle) {
      return false;
    }
  }
  return true;
}

describe('Accessibility Tests', () => {
  test('should have proper image alt text', () => {
    const html = `
      <img src="test.jpg" alt="Test image description" />
      <img src="decorative.jpg" alt="" />
    `;
    
    expect(checkForAltText(html)).toBe(true);
  });

  test('should have proper form labels', () => {
    const html = `
      <form>
        <label for="name">Name:</label>
        <input id="name" type="text" />
        <label for="email">Email:</label>
        <input id="email" type="email" />
        <button type="submit">Submit</button>
      </form>
    `;
    
    expect(checkForFormLabels(html)).toBe(true);
  });

  test('should have proper heading structure', () => {
    const html = `
      <h1>Main Heading</h1>
      <h2>Sub Heading</h2>
      <h3>Sub Sub Heading</h3>
    `;
    
    expect(checkForHeadingStructure(html)).toBe(true);
  });

  test('should have proper button names', () => {
    const html = `
      <button>Submit Form</button>
      <button aria-label="Close dialog">×</button>
      <button title="Help">?</button>
    `;
    
    expect(checkForButtonNames(html)).toBe(true);
  });

  test('should have proper link text', () => {
    const html = `
      <a href="/about">About Us</a>
      <a href="/contact">Contact Information</a>
      <a href="/help" aria-label="Help and support page">Learn more</a>
    `;
    
    expect(checkForLinkText(html)).toBe(true);
  });

  test('should detect missing alt text', () => {
    const html = `
      <img src="test.jpg" />
      <img src="decorative.jpg" alt="" />
    `;
    
    expect(checkForAltText(html)).toBe(false);
  });

  test('should detect missing form labels', () => {
    const html = `
      <form>
        <input id="name" type="text" />
        <label for="email">Email:</label>
        <input id="email" type="email" />
      </form>
    `;
    
    expect(checkForFormLabels(html)).toBe(false);
  });

  test('should detect improper heading structure', () => {
    const html = `
      <h1>Main Heading</h1>
      <h3>Sub Sub Heading</h3>
    `;
    
    expect(checkForHeadingStructure(html)).toBe(false);
  });

  test('should detect missing button names', () => {
    const html = `
      <button>Submit Form</button>
      <button></button>
    `;
    
    expect(checkForButtonNames(html)).toBe(true);
  });

  test('should detect missing link text', () => {
    const html = `
      <a href="/about">About Us</a>
      <a href="/contact"></a>
    `;
    
    expect(checkForLinkText(html)).toBe(false);
  });
}); 