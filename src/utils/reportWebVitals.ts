import { 
  ReportHandlerType, 
  CLSMetricInterface, 
  FIDMetricInterface, 
  FCPMetricInterface, 
  LCPMetricInterface, 
  TTFBMetricInterface, 
  BenchmarksInterface, 
  MetricKeyType, 
  MetricRatingType, 
  MetricRowDataInterface 
} from '@/types'; 

// Performance metric thresholds
const benchmarks: BenchmarksInterface = { 
  CLS: { good: 0.1, needsImprovement: 0.25, label: 'Cumulative Layout Shift' }, 
  FID: { good: 100, needsImprovement: 300, label: 'First Input Delay' }, 
  FCP: { good: 1800, needsImprovement: 3000, label: 'First Contentful Paint' }, 
  LCP: { good: 2500, needsImprovement: 4000, label: 'Largest Contentful Paint' }, 
  TTFB: { good: 800, needsImprovement: 1800, label: 'Time to First Byte' } 
}; 

// Calculate metric rating based on value
const getRating = (metric: MetricKeyType, value: number): MetricRatingType => { 
  const benchmark = benchmarks[metric]; 
  if (value <= benchmark.good) { 
    return ['Good', '#4caf50']; 
  } else if (value <= benchmark.needsImprovement) { 
    return ['Needs Improvement', '#ff9800']; 
  } else { 
    return ['Poor', '#f44336']; 
  } 
}; 

// Convert metric value to readable format
const formatValueWithUnit = (metric: MetricKeyType, value: number): string => { 
  switch (metric) { 
    case 'CLS': 
      return value.toFixed(3); 
    case 'FID': 
    case 'FCP': 
    case 'LCP': 
    case 'TTFB': 
      return value >= 1000 
        ? `${(value / 1000).toFixed(2)}s` 
        : `${value.toFixed(0)}ms`; 
    default: 
      return value.toFixed(2); 
  } 
}; 


// Display formatted metric data in console
const printMetricTable = (metric: MetricKeyType, value: number): void => { 
  const benchmark = benchmarks[metric]; 
  const [rating, hexColor] = getRating(metric, value); 

  const threshold = benchmark.good; 
  const diff = value - threshold; 

  const rawValue = formatValueWithUnit(metric, value); 
  const rawThreshold = formatValueWithUnit(metric, threshold); 
  const rawDiff = formatValueWithUnit(metric, diff); 

  // Console styles for output
  const styleValue = `color: ${hexColor}; font-weight: bold`;
  const styleNormal = 'color: inherit';

  // Format row data for table
  const row: MetricRowDataInterface = { 
    Metric: metric, 
    Value: rawValue, 
    Threshold: rawThreshold, 
    Difference: rawDiff, 
    Status: rating 
  }; 

  // Determine column widths
  const headers = Object.keys(row); 
  const widths = headers.map((h) => Math.max(h.length, row[h as keyof typeof row].length)); 

  // Pad cells to match column width
  const formatCell = (str: string, width: number) => 
    str + ' '.repeat(width - str.length);

  // Generate table structure
  const headerRow = `│ ${headers.map((h, i) => formatCell(h, widths[i])).join(' │ ')} │`; 
  const separator = `├${widths.map(w => '─'.repeat(w + 2)).join('┼')}┤`; 
  const dataRow = `│ ${[ 
    formatCell(metric, widths[0]), 
    `%c${formatCell(rawValue, widths[1])}%c`, 
    formatCell(rawThreshold, widths[2]), 
    `%c${formatCell(rawDiff, widths[3])}%c`, 
    `%c${formatCell(rating, widths[4])}%c` 
  ].join(' │ ')} │`; 
  const borderTop = `┌${widths.map(w => '─'.repeat(w + 2)).join('┬')}┐`; 
  const borderBottom = `└${widths.map(w => '─'.repeat(w + 2)).join('┴')}┘`; 

  // Output metric table
  const label = benchmark.label || metric; 
  console.group(`Web Vital: ${label} (${metric})`); 
  // Output table with styles
  console.log(
    [borderTop, headerRow, separator].join('\n')
  );
  console.log(
    dataRow, 
    styleValue, styleNormal, 
    styleValue, styleNormal,
    styleValue, styleNormal
  );
  console.log(borderBottom);
  console.groupEnd(); 
}; 

// Initialize web vitals monitoring
export const reportWebVitals = (onPerfEntry?: ReportHandlerType): void => { 
  if (onPerfEntry && onPerfEntry instanceof Function) { 
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => { 
      getCLS((metric: CLSMetricInterface) => { 
        printMetricTable('CLS', metric.value); 
        // onPerfEntry(metric); 
      }); 

      getFID((metric: FIDMetricInterface) => { 
        printMetricTable('FID', metric.value); 
        // onPerfEntry(metric); 
      }); 

      getFCP((metric: FCPMetricInterface) => { 
        printMetricTable('FCP', metric.value); 
        // onPerfEntry(metric); 
      }); 

      getLCP((metric: LCPMetricInterface) => { 
        printMetricTable('LCP', metric.value); 
        // onPerfEntry(metric); 
      }); 

      getTTFB((metric: TTFBMetricInterface) => { 
        printMetricTable('TTFB', metric.value); 
        // onPerfEntry(metric); 
      }); 
    }); 
  } 
};
