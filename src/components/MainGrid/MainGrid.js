import styled from 'styled-components';

const MainGrid = styled.main`
  width: 100%;
  max-width: 500px;
  padding: 15px;
  margin: 0 auto;

  .profileArea {
    display: none;

    @media(min-width: 768px) {
      display: block;
    }
  }

  .formError {
    margin-bottom: 15px;
    margin-left: 15px;
    font-size: 12px;
    color: red;
  }

  @media(min-width: 768px) {
    display: grid;
    grid-template-areas: "profileArea welcomeArea profileRelationsArea profileComunidadesArea";
    grid-template-columns: 1fr 3fr 2fr;
    grid-gap: 10px;
    max-width: 1110px;
  }
`;

export default MainGrid;