export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} Portfolio Marcos Martilotta. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 md:mt-0">Desarrollador Full Stack</p>
        </div>
      </div>
    </footer>
  )
}
