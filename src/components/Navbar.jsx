import { useLocation, useNavigate } from 'react-router-dom';

import logo from '../assets/img-logos/logo-Cesde-2023.svg';
import useAuth from '../hooks/useAuth';
import styles from '../styles/Navbar.module.css';

function Navbar({ user, onSignOut, cartItemCount = 0 }) {
  const userLabel = user?.name ?? 'Invitado';
  const isLoggedIn = Boolean(user);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const isHomeActive = location.pathname === '/' || location.pathname.startsWith('/category/');
  const isProductsActive = location.pathname === '/products';
  const isCartActive =
    location.pathname === '/cart' ||
    location.pathname === '/checkout' ||
    location.pathname === '/order-confirmation';
  const isAccountActive =
    location.pathname.startsWith('/user/') ||
    location.pathname === '/login' ||
    location.pathname === '/register';

  const handleAccountNavigation = () => {
    navigate(isLoggedIn ? '/user/profile' : '/login');
  };

  const handleSignOut = () => {
    logout();
    onSignOut?.();
    navigate('/', { replace: true });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <span className={styles.brandName}>Sistema Ventas</span>
      </div>

      <div className={styles.links}>
        <button
          type="button"
          className={`${styles.link} ${isHomeActive ? styles.active : ''}`}
          onClick={() => navigate('/')}
        >
          Inicio
        </button>
        <button
          type="button"
          className={`${styles.link} ${isProductsActive ? styles.active : ''}`}
          onClick={() => navigate('/products')}
        >
          Productos
        </button>
        <button
          type="button"
          className={`${styles.link} ${isCartActive ? styles.active : ''}`}
          onClick={() => navigate('/cart')}
        >
          Carrito
          {cartItemCount > 0 ? <span className={styles.cartBadge}>{cartItemCount}</span> : null}
        </button>
        <button
          type="button"
          className={`${styles.link} ${isAccountActive ? styles.active : ''}`}
          onClick={handleAccountNavigation}
        >
          Mi cuenta
        </button>
      </div>

      <div className={styles.auth}>
        <span className={styles.userName}>{userLabel}</span>

        {isLoggedIn ? (
          <button type="button" className={styles.authBtn} onClick={handleSignOut}>
            Salir
          </button>
        ) : (
          <div className={styles.guestActions}>
            <button type="button" className={styles.authBtn} onClick={() => navigate('/login')}>
              Ingresar
            </button>
            <button
              type="button"
              className={styles.secondaryAuthBtn}
              onClick={() => navigate('/register')}
            >
              Registrarse
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
