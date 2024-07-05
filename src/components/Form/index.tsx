import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import * as z from 'zod';
import styled from 'styled-components';

const clientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  about: z.string().min(1, 'About is required'),
});

type ClientFormValues = z.infer<typeof clientSchema>;

type ClientFormProps = {
  initialValues?: ClientFormValues;
  onAction: (data: ClientFormValues) => void;
  title: string;
  textButton: string;
}

const FormContainer = styled.div`
  background: #212121;
  padding: 30px;
  border-radius: 6px;
  width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h2`
  color: #fff;
  margin-top: 0;
  font-family: 'Arial', sans-serif;
`;

const FormField = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormInput = styled.input`
  padding: 15px;
  border-radius: 6px;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  border: 0;
  background-color: #292929;
  color: #fff;
  resize: none;
`;

const FormTextarea = styled.textarea`
  padding: 15px;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  border-radius: 6px;
  border: 0;
  background-color: #292929;
  color: #fff;
  resize: none;
`;

const ErrorMessageStyled = styled.p`
  color: #c82f2f;
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  width: 100%;
  text-align: left;
  margin-bottom: 0;
`;

const ButtonSubmit = styled.button`
  padding: 15px;
  background-color: #b83afe;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  color: #fff;
  border-radius: 6px;
  border: 0;
  text-transform: capitalize;
  cursor: pointer;
  transition: all .2s ease-in-out;
  width: 100%;

  &:hover {
    background-color: #994dc4;
  }
`;

const LinkStyled = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-top: 30px;
  font-family: 'Arial', sans-serif;
`;

function ClientForm({ title, textButton, onAction }: ClientFormProps) {
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
  });

  const { isError: isClientsError, isFetching: isClientsFetching, error: clientsError } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      
      const response = await fetch('/api/clients');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();

      }
  });

  const getDataUpdate = async () => {
    try {
      const response = await fetch(`/api/client/${id}`);
      reset(await response.json());
    } catch (error) {
      setError('Failed to fetch client. Please try again.');
    }
  };

  useEffect(() => {
    if (id) {
      getDataUpdate();
    }
  }, [id]);

  if (isClientsFetching) {
    return <Message message="Carregando..." />;
  }

  return (
    <FormContainer>
      {isClientsError && <Message message={`${clientsError?.message}`} type="error" />}
      {error && <Message message={error} type="error" />}
      <form onSubmit={handleSubmit(onAction)}>
        <FormTitle>{title}</FormTitle>
        <FormField>
          <FormInput placeholder="Name" {...register('name')} />
          {errors.name && <ErrorMessageStyled>{errors.name.message}</ErrorMessageStyled>}
        </FormField>
        <FormField>
          <FormInput placeholder="E-mail" {...register('email')} />
          {errors.email && <ErrorMessageStyled>{errors.email.message}</ErrorMessageStyled>}
        </FormField>
        <FormField>
          <FormTextarea placeholder="About" {...register('about')}></FormTextarea>
          {errors.about && <ErrorMessageStyled>{errors.about.message}</ErrorMessageStyled>}
        </FormField>
        <ButtonSubmit type="submit">{textButton}</ButtonSubmit>
      </form>
      <LinkStyled to="/">See All Clients</LinkStyled>
    </FormContainer>
  );
}

export default ClientForm;