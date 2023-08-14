// Importing necessary dependencies, components, and styles
import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { FiShoppingCart, FiMenu, FiLogOut } from 'react-icons/fi';
import ShopCart from '../ShopCart';
import * as S from "./styles"; // Importing styles from a file

// Defining the Header component
export default function Header() {
  // Accessing user data and functions from AuthContext
  const { storageUser, user, signOut } = useContext(AuthContext);

  // State variables
  const [showSidebar, setShowSidebar] = useState(false);
  const [productsOnCart, setProductsOnCart] = useState([]);
  const [qtdItems, setQtdItems] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [searchProducts, setSearchProducts] = useState('');
  const [navProducts, setNavProducts] = useState(false);

  // Effect to update productsOnCart when local storage changes
  useEffect(() => {
    const listaProducts = localStorage.getItem('products');
    setProductsOnCart(JSON.parse(listaProducts) || []);
  }, [productsOnCart]);

  // Effect to calculate and update qtdItems based on productsOnCart
  useEffect(() => {
    let qtd = 0;

    productsOnCart.forEach((item) => {
      qtd += item.quantity;
    });

    setQtdItems(qtd);
  }, [productsOnCart, qtdItems]);


  return (
    <>
      <S.MainContainer>
        <S.ContainerLeft>
          <Link to="/"><h1>E-shop</h1></Link>
          <S.Nav>
             {/* Navigation links */}
            <li
              onMouseEnter={() => setNavProducts(true)} className={navProducts ? 'navProducts' : 'navProductsOff'}  >
              <NavLink to="/products"
                activeStyle={{
                  paddingBottom: "6px",
                  borderBottom: "2px solid #ffa724",
                }}
              >Products
                <nav onMouseLeave={() => setNavProducts(false)}>
                  <li><NavLink to="/men">Men</NavLink></li>
                  <li><NavLink to="/women">Women</NavLink></li>
                  <li><NavLink to="/jewelery">Jewelry</NavLink></li>
                  <li><NavLink to="/electronics">Electronics</NavLink></li>

                </nav>
              </NavLink>
              &nbsp;
              &nbsp;
              &nbsp;
              <NavLink to="/about"
                  activeStyle={{
                  paddingBottom: "6px",
                  borderBottom: "2px solid #ffa724",
                }}>About Us</NavLink>
              &nbsp;
              &nbsp;
              &nbsp;
              <NavLink to="/profile"
                  activeStyle={{
                  paddingBottom: "6px",
                  borderBottom: "2px solid #ffa724",
                }}>User's Profile</NavLink>
              &nbsp;
              &nbsp;
              &nbsp;
              <NavLink to="/userlist"
                  activeStyle={{
                  paddingBottom: "6px",
                  paddingLeft: "10px",
                  borderBottom: "2px solid #ffa724",
                }}>User List</NavLink>

            </li>
            

          </S.Nav>
        </S.ContainerLeft>
        
        {/* Right section of the header */}
        <S.ContainerRight>
          
          <S.DivAccount>
            {user ? (
              <a>
                Hello, {user.name}
              </a>
            ) : (
              <>
                <p><Link to="/register">Register</Link></p>
                <span>/</span>
                <p><Link to="/login">Login</Link></p>
              </>
            )}
          </S.DivAccount>

          {user ? (
            <>
              <S.SignOutButton>
                <button type="button" onClick={signOut}><FiLogOut /></button>
              </S.SignOutButton>
            </>
          ) : (
            <></>
          )}

          <FiShoppingCart onClick={() => setShowSidebar(!showSidebar)} />
          <S.Bar>{qtdItems}</S.Bar>
        </S.ContainerRight>

        {/* Hamburger menu */}
        <S.MenuHamburguer>
          <FiMenu onClick={() => setShowNav(!showNav)} />
          {showNav &&
            (
              <nav className={`navHamburguer ${showNav ? 'navTrue' : 'navFalse'}`}>
                
                <li><Link to="/men" onClick={() => setShowNav(false)}>Men</Link></li>
                <li><Link to="/women" onClick={() => setShowNav(false)}>Women</Link></li>
                <li><Link to="/jewelery" onClick={() => setShowNav(false)}>Jewelry</Link></li>
                <li><Link to="/electronics" onClick={() => setShowNav(false)}>Electronics</Link></li>
                <li><Link to="/login" onClick={() => setShowNav(false)}>Login</Link></li>
                <li><Link to="/register" onClick={() => setShowNav(false)}>Register</Link></li>

              </nav>)}
        </S.MenuHamburguer>

      </S.MainContainer>
      
      {/* Displaying the ShopCart component */}
      {showSidebar && <ShopCart sidebar={showSidebar} />}
    </>
  )
}
