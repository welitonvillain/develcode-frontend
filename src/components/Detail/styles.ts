import styled, { css } from 'styled-components';

interface IInputProps {
  isEditing: boolean;
}

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 1fr 1fr;
  align-items: center;
  background-color: var(--white);
  height: 6.25rem;
  width: 100%;
  border-radius: 5px;
  border: 1px solid transparent;

  transition: border 0.2s;

  &:hover {
    border-color: var(--primary);
  }

  .image {
    width: 5.375rem;
    height: 5.375rem;
    border-radius: 50%;
    background-color: #ddd;
    margin: 0 auto;
    flex-shrink: 0;
    position: relative;

    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }

    .uploadImage {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      border: 0;
      border-radius: 50%;
      background-color: var(--transparence);

      color: var(--white);
      position: absolute;
      top: 0;
      left: 0;

      cursor: pointer;

      input { 
        display: none;
      }

      &:hover {
        font-size: 1.2rem;
      }
    }
  }

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;

    svg + svg {
      margin-left: 20px;
    }

    svg:hover {
      color: var(--primary);
      cursor: pointer;
    }

    .cancel:hover {
      color: var(--caution);
    }

    .confirm:hover {
      color: var(--confirm);
    }
  }
`;

export const Input = styled.input<IInputProps>`
  border: 0;
  border-radius: 5px;
  background-color: var(--white);
  height: 2rem;
  margin: 0 4px;

  ${(props) => 
    props.isEditing && 
    css`
      background-color: var(--secondary-text);
    `
  }

  &::placeholder {
    padding: 0 0.5rem;
    font-size: 0.8rem;
  } 
`;