import styled from 'styled-components';

const Box = styled.div`
  margin-bottom: 10px;
  padding: 14px;
  background-color: #ffffff;
  border-radius: 8px;
  
  .boxLink {
    font-size: 14px;
    font-weighht:800;
    text-decoration: none;
    color: #2e7bb4;
  }

  .title {
    margin: 20px;
    font-size: 32px;
    font-weighht: 500;
  }

  .subTitle {
    margin: 20px;
    font-size: 18px;
    font-weighht: 400;
  }

  .smallTitle {
    margin 20px;
    font-size: 16px;
    font-weighht: 700;
    color: #333333;
  }

  hr {
    margin-top: 15px;
    margin-bottom: 10px;
    border-color: transparent;
    border-bottom-color: #ecf2fa; 
  }

  input {
    width: 100%;
    margin-bottom: 15px;
    padding: 15px;
    color: #333333;
    background-color: #f4f4f4;
    border: 0;
    border-radius: 10000px;
    ::placeholder {
      color: #333333;
      opacity: 1;
    }
  }

  button {
    padding: 8px 12px;
    color: #ffffff;
    background-color: #6f92bb;
    border: 0;
    border-radius: 10000px;
  }
`;

export default Box;