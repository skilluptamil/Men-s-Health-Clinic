const fs = require('fs');
const path = require('path');

console.log('=== RUNNING COMPREHENSIVE BLOG ROUTING TEST ===\n');

const blogHtml = fs.readFileSync(path.join(__dirname, '..', 'blog.html'), 'utf-8');
const blogDetailsHtml = fs.readFileSync(path.join(__dirname, '..', 'blog-details.html'), 'utf-8');
const mainJs = fs.readFileSync(path.join(__dirname, '..', 'assets', 'js', 'main.js'), 'utf-8');
const styleCss = fs.readFileSync(path.join(__dirname, '..', 'assets', 'css', 'style.css'), 'utf-8');

// 1. Verify required DOM element IDs in blog-details.html
const requiredIds = [
  'blog-hero-section',
  'blog-breadcrumb-title',
  'blog-hero-category',
  'blog-hero-date',
  'blog-hero-readtime',
  'blog-hero-title',
  'blog-hero-desc',
  'blog-main-image',
  'blog-takeaways-container',
  'blog-takeaways-list',
  'blog-full-content',
  'blog-author-card',
  'blog-author-image',
  'blog-author-name',
  'blog-author-role',
  'blog-comments-heading',
  'blog-comments-list',
  'blog-related-grid',
  'blog-cta-title',
  'blog-cta-desc',
  'blog-cta-btn',
  'page-head-title',
  'page-meta-desc'
];

console.log('1. Checking DOM Element IDs in blog-details.html:');
let missingIds = [];
requiredIds.forEach(id => {
  if (!blogDetailsHtml.includes(`id="${id}"`)) {
    missingIds.push(id);
  }
});

if (missingIds.length === 0) {
  console.log('  [PASS] All 23 required DOM element IDs are present in blog-details.html');
} else {
  console.error('  [FAIL] Missing DOM IDs:', missingIds);
}

// 2. Extract and test BLOGS_DATA from main.js
console.log('\n2. Testing BLOGS_DATA in main.js:');
const vm = require('vm');
const sandbox = {
  document: {
    addEventListener: () => {},
    documentElement: { getAttribute: () => 'light', setAttribute: () => {} },
    querySelectorAll: () => [],
    getElementById: () => null,
    querySelector: () => null
  },
  window: {
    matchMedia: () => ({ matches: false }),
    location: { hash: '', search: '', pathname: 'blog-details.html' },
    addEventListener: () => {}
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  }
};
vm.createContext(sandbox);

try {
  vm.runInContext(mainJs + '\nBLOGS_DATA_EXPORT = BLOGS_DATA;', sandbox);
  const blogsData = sandbox.BLOGS_DATA_EXPORT;
  if (!blogsData) {
    throw new Error('BLOGS_DATA not defined in sandbox');
  }

  const blogKeys = ['trt', 'rezum', 'shockwave', 'kidney-stones', 'andropause', 'vasectomy', 'psa'];
  console.log(`  [PASS] Found ${Object.keys(blogsData).length} total blog keys and aliases.`);

  blogKeys.forEach(k => {
    const post = blogsData[k];
    if (!post) {
      console.error(`  [FAIL] Missing blog key: ${k}`);
      return;
    }
    console.log(`  - Checking article: "${post.title}" (${k})`);
    
    // Check image file exists
    const imgPath = path.join(__dirname, '..', post.image);
    if (fs.existsSync(imgPath)) {
      console.log(`    [PASS] Featured image exists: ${post.image}`);
    } else {
      console.error(`    [FAIL] Featured image NOT found: ${post.image}`);
    }

    // Check author image file exists
    const authorImgPath = path.join(__dirname, '..', post.author.image);
    if (fs.existsSync(authorImgPath)) {
      console.log(`    [PASS] Author image exists: ${post.author.image}`);
    } else {
      console.error(`    [FAIL] Author image NOT found: ${post.author.image}`);
    }

    // Check content and takeaways
    if (post.takeaways && post.takeaways.length >= 3 && post.content && post.content.length > 200) {
      console.log(`    [PASS] Rich content verified: ${post.takeaways.length} takeaways, ${post.content.length} chars content.`);
    } else {
      console.error(`    [FAIL] Incomplete content for ${k}`);
    }
  });

} catch (err) {
  console.error('  [FAIL] Error running main.js in sandbox:', err);
}

// 3. Verify all blog heading links in blog.html
console.log('\n3. Checking links in blog.html:');
const expectedHashes = ['#trt', '#rezum', '#shockwave', '#kidney-stones', '#andropause', '#vasectomy', '#psa'];
expectedHashes.forEach(h => {
  if (blogHtml.includes(`href="blog-details.html${h}"`)) {
    console.log(`  [PASS] Found exact link: blog-details.html${h}`);
  } else {
    console.error(`  [FAIL] Missing link: blog-details.html${h}`);
  }
});

// 4. Verify responsive CSS
console.log('\n4. Checking responsive styling in style.css:');
const responsiveBreakpoints = ['@media (max-width: 1024px)', '@media (max-width: 768px)', '@media (max-width: 480px)'];
responsiveBreakpoints.forEach(bp => {
  if (styleCss.includes(bp)) {
    console.log(`  [PASS] Found breakpoint: ${bp}`);
  } else {
    console.warn(`  [WARN] Missing breakpoint: ${bp}`);
  }
});

console.log('\n=== ALL VERIFICATION TESTS COMPLETED ===');
