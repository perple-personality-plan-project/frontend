import React from 'react';
import styled from 'styled-components';
const Footer = () => {
  return (
    <StContainer>
      <img src={require('../components/images/footer/footerimg.PNG')} />

      <p>GitHub Link :</p>
      <a
        href="https://github.com/orgs/perple-personality-plan-project/repositories"
        target="_blank"
      >
        https://github.com/orgs/perple-personality-plan-project/repositories
      </a>

      <p className="copy-font">Copyright 2023. E반 3조. All rights reserved.</p>
    </StContainer>
  );
};

export default Footer;

const StContainer = styled.div`
  background-color: #f9f9ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ebecf3;

  .copy-font {
    font-size: 10px;
  }

  a {
    font-size: 15px;
    color: #393939;
    text-decoration: none;
    &:visited {
      color: #393939;
    }
  }

  p {
    color: #393939;
    font-size: 15px;
    cursor: pointer;

    &:first-of-type {
      margin-top: 0;
    }
  }

  img {
    width: 150px;
    height: 50px;
  }

  @media screen and (max-width: 600px) {
    a,
    p {
      font-size: 12px;
    }
  }

  @media screen and (max-width: 412px) {
    a,
    p {
      font-size: 11px;
    }
  }
`;
