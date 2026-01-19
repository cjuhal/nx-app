import { fireEvent, screen } from '@testing-library/react'
import User from '../components/User'
import { renderWithProviders } from '@/tests/test-utils'

const estadoSimulado = {
    user: {
        data: {
            name: 'Pepito Perez',
            email: 'pepito@test.com',
            age: 30,
            picture: null
        },
        loading: false,
        error: null
    }
};


describe('Componente User', () => {
    test('debe mostrar el mensaje cuando no hay foto', () => {
        renderWithProviders(<User />, { preloadedState: estadoSimulado })

        // Verificamos que el texto de "no hay foto" esté presente
        expect(screen.getByText(/no hay foto disponible/i)).toBeInTheDocument()
    })

    test('debe mostrar los datos del usuario inicial', () => {

        renderWithProviders(<User />, { preloadedState: estadoSimulado })
        expect(screen.getByText('Pepito Perez')).toBeInTheDocument();
        expect(screen.getByText(/pepito@test.com/i)).toBeInTheDocument();
    })

    test('cargar imagen y que se vea', () => {
        renderWithProviders(<User />, { preloadedState: estadoSimulado })
        const button = screen.getByText(/Upload picture/i);
        fireEvent.click(button)
        expect(screen.getByRole('img', { alt: /Foto de perfil de/i })).toHaveAttribute('src', '/next.svg')
    })

    test('debe haber imagen y no texto', () => {
        renderWithProviders(<User />, { preloadedState: estadoSimulado })
        const text = screen.getByText(/no hay foto disponible/i);
        const buttonUpload = screen.getByText(/Upload picture/i);
        fireEvent.click(buttonUpload)
        expect(text).not.toBeInTheDocument()
    })

    test('debe mostrar el mensaje de carga', () => {
        renderWithProviders(<User />, {
            preloadedState: { user: { data: null, loading: true, error: null } }
        });

        expect(screen.getByText(/cargando/i)).toBeInTheDocument();
    });

    test('eliminar una imagen', () => {
        renderWithProviders(<User />, { preloadedState: estadoSimulado })
        const buttonUpload = screen.getByText(/Upload picture/i);
        fireEvent.click(buttonUpload)
        const buttonRemove = screen.getByText(/Remove picture/i);
        fireEvent.click(buttonRemove)
        expect(screen.getByText(/no hay foto disponible/i)).toBeInTheDocument()
    })
})