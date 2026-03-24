const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const req = async (path, options = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
};

// Media
export const getMedias = () => req('/media');
export const createMedia = (data) => req('/media', { method: 'POST', body: JSON.stringify(data) });
export const updateMedia = (id, data) => req(`/media/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteMedia = (id) => req(`/media/${id}`, { method: 'DELETE' });

// Generos
export const getGeneros = () => req('/generos');
export const createGenero = (data) => req('/generos', { method: 'POST', body: JSON.stringify(data) });
export const updateGenero = (id, data) => req(`/generos/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteGenero = (id) => req(`/generos/${id}`, { method: 'DELETE' });

// Directores
export const getDirectores = () => req('/directores');
export const createDirector = (data) => req('/directores', { method: 'POST', body: JSON.stringify(data) });
export const updateDirector = (id, data) => req(`/directores/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteDirector = (id) => req(`/directores/${id}`, { method: 'DELETE' });

// Productoras
export const getProductoras = () => req('/productoras');
export const createProductora = (data) => req('/productoras', { method: 'POST', body: JSON.stringify(data) });
export const updateProductora = (id, data) => req(`/productoras/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProductora = (id) => req(`/productoras/${id}`, { method: 'DELETE' });

// Tipos
export const getTipos = () => req('/tipos');
export const createTipo = (data) => req('/tipos', { method: 'POST', body: JSON.stringify(data) });
export const updateTipo = (id, data) => req(`/tipos/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteTipo = (id) => req(`/tipos/${id}`, { method: 'DELETE' });
