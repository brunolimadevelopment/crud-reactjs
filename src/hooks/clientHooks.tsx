import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Client } from '../types/client';

// Fetch clients
export const useFetchClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await fetch('api/clients')
      .then((res) => res.json())
      return response;
    }
  });
};

// Fetch a single client by ID
export const useFetchClientById = (id: string) => {
  return useQuery({
    queryKey: ['clients', id],
    queryFn: async () => {
      const response = await fetch(`/api/client/${id}`)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
}; 

// Delete client
export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (clientId: string) => {
      const response = await fetch(`/client/${clientId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: (error) => {
      setError(`Erro ao deletar cliente: ${error.message}`);
      setTimeout(() => {
        setError(null);
      }, 2000);
    },
  });

  return { mutation, error };
};

// Create client
export const useCreateClient = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: Client) => {
      await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    }, 
    onSuccess: () => {
      setSuccess('Client created successfully! Thank you.');
      setTimeout(() => {
        setSuccess(null);
        navigate('/');
      }, 1700);
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: () => {
      setError('Failed to create client. Please try again.');
      setTimeout(() => {
        setError(null);
      }, 2000);
    },
  });

  return { mutation, success, error };
};

// Update client
export const useUpdateClient = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: Client) => {
      const response = await fetch(`/api/client/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return response.json();
        
    },
    onSuccess: () => {
      setSuccess('Client updated successfully! Thank you.');
      setTimeout(() => {
        setSuccess(null);
        navigate('/');
      }, 1700);
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
    onError: () => {
      setError('Failed to update client. Please try again.');
      setTimeout(() => {
        setError(null);
      }, 2000);
    },
  });

  return { mutation, success, error };
};
