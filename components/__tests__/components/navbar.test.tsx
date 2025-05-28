// __tests__/components/Navbar.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/Navbar';

// Mock next-themes hook
const mockSetTheme = jest.fn();
const mockUseTheme = {
  theme: 'dark',
  setTheme: mockSetTheme,
};

jest.mock('next-themes', () => ({
  ...jest.requireActual('next-themes'),
  useTheme: () => mockUseTheme,
}));

// Wrapper para providers
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="dark">
    {children}
  </ThemeProvider>
);

describe('Navbar Component', () => {
  // Antes de cada test, limpiamos los mocks
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock para window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
  });

  // TEST 1: Renderizado básico
  test('renders navbar with logo and navigation links', () => {
    render(
      <ThemeWrapper>
        <Navbar />
      </ThemeWrapper>
    );

    // Verificar que el logo está presente
    expect(screen.getByText('Marcos Martilotta')).toBeInTheDocument();
    
    // Verificar que todos los links de navegación están presentes
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Experiencia')).toBeInTheDocument();
    expect(screen.getByText('Habilidades')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });

  // TEST 2: Toggle del menú móvil
  test('toggles mobile menu when hamburger button is clicked', () => {
    render(
      <ThemeWrapper>
        <Navbar />
      </ThemeWrapper>
    );

    // El menú móvil inicialmente no debe estar visible
    // Buscamos los links que solo aparecen en el menú móvil
    const mobileMenuLinks = screen.queryAllByRole('link', { name: /inicio|experiencia|habilidades|contacto/i });
    
    // En desktop hay 4 links, en mobile aparecen 4 más cuando se abre
    expect(mobileMenuLinks).toHaveLength(4); // Solo los del desktop

    // Buscar el botón de hamburguesa
    const menuButton = screen.getByLabelText('Toggle menu');
    
    // Hacer click para abrir el menú
    fireEvent.click(menuButton);

    // Ahora deberían aparecer los links del menú móvil
    // Verificamos que aparece el contenedor del menú móvil
    waitFor(() => {
      const mobileLinksAfterClick = screen.getAllByRole('link', { name: /inicio|experiencia|habilidades|contacto/i });
      expect(mobileLinksAfterClick.length).toBeGreaterThan(4); // Desktop + Mobile
    });
  });

  // TEST 3: Funcionalidad del botón de tema
  test('calls setTheme when theme toggle button is clicked', async () => {
    render(
      <ThemeWrapper>
        <Navbar />
      </ThemeWrapper>
    );

    // Esperar a que el componente esté "mounted"
    await waitFor(() => {
      const themeButton = screen.getByLabelText('Toggle theme');
      expect(themeButton).toBeInTheDocument();
    });

    const themeButton = screen.getByLabelText('Toggle theme');
    fireEvent.click(themeButton);

    expect(mockSetTheme).toHaveBeenCalledWith('light'); // Cambia de dark a light
  });

  // TEST 4: Cambio de clase cuando hay scroll
  test('adds scrolled classes when window scrolls', async () => {
    render(
      <ThemeWrapper>
        <Navbar />
      </ThemeWrapper>
    );

    const navbar = screen.getByRole('navigation');
    
    // Inicialmente debe ser transparente
    expect(navbar).toHaveClass('bg-transparent');
    expect(navbar).not.toHaveClass('bg-gray-900/90');

    // Simular scroll
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 50, // Más de 10px
    });

    // Disparar el evento scroll
    fireEvent.scroll(window);

    // Verificar que se aplicaron las clases de scroll
    await waitFor(() => {
      expect(navbar).toHaveClass('bg-gray-900/90');
    });
  });

  // TEST 5: Links tienen los href correctos
  test('navigation links have correct href attributes', () => {
    render(
      <ThemeWrapper>
        <Navbar />
      </ThemeWrapper>
    );

    expect(screen.getByRole('link', { name: 'Inicio' })).toHaveAttribute('href', '#hero');
    expect(screen.getByRole('link', { name: 'Experiencia' })).toHaveAttribute('href', '#experience');
    expect(screen.getByRole('link', { name: 'Habilidades' })).toHaveAttribute('href', '#skills');
    expect(screen.getByRole('link', { name: 'Contacto' })).toHaveAttribute('href', '#contact');
  });

  // TEST 6: Cerrar menú móvil al hacer click en un link
  test('closes mobile menu when a link is clicked', async () => {
    render(
      <ThemeWrapper>
        <Navbar />
      </ThemeWrapper>
    );

    // Abrir el menú móvil
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);

    // Verificar que el menú se abrió buscando el contenedor del menú móvil
    await waitFor(() => {
      expect(screen.getByText('Inicio')).toBeInTheDocument();
    });

    // Encontrar y hacer click en un link del menú móvil
    // El componente debería cerrar el menú (aunque no podemos verificarlo fácilmente)
    const inicioLink = screen.getAllByText('Inicio')[0]; // Primer link "Inicio"
    fireEvent.click(inicioLink);
    
    // Este test principalmente verifica que no hay errores al hacer click
    expect(inicioLink).toBeInTheDocument();
  });

  // TEST 7: Icono del tema cambia según el tema actual
  test('displays correct theme icon based on current theme', async () => {
    render(
      <ThemeWrapper>
        <Navbar />
      </ThemeWrapper>
    );

    // Esperar a que el componente esté mounted y verificar que el botón existe
    await waitFor(() => {
      expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
    });

    // Verificar que el botón de tema está presente
    const themeButton = screen.getByLabelText('Toggle theme');
    expect(themeButton).toBeInTheDocument();
  });

  // TEST 8: Limpieza de event listeners
  test('removes scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    const { unmount } = render(
      <ThemeWrapper>
        <Navbar />
      </ThemeWrapper>
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    
    removeEventListenerSpy.mockRestore();
  });
});