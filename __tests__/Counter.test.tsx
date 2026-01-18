import { screen, fireEvent } from '@testing-library/react'
import Counter from '../components/Counter'
import { renderWithProviders } from '@/tests/test-utils'

describe('Componente Counter', () => {
  test('debe mostrar el valor inicial de 0', () => {
    renderWithProviders(<Counter />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('debe incrementar el valor al hacer clic en +', () => {
    renderWithProviders(<Counter />)
    const btnIncrementar = screen.getByText('+')
    
    fireEvent.click(btnIncrementar)
    
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})