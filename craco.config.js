const path = require('path'); 

module.exports = { 
  webpack: { 
    alias: { 
      '@': path.resolve(__dirname, 'src'), 
      '@components': path.resolve(__dirname, 'src/components'), 
      '@common': path.resolve(__dirname, 'src/components/common'), 
      '@features': path.resolve(__dirname, 'src/components/features'), 
      '@store': path.resolve(__dirname, 'src/store'), 
      '@hooks': path.resolve(__dirname, 'src/store/hooks'), 
      '@slices': path.resolve(__dirname, 'src/store/slices'), 
      '@styles': path.resolve(__dirname, 'src/styles'), 
      '@utils': path.resolve(__dirname, 'src/utils'), 
      '@types': path.resolve(__dirname, 'src/types'), 
      '@constants': path.resolve(__dirname, 'src/constants'), 
      '@tests': path.resolve(__dirname, 'src/tests') 
    }, 
    configure: (webpackConfig, { env }) => { 
      if (env === 'production') { 
        webpackConfig.optimization = { 
          splitChunks: { 
            chunks: 'all', 
            cacheGroups: { 
              codemirror: { 
                test: /[\\/]node_modules[\\/](@codemirror|@uiw[\\/]codemirror)[\\/]/, 
                name: 'vendor-codemirror', 
                chunks: 'all', 
                enforce: true 
              }, 
              tanstack: { 
                test: /[\\/]node_modules[\\/]@tanstack[\\/]/, 
                name: 'vendor-tanstack', 
                chunks: 'all', 
                enforce: true 
              }, 
              xlsx: { 
                test: /[\\/]node_modules[\\/]xlsx[\\/]/, 
                name: 'vendor-xlsx', 
                chunks: 'all', 
                enforce: true 
              } 
            } 
          }, 
          usedExports: true, 
          sideEffects: true 
        }; 
      } 
      return webpackConfig; 
    } 
  }, 
  jest: { 
    configure: { 
      moduleNameMapper: { 
        '^@/(.*)$': '<rootDir>/src/$1', 
        '^@components/(.*)$': '<rootDir>/src/components/$1', 
        '^@common/(.*)$': '<rootDir>/src/components/common/$1', 
        '^@features/(.*)$': '<rootDir>/src/components/features/$1', 
        '^@store/(.*)$': '<rootDir>/src/store/$1', 
        '^@hooks/(.*)$': '<rootDir>/src/store/hooks/$1', 
        '^@slices/(.*)$': '<rootDir>/src/store/slices/$1', 
        '^@styles/(.*)$': '<rootDir>/src/styles/$1', 
        '^@utils/(.*)$': '<rootDir>/src/utils/$1', 
        '^@types/(.*)$': '<rootDir>/src/types/$1', 
        '^@constants/(.*)$': '<rootDir>/src/constants/$1', 
        '^@tests/(.*)$': '<rootDir>/src/tests/$1' 
      } 
    } 
  }, 
  style: { 
    sass: { 
      loaderOptions: { 
        additionalData: `@import "@/styles/_variables.scss";` 
      } 
    } 
  } 
}; 
