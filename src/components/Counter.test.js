import React from 'react';  // Importa React para usar JSX en las pruebas
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter'; // Importa tu componente

describe('Counter', () => {
    it('debe mostrar el contador con valor inicial 0', () => {
        render(<Counter />); // Renderiza el componente
        const counterElement = screen.getByRole('heading', { name: /contador/i }); // Mejor usar expresiones regulares para nombres
        expect(counterElement.textContent).toBe('Contador: 0');
    });

    it('debe incrementar el contador al hacer clic en el botón', () => {
        render(<Counter />);
        const incrementButton = screen.getByText('Incrementar');
        fireEvent.click(incrementButton);
        const counterElement = screen.getByRole('heading', { name: /contador/i });
        expect(counterElement.textContent).toBe('Contador: 1');
    });
});