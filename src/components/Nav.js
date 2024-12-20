import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import { auth } from "../firebase";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { removeUser, setUser } from '../store/userSlice'
import styled from'styled-components'


const Nav = () => {
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()
  const provider = new GoogleAuthProvider()

  const userData = useSelector(state => state.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === "/") {
          navigate("/main")
        }
      } else {
        navigate("/")
      }
    })
  }, [auth, navigate, pathname])

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },[])

  const handleScroll = () => {
    if(window.scrollY > 50){
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const handelChange = (e) => {
    setSearchValue(e.target.value)
    navigate(`/search?q=${e.target.value}`)
  }

  const dispatch = useDispatch();

  // 로그인
  const handleAuth = () => {
    signInWithPopup(auth, provider)
     .then((result) => {
        dispatch(setUser({
          id: result.user.uid,
          email: result.user.email,
          photoURL: result.user.photoURL,
          displayName: result.user.displayName,
        }));
      })
     .catch((error) => {
        alert(error.message)
      });
  }

  // 로그아웃
  const handleLogOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      navigate("/")
    }).catch((error) => {
      alert(error.message)
    })
  }
  
  return (
    <NavWrapper show={show}>
      <Logo>
        <img 
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={()=>(window.location.href="/")}
        />
      </Logo>
      {pathname === "/" ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Input 
            value={searchValue}
            onChange={handelChange}
            className='nav__input'
            type='text'
            placeholder='영화를 검색해주세요.'
          />

          <SignOut>
            <UserImg src={userData.photoURL} alt={userData.displayName} />
            <DropDown>
              <span onClick={handleLogOut}>SignOut</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </NavWrapper>
  )
}

export default Nav

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.show ? "#090b13" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: 1px solid lightgray;
`