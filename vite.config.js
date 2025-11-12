export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/employeeservice': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
}
