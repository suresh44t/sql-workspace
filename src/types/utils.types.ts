import { Metric } from 'web-vitals'; 

// Data export format options
export type ExportFormatType = 'csv' | 'xlsx' | 'json'; 

// Performance metric interfaces
export interface CLSMetricInterface extends Metric { 
  value: number; 
  name: 'CLS'; 
} 

export interface FIDMetricInterface extends Metric { 
  value: number; 
  name: 'FID'; 
} 

export interface FCPMetricInterface extends Metric { 
  value: number; 
  name: 'FCP'; 
} 

export interface LCPMetricInterface extends Metric { 
  value: number; 
  name: 'LCP'; 
} 

export interface TTFBMetricInterface extends Metric { 
  value: number; 
  name: 'TTFB'; 
} 

// Performance monitoring types
export type ReportHandlerType = (metric: Metric) => void; 

export type MetricKeyType = 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB'; 
export type MetricRatingType = ['Good' | 'Needs Improvement' | 'Poor', string]; 

// Performance threshold configuration
export interface BenchmarkInterface { 
  good: number; 
  needsImprovement: number; 
  label?: string; 
} 

export interface BenchmarksInterface { 
  CLS: BenchmarkInterface; 
  FID: BenchmarkInterface; 
  FCP: BenchmarkInterface; 
  LCP: BenchmarkInterface; 
  TTFB: BenchmarkInterface; 
} 

// Status color mapping
export interface ColorCodesInterface { 
  [key: string]: string; 
} 

// Performance report data structure
export interface MetricRowDataInterface { 
  Metric: string; 
  Value: string; 
  Threshold: string; 
  Difference: string; 
  Status: string; 
}
