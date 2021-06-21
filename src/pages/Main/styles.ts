import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5.75rem);
  width: 70rem;
  margin: 0 auto;

  padding: 2rem 0 1rem 0;
`;

export const Controls = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    width: 2.5rem;
    border: 0;
    border-radius: 5px;

    background-color: var(--primary);

    svg { 
      color: var(--white);
    }

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

export const List = styled.section`
  margin-top: 20px;
  width: 100%;
  height: 100%;

  div + div {
    margin-top: 0.5rem; 
  }
`;