import React, { useEffect, useState } from 'react';
import { getDirectores, createDirector, updateDirector, deleteDirector } from '../api';

const empty = { nombres: '', estado: 'Activo' };

export default function DirectorList() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { setItems(await getDirectores()); }
    catch { setError('Error al cargar directores'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await updateDirector(editing, form); setEditing(null); }
      else await createDirector(form);
      setForm(empty);
      load();
    } catch { setError('Error al guardar'); }
  };

  const handleEdit = (item) => {
    setEditing(item._id);
    setForm({ nombres: item.nombres, estado: item.estado });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar director?')) return;
    try { await deleteDirector(id); load(); }
    catch { setError('Error al eliminar'); }
  };

  return (
    <div>
      <h2>Directores</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input placeholder="Nombres" value={form.nombres} onChange={e => setForm({ ...form, nombres: e.target.value })} required />
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
          <thead><tr><th>Nombres</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {items.map(d => (
              <tr key={d._id}>
                <td>{d.nombres}</td>
                <td>{d.estado}</td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-edit" onClick={() => handleEdit(d)}>Editar</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(d._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
