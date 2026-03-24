import React, { useEffect, useState } from 'react';
import { getGeneros, createGenero, updateGenero, deleteGenero } from '../api';

const empty = { nombre: '', descripcion: '', estado: 'Activo' };

export default function GeneroList() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { setItems(await getGeneros()); }
    catch { setError('Error al cargar géneros'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await updateGenero(editing, form); setEditing(null); }
      else await createGenero(form);
      setForm(empty);
      load();
    } catch { setError('Error al guardar'); }
  };

  const handleEdit = (item) => {
    setEditing(item._id);
    setForm({ nombre: item.nombre, descripcion: item.descripcion || '', estado: item.estado });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar género?')) return;
    try { await deleteGenero(id); load(); }
    catch { setError('Error al eliminar'); }
  };

  return (
    <div>
      <h2>Géneros</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
          <input placeholder="Descripción" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
          <select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
          <button className="btn btn-primary" type="submit">{editing ? 'Actualizar' : 'Agregar'}</button>
          {editing && <button className="btn" type="button" onClick={() => { setEditing(null); setForm(empty); }}>Cancelar</button>}
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="loading">Cargando...</p> : (
        <table>
          <thead><tr><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {items.map(g => (
              <tr key={g._id}>
                <td>{g.nombre}</td>
                <td>{g.descripcion}</td>
                <td>{g.estado}</td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-edit" onClick={() => handleEdit(g)}>Editar</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(g._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
