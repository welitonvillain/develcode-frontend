import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import { FiEdit2, FiCheck, FiX, FiCamera } from 'react-icons/fi';

import { Container, Input } from './styles';

import { BASE_URL } from '../../services/api';
import { toLocalDateFormat } from '../../utils/dateFormat';

interface IUser {
  code: number | undefined;
  name: string;
  birthDate: string;
  avatarUrl?: string;
  remove: () => void
  register: (code: number, name: string, birthDate: string, avatarFile: FormData | undefined) => void;
  update: (code: number, name: string, birthDate: string, avatarFile: FormData | undefined) => void;
}

export const Detail: React.FC<IUser> = ({ code, name, birthDate, avatarUrl, remove, register, update }: IUser) => {
  const codeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [avatarFile, setAvatarFile] = useState<FormData | undefined>(undefined);

  useEffect(() => {
    if (code === undefined) {
      setEditMode(true);
    }
  }, []);

  const handleChangeEditMode = () => {
    setEditMode(!editMode);
  }

  const cancelEdit = () => {
    if (code === undefined) {
      remove();
    }

    if (codeRef.current && nameRef.current && birthRef.current) {
      codeRef.current.value = code?.toString() || '';
      nameRef.current.value = name;
      birthRef.current.value = birthDate;
    }
    
    handleChangeEditMode();
  }

  const confirmEvent = () => {
    if (code === undefined) {
      createNewUser();
    } else {
      updateUser();
    }
  }

  const updateUser = () => {
    if (code && nameRef.current && birthRef.current) {
      update(
        code,
        nameRef.current.value,
        birthRef.current.value,
        avatarFile
      );
    }

    handleChangeEditMode();
  }

  const createNewUser = () => {
    if (codeRef.current && nameRef.current && birthRef.current) {
      register(
        Number.parseInt(codeRef.current.value),
        nameRef.current.value,
        birthRef.current.value,
        avatarFile
      );
    }

    handleChangeEditMode();
  }

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const data = new FormData();
    
    if (e.target.files) {
      data.append('avatar', e.target.files[0]); 
    }
    
    setAvatarFile(data);
  };

  return (
    <Container>
      <div className="image">
        { (editMode || avatarUrl === '') && 
          <label className="uploadImage" htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleAvatarChange}/>
          </label> 
        }
        { (avatarUrl !== '' && avatarUrl !== undefined && avatarUrl !== null) && 
          <img src={BASE_URL + 'user/avatar/' + avatarUrl} alt="User Image" /> 
        }
      </div>
      
      <Input 
        className="code" 
        defaultValue={code} 
        disabled={code !== undefined || !editMode} 
        ref={codeRef}
        placeholder="Código (apenas números)"
        isEditing={code === undefined && editMode}
      />
      <Input 
        className="name" 
        defaultValue={name} 
        disabled={!editMode} 
        ref={nameRef}
        placeholder="Nome do Usuário"
        isEditing={editMode}
      />
      <Input 
        className="birthDate" 
        defaultValue={toLocalDateFormat(birthDate)} 
        disabled={!editMode} 
        ref={birthRef} 
        placeholder="Data Nasc. (dd/mm/aaaa)"
        isEditing={editMode}
      />
      <div className="controls">
        { 
          editMode
          ? (
            <>
              <FiCheck onClick={confirmEvent} className="confirm"/>
              <FiX onClick={cancelEdit} className="cancel"/>
            </>
          )
          : (
            <>
              <FiEdit2 onClick={handleChangeEditMode}/>
            </>
          )
        }
      </div>
    </Container>
  );
}