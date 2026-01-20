import { fireEvent, screen } from '@testing-library/react'
import User from '../components/User'
import { renderWithProviders } from '@/tests/test-utils'

const estadoSimulado = {
    user: {
        data: {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
                street: "Kulas Light",
                suite: "Apt. 556",
                city: "Gwenborough",
                zipcode: "92998-3874",
                geo: {
                    lat: "-37.3159",
                    lng: "81.1496"
                }
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
                name: "Romaguera-Crona",
                catchPhrase: "Multi-layered client-server neural-net",
                bs: "harness real-time e-markets"
            }
        },
        loading: false,
        error: null
    }
};


describe('Componente User', () => {
    test('debe existir el boton ver más', () => {
        renderWithProviders(<User />, { preloadedState: estadoSimulado })

        // Verificamos que el texto de "no hay foto" esté presente
        expect(screen.getByText(/ver más/i)).toBeInTheDocument()
    })
    test('debe mostrar el mensaje cuando no hay foto', () => {
        renderWithProviders(<User />, { preloadedState: estadoSimulado })
        const button = screen.getByText(/ver más/i);
        fireEvent.click(button)

        // Verificamos que el texto de "no hay foto" esté presente
        expect(screen.getByText(/no hay foto disponible/i)).toBeInTheDocument()
    })

    test('debe mostrar los datos del usuario inicial', () => {

        renderWithProviders(<User />, { preloadedState: estadoSimulado })
        expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
        expect(screen.getByText(/Sincere@april.biz/i)).toBeInTheDocument();
    })

    test('cargar imagen y que se vea', () => {
        renderWithProviders(<User />, { preloadedState: estadoSimulado })
        const button = screen.getByText(/Upload picture/i);
        fireEvent.click(button)
        const button2 = screen.getByText(/ver más/i);
        fireEvent.click(button2)
        expect(screen.getByRole('img', { alt: /Foto de perfil de/i })).toHaveAttribute('src', '/next.svg')
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
        const button = screen.getByText(/ver más/i);
        fireEvent.click(button)
        expect(screen.getByText(/no hay foto disponible/i)).toBeInTheDocument()
    })
})