import styled from 'styled-components';
import Logo from '../../../src/assets/vite.svg'; 

const HeaderWrapper = styled.header`
  background-color:#212121;
  width: 100%;
  text-align: center;
  padding: 1rem 0;
`;

const LogoImage = styled.img`
  max-width: 100%;
  height: auto;
`;

export default function Header() {
    return (
      <HeaderWrapper>
        <LogoImage src={Logo} alt="Client CRUD" />
      </HeaderWrapper>
    );
}