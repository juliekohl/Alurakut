import styled from 'styled-components';
import Box from '../Box/Box';

export const ProfileRelationsBoxWrapper = styled(Box)`
  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr; 
    list-style: none;
  }

  img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-position: center center;
  }
  
  ul li a {
    display: inline-block;
    position: relative;
    height: 100px;
    overflow: hidden;
    border-radius: 8px;
    span {
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      width: 100%;
      padding: 0 5px;
      font-size: 10px;
      text-overflow: ellipsis;
      color: #FFFFFF;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-indeX: 1;
      background-image: linear-gradient(0deg,#00000073,transparent);
    }
  }
`;