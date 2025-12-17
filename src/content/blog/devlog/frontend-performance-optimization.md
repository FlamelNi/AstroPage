---
title: "Frontend Performance Optimization"
date: 2024-12-28
description: "Achieving 90+ Lighthouse scores through systematic optimization"
tags: ["frontend", "performance", "optimization", "web-vitals"]
draft: false
---

# Frontend Performance Optimization

Performance optimization has been a major focus this month. After noticing our Lighthouse scores were dipping below 70, I embarked on a comprehensive optimization journey that's resulted in consistent 90+ scores across all metrics. Here's how we did it.

## Initial Performance Assessment

First, I conducted a thorough audit of our application:

```typescript
// Performance monitoring setup
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to our analytics dashboard
  analytics.track('Core Web Vital', {
    name: metric.name,
    value: metric.value,
    id: metric.id,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Key Issues Identified

1. **Bundle Size**: 2.3MB initial JavaScript payload
2. **Render Blocking**: Critical CSS not inlined
3. **Image Optimization**: No lazy loading or format optimization
4. **Unused Code**: 40% of JavaScript never executed
5. **Network Requests**: 143 requests on initial load

## Optimization Strategy

### 1. Bundle Size Reduction

#### Code Splitting Implementation

```typescript
// Lazy loading route components
const Dashboard = lazy(() =>
  import('./pages/Dashboard').then(module => ({
    default: module.Dashboard
  }))
);

const Settings = lazy(() =>
  import('./pages/Settings').then(module => ({
    default: module.Settings
  }))
);

// With loading fallback
<Suspense fallback={<PageSpinner />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
</Suspense>
```

#### Tree Shaking Configuration

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'ui': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'charts': ['recharts', 'd3'],
          'utils': ['lodash', 'date-fns', 'axios']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
}
```

### 2. Critical CSS Optimization

```typescript
// Critical CSS extraction
import { extractCritical } from '@emotion/server';

export async function renderToStream(url: string) {
  const html = renderToString(<App />);
  const { css, ids } = extractCritical(html);

  return {
    html,
    criticalCss: `<style data-emotion="${ids.join(' ')}">${css}</style>`
  };
}
```

### 3. Image Optimization Pipeline

```typescript
// Custom image component with optimization
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate responsive image sources
  const generateSrcSet = (originalSrc: string) => {
    const widths = [320, 640, 960, 1280, 1920];
    return widths
      .map(w => `${originalSrc}?w=${w}&q=80 ${w}w`)
      .join(', ');
  };

  return (
    <div ref={imgRef} className="image-container">
      {isInView && (
        <picture>
          <source
            type="image/webp"
            srcSet={generateSrcSet(src).replace(/\.jpg/g, '.webp')}
          />
          <img
            src={`${src}?w=1280&q=80`}
            srcSet={generateSrcSet(src)}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
        </picture>
      )}
      {!isLoaded && <ImageSkeleton width={width} height={height} />}
    </div>
  );
};
```

### 4. Caching Strategy

```typescript
// Service worker for offline support
const CACHE_NAME = 'app-v1.0.0';
const STATIC_ASSETS = [
  '/',
  '/static/js/main.bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request).then(response => {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseClone));
            return response;
          });
        })
    );
  }
});
```

### 5. Runtime Performance Optimizations

```typescript
// Virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window';

const VirtualizedList: React.FC<{ items: any[] }> = ({ items }) => {
  const Row = ({ index, style }: { index: number; style: any }) => (
    <div style={style}>
      <ListItem item={items[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={80}
      overscanCount={5}
    >
      {Row}
    </List>
  );
};

// Memoization for expensive calculations
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      computed: expensiveCalculation(item)
    }));
  }, [data]);

  return <DataGrid data={processedData} />;
});

// Debounced search
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

## Monitoring and Measurement

### Real User Monitoring (RUM)

```typescript
// Performance tracking implementation
class PerformanceTracker {
  static mark(name: string) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name);
    }
  }

  static measure(name: string, startMark: string, endMark: string) {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.measure(name, startMark, endMark);
      const measure = window.performance.getEntriesByName(name)[0];
      this.sendToAnalytics(name, measure.duration);
    }
  }

  private static sendToAnalytics(name: string, duration: number) {
    // Send to analytics service
    gtag('event', 'performance_metric', {
      metric_name: name,
      metric_value: Math.round(duration),
      custom_parameter: 'frontend'
    });
  }
}

// Usage in components
function MyComponent() {
  useEffect(() => {
    PerformanceTracker.mark('component-render-start');

    // Component logic here

    PerformanceTracker.mark('component-render-end');
    PerformanceTracker.measure('component-render', 'component-render-start', 'component-render-end');
  });

  return <div>...</div>;
}
```

## Results

### Before Optimization

- **First Contentful Paint**: 3.2s
- **Largest Contentful Paint**: 5.8s
- **Cumulative Layout Shift**: 0.45
- **First Input Delay**: 280ms
- **Bundle Size**: 2.3MB

### After Optimization

- **First Contentful Paint**: 1.1s (-65%)
- **Largest Contentful Paint**: 1.9s (-67%)
- **Cumulative Layout Shift**: 0.05 (-89%)
- **First Input Delay**: 45ms (-84%)
- **Bundle Size**: 580KB (-75%)

## Ongoing Optimization

1. **Performance Budgets**: Automated checks to prevent regressions
2. **Real-World Monitoring**: Tracking actual user experiences
3. **A/B Testing**: Validating optimization impact
4. **Regular Audits**: Monthly performance reviews

## Tools and Resources

- **Lighthouse CI**: Automated performance testing
- **Bundle Analyzer**: Visualizing bundle composition
- **WebPageTest**: Cross-browser performance testing
- **Chrome DevTools**: Detailed performance profiling

## Key Takeaways

1. **Measure First**: You can't optimize what you don't measure
2. **Focus on Impact**: Prioritize changes that affect real users
3. **Optimize Incrementally**: Small wins compound over time
4. **Consider the Full Pipeline**: From server to browser
5. **Monitor Continuously**: Performance can regress quickly

Performance optimization is an ongoing journey, not a destination. By implementing these changes and establishing a culture of performance awareness, we've created a foundation for continued improvement.

The user experience has improved dramatically, and our engagement metrics reflect this - bounce rates are down 35%, and time on site has increased by 42%. Performance isn't just a metric; it's a feature that directly impacts user satisfaction. ⚡🚀