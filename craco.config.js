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
      // Development mode optimizations
      if (env === 'development') {
        webpackConfig.cache = {
          type: 'filesystem',
          cacheDirectory: path.resolve(__dirname, '.webpack-cache'),
          buildDependencies: {
            config: [__filename]
          }
        };
      }
      
      // Production mode optimizations
      if (env === 'production') {
        webpackConfig.optimization = { 
          splitChunks: { 
            chunks: 'all', 
            // minSize: 50000,   // 50KB - allow smaller chunks for codemirror modules
            // maxSize: 500000,  // 150KB - keep individual chunks manageable
            cacheGroups: {
              fakerjs: {
                test: /[\\/]node_modules[\\/]@faker-js[\\/]/,
                name: 'vendor-faker',
                chunks: 'async',
                priority: 15,
                enforce: true
              },
              codeMirrorCore: {
                test: /[\\/]node_modules[\\/]@uiw[\\/]react-codemirror[\\/]/,
                name: 'codemirror-core',
                chunks: 'all',
                enforce: true,
                priority: 12
              },
              codeMirrorSql: {
                test: /[\\/]node_modules[\\/]@codemirror[\\/]lang-sql[\\/]/,
                name: 'codemirror-sql',
                chunks: 'all',
                enforce: true,
                priority: 11
              },
              codeMirrorTheme: {
                test: /[\\/]node_modules[\\/]@uiw[\\/]codemirror-theme-vscode[\\/]/,
                name: 'codemirror-theme',
                chunks: 'all',
                enforce: true,
                priority: 10
              },
              tanstack: { 
                test: /[\\/]node_modules[\\/]@tanstack[\\/]/, 
                name: 'vendor-tanstack', 
                chunks: 'all', 
                enforce: true 
              },
              react: {
                test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
                name: 'vendor-react',
                chunks: 'all',
                priority: 20,
                reuseExistingChunk: true
              },
              commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
                minChunks: 2,
                priority: -10,
                reuseExistingChunk: true
              }
            }
          },
          moduleIds: 'deterministic', 
          chunkIds: 'deterministic', 
          usedExports: true, 
          minimize: true, 
          concatenateModules: true,
          runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
          },
          realContentHash: true
        };

        // Remove performance hints in production as they are not relevant for our case
        webpackConfig.performance = {
          hints: false
        };

        // Ignore certain files in production
        webpackConfig.module.rules.push({
          test: /\.test\.|stories\.|spec\./,
          loader: 'ignore-loader'
        });

        webpackConfig.output = { 
          ...webpackConfig.output, 
          filename: 'static/js/[name].[contenthash:8].js', 
          chunkFilename: 'static/js/[name].[contenthash:8].chunk.js', 
          assetModuleFilename: 'static/media/[name].[contenthash:8][ext]' 
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
