import React from 'react';
import styled from 'styled-components';
const Footer = () => {
  return (
    <StContainer>
      <img src={require('../components/images/footer/footerimg.PNG')} />
      <img
        className="github"
        src={require('../components/images/footer/github.PNG')}
        onClick={() =>
          window.open(
            'https://github.com/orgs/perple-personality-plan-project/repositories',
            '_blank',
          )
        }
      />

      {/* <p>GitHub Link :</p>
      <a
        href="https://github.com/orgs/perple-personality-plan-project/repositories"
        target="_blank"
      >
        https://github.com/orgs/perple-personality-plan-project/repositories
      </a> */}

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
  }

  img {
    width: 150px;
    height: 50px;
  }

  .github {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }

  .copy-font {
    font-size: 10px;
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
