import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { Router } from './Router'
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 15px;
`;

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <AppContainer>
          <Router />
        </AppContainer>
      </BrowserRouter>
    </>
  )
}

export default App
