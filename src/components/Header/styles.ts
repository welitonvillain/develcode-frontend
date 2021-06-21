import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  width: 100%;
  height: 5.75rem;
  background-color: var(--white);
  
  div {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 70rem;
    margin: 0 auto;
  }

  h1 {
    color: var(--primary);
    font-size: 2rem;
    font-weight: 600;
  }
`;

