import { render } from '@testing-library/react';
import SignUp from '../Login/Signup';
import { AuthContextProvider } from '../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

describe('Login component', () => {
  let page;

  beforeEach(() => {
    page = render(
      <AuthContextProvider>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </AuthContextProvider>
    ).container;
  });

  it('renders all input fields', () => {
    expect(page.querySelector('#email')).toBeInTheDocument();
    expect(page.querySelector('#password')).toBeInTheDocument();
    expect(page.querySelector('#firstName')).toBeInTheDocument();
    expect(page.querySelector('#lastName')).toBeInTheDocument();
    expect(page.querySelector('button[type="submit"]')).toBeInTheDocument();
  });
});
