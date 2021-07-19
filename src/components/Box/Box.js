import styled from 'styled-components';

const Box = styled.div`
  margin-bottom: 10px;
  padding: 14px;
  background-color: #fff;
  border-radius: 8px;
  
  .boxLink {
    font-size: 14px;
    font-weight: 800;
    text-decoration: none;
    color: #2e7bb4;
  }

  .title {
    margin: 20px;
    font-size: 32px;
    font-weight: 500;
  }

  .subTitle {
    margin: 20px;
    font-size: 18px;
    font-weight: 400;
  }

  .smallTitle {
    margin 20px;
    font-size: 16px;
    font-weight: 700;
    color: #333;
  }

  input {
    width: 100%;
    margin-bottom: 15px;
    padding: 15px;
    color: #333;
    background-color: #f4f4f4;
    border: 0;
    border-radius: 100px;
    ::placeholder {
      color: #333;
      opacity: 1;
    }
  }

  button {
    padding: 8px 12px;
    color: #fff;
    background-color: #6f92bb;
    border: 0;
    border-radius: 100px;
  }
`;

export default Box;