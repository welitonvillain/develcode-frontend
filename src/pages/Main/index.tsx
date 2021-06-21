import React, { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';

import { Container, Controls, List } from './styles';
import { Detail } from '../../components/Detail';
import api from '../../services/api';
import { toISODateFormat } from '../../utils/dateFormat';

interface IUser {
  code: number | undefined;
  name: string;
  birthDate: string;
  avatarUrl?: string;
}

export const Main: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await api.get<IUser[]>('user/list');

        if (response.data) {
          setUsers([ ...response.data ]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getAllUsers();
  }, []);

  const register = async (code: number, name: string, birthDate: string, avatarFile: FormData | undefined) => {
    if (code >= 0 && name !== '' && birthDate !== '') {
      try {
        const formatedBirthDate = toISODateFormat(birthDate);
        const response = await api.post<IUser>('user/register', { 
          code,
          name,
          birthDate: formatedBirthDate
        });

        if (avatarFile) {
          await uploadAvatar(avatarFile, code);
        } else if (response.data) {
          let createdUser = users.shift();
          createdUser = response.data;
          setUsers([ createdUser, ...users ]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateUser = async (code: number, name: string, birthDate: string, avatarFile: FormData | undefined) => {
    if (code >= 0 && name !== '' && birthDate !== '') {
      try {
        const formatedBirthDate = toISODateFormat(birthDate);
        const response = await api.put<IUser>('user/update', { 
          code,
          name,
          birthDate: formatedBirthDate
        });
        
        if (avatarFile) {
          await uploadAvatar(avatarFile, code);
        } else if (response.data) {
          const index = users.findIndex((user) => user.code === code);
          
          if (index !== -1) {
            users[index] = response.data;
            setUsers([ ...users ]);
          }
        }
      } catch (error) {
        console.log(error);
      }

      if (avatarFile)
        uploadAvatar(avatarFile, code);
    }
  };

  const uploadAvatar = async (file: FormData, code: number) => {
    try {
      const response = await api.patch<IUser>(`user/${code}/update/avatar`, file);

      if (response.data) {
        const index = users.findIndex((user) => user.code === code);

        if (index === -1) {
          let updatedUser = users.shift();
          updatedUser = response.data;
          setUsers([ updatedUser, ...users ]);
        } else {
          users[index].avatarUrl = response.data.avatarUrl;
          setUsers([ ...users ]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addNewUser = () => {
    if (users.length > 0 && users[0].code === undefined) return;
    
    const user: IUser = { code: undefined, name: "", birthDate: "", avatarUrl: "" };
    setUsers([ user, ...users ]);
  };

  const removeUser = () => {
    users.shift();
    setUsers([ ...users ]);
  };

  return (
    <Container>
      <Controls>
        <button onClick={() => addNewUser()}>
          <FiPlus />
        </button>
      </Controls>
      <List>
        { 
          users.map( user => (
            <Detail 
              key={user.code} 
              code={user.code || undefined} 
              name={user.name} 
              birthDate={user.birthDate} 
              avatarUrl={user.avatarUrl}
              remove={removeUser}
              register={register}
              update={updateUser}
            />
          ))
        }
      </List>
    </Container>
  );
};