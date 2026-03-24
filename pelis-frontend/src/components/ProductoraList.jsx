import React, { useEffect, useState } from 'react';
import { getProductoras, createProductora, updateProductora, deleteProductora } from '../api';

const empty = { nombre: '', slogan: '', descripcion: '', estado: 'Activo' };

export default function ProductoraList() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { setItems(await getProductoras()); }
    catch { setError('Error al cargar productoras'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await updateProductora(editing, form); setEditing(null); }
      else await createProductora(form);
      setForm(empty);
      load();
    } catch { setError('Error al guardar'); }
  };

  const handleEdit = (item) => {
    setEditing(item._id);
    setForm({ nombre: item.nombre, slogan: item.slogan || '', descripcion: item.descripcion || '', estado: item.estado });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar productora?')) return;
    try { await deleteProductora(id); load(); }
    catch { setError('Error al eliminar'); }
  };

  return (
    <div>
      <h2>Productoras</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
          <input placeholder="Slogan" value={form.slogan} onChange={e => setForm({ ...form, slogan: e.target.value })} />
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
          <thead><tr><th>Nombre</th><th>Slogan</th><th>Estado</th><th>Acciones</th></tr></thead>
          <tbody>
            {items.map(p => (
              <tr key={p._id}>
                <td>{p.nombre}</td>
                <td>{p.slogan}</td>
                <td>{p.estado}</td>
                <td style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn-edit" onClick={() => handleEdit(p)}>Editar</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(p._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
