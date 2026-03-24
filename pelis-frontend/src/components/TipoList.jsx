import React, { useEffect, useState } from 'react';
import { getTipos, createTipo, updateTipo, deleteTipo } from '../api';

const empty = { nombre: '', descripcion: '' };

export default function TipoList() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { setItems(await getTipos()); }
    catch { setError('Error al cargar tipos'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await updateTipo(editing, form); setEditing(null); }
      else await createTipo(form);
      setForm(empty);
      load();
    } catch { setError('Error al guardar'); }
  };

  const handleEdit = (item) => {
    setEditing(item._id);
    setForm({ nombre: item.nombre, descripcion: item.descripcion || '' });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar tipo?')) return;
    try { await deleteTipo(id); load(); }
    catch { setError('Error al eliminar'); }
  };

  return (
    <div>
      <h2>Tipos</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
          <input placeholder="Descripción" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
          <button className="btn btn-primary" type="submit">{editing ? 'Actualizar' : 'Agregar'}</button>
          {editing && <button className="btn" type="button" onClick={() => { setEditing(null); setForm(empty); }}>Cancelar</button>}
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {loading ? <p className="loading">Cargando...</p> : (
        <table>
          <thead><tr><th>Nombre</th><th>Descripción</th><th>Acciones</th></tr></thead>
          <tbody>
            {items.map(t => (
              <tr key={t._id}>
                <td>{t.nombre}</td>
                <td>{t.descripcion}</td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-edit" onClick={() => handleEdit(t)}>Editar</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(t._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
