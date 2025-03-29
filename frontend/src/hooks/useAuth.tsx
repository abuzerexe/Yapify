import { useMutation } from '@tanstack/react-query';
import axios from 'axios'

type AuthInputs = {
  route: string;
};

export const useAuth = ({ route }: AuthInputs) => {
  return useMutation({
    mutationFn: async (inputs: object) => {

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}${route}`, inputs);

      return response.data;
    },
  });
};
