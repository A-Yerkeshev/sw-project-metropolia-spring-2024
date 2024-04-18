import { render, screen } from '@testing-library/react';
import Login from '../Login/Login';
import { AuthContextProvider } from '../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

describe('Login component', () => {
  let page;

  beforeEach(() => {
    page = render(
      <AuthContextProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContextProvider>
    ).container;
  });

  it('renders all input fields', () => {
    expect(page.querySelector('#email')).toBeInTheDocument();
    expect(page.querySelector('#password')).toBeInTheDocument();
    expect(page.querySelector('#login-btn')).toBeInTheDocument();
  });
});
