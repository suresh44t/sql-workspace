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
  ColorCodesInterface, 
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

// Clean up console color codes
const stripAnsi = (str: string) => str.replace(/\[\d+m|\[\d+;\d+m/g, ''); 

// Display formatted metric data in console
const printMetricTable = (metric: MetricKeyType, value: number): void => { 
  const benchmark = benchmarks[metric]; 
  const [rating, hexColor] = getRating(metric, value); 

  const threshold = benchmark.good; 
  const diff = value - threshold; 

  const rawValue = formatValueWithUnit(metric, value); 
  const rawThreshold = formatValueWithUnit(metric, threshold); 
  const rawDiff = formatValueWithUnit(metric, diff); 

  // Console output color mapping
  const colorCodes: ColorCodesInterface = { 
    '#4caf50': '[32m', 
    '#ff9800': '[33m', 
    '#f44336': '[31m', 
    reset: '[0m' 
  }; 

  const color = colorCodes[hexColor] || ''; 
  const {reset} = colorCodes; 

  const coloredValue = `${color}${rawValue}${reset}`; 
  const coloredStatus = `${color}${rating}${reset}`; 
  const coloredDiff = `${color}${rawDiff}${reset}`; 

  // Format row data for table
  const row: MetricRowDataInterface = { 
    Metric: metric, 
    Value: stripAnsi(coloredValue), 
    Threshold: rawThreshold, 
    Difference: stripAnsi(coloredDiff), 
    Status: stripAnsi(coloredStatus) 
  }; 

  // Determine column widths
  const headers = Object.keys(row); 
  const widths = headers.map((h) => Math.max(h.length, row[h as keyof typeof row].length)); 

  // Pad cells to match column width
  const formatCell = (str: string, width: number) => 
    str + ' '.repeat(width - stripAnsi(str).length); 

  // Generate table structure
  const headerRow = `│ ${headers.map((h, i) => formatCell(h, widths[i])).join(' │ ')} │`; 
  const separator = `├${widths.map(w => '─'.repeat(w + 2)).join('┼')}┤`; 
  const dataRow = `│ ${[ 
    formatCell(metric, widths[0]), 
    formatCell(coloredValue, widths[1]), 
    formatCell(rawThreshold, widths[2]), 
    formatCell(coloredDiff, widths[3]), 
    formatCell(coloredStatus, widths[4]) 
  ].join(' │ ')} │`; 
  const borderTop = `┌${widths.map(w => '─'.repeat(w + 2)).join('┬')}┐`; 
  const borderBottom = `└${widths.map(w => '─'.repeat(w + 2)).join('┴')}┘`; 

  // Output metric table
  const label = benchmark.label || metric; 
  console.group(`Web Vital: ${label} (${metric})`); 
  console.log([borderTop, headerRow, separator, dataRow, borderBottom].join('\n')); 
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
