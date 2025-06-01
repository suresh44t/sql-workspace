/// <reference types="react-scripts" /> 

// Define types for loading image assets
declare module '*.svg' { 
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>; 
  export default content; 
} 

declare module '*.png' { 
  const content: string; 
  export default content; 
} 

declare module '*.jpg' { 
  const content: string; 
  export default content; 
} 

declare module '*.jpeg' { 
  const content: string; 
  export default content; 
} 

declare module '*.gif' { 
  const content: string; 
  export default content; 
} 

// Define types for loading style modules
declare module '*.scss' { 
  const content: { [className: string]: string }; 
  export default content; 
} 

// Define types for loading CSS modules
declare module '*.css' { 
  const content: { [className: string]: string }; 
  export default content; 
} 

// Define available environment variables
declare namespace NodeJS { 
  // Environment variable types
  interface ProcessEnv { 
    NODE_ENV: 'development' | 'production' | 'test'; 
    PUBLIC_URL: string; 
    SQL_WORKSPACE_API_URL?: string; 
  } 
}
