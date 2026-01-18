import { fireEvent, screen } from '@testing-library/react'
import User from '../components/User'
import { renderWithProviders } from '@/tests/test-utils'

describe('Componente User', () => {
    test('debe mostrar el mensaje cuando no hay foto', () => {
        renderWithProviders(<User />)

        // Verificamos que el texto de "no hay foto" esté presente
        expect(screen.getByText(/no hay foto disponible/i)).toBeInTheDocument()
    })

    test('debe mostrar los datos del usuario inicial', () => {
        renderWithProviders(<User />)

        // Aquí podrías verificar el nombre o el email
        expect(screen.getByText(/cj/i)).toBeInTheDocument()
    })

    test('cargar imagen y que se vea', () => {
        renderWithProviders(<User />)
        const button = screen.getByText(/upload picture/i);
        fireEvent.click(button)
        expect(screen.getByRole('img', { alt: /picture/i })).toHaveAttribute('src', '/next.svg')
    })

    test('debe haber imagen y no texto', () => {
        renderWithProviders(<User />)
        const text = screen.getByText(/no hay foto disponible/i);
        const buttonUpload = screen.getByText(/upload picture/i);
        fireEvent.click(buttonUpload)
        expect(text).not.toBeInTheDocument()
    })

    test('eliminar una imagen', () => {
        renderWithProviders(<User />)
        const buttonUpload = screen.getByText(/upload picture/i);
        fireEvent.click(buttonUpload)
        const buttonRemove = screen.getByText(/remote picture/i);
        fireEvent.click(buttonRemove)
        expect(screen.getByText(/no hay foto disponible/i)).toBeInTheDocument()
    })
})