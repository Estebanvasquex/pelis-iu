import React, { useEffect, useState } from 'react';
import { getMedias, createMedia, updateMedia, deleteMedia } from '../api';
import { getGeneros } from '../api';
import { getDirectores } from '../api';
import { getProductoras } from '../api';
import { getTipos } from '../api';

const emptyForm = {
  serial: '', titulo: '', sinopsis: '', url: '',
  imagenPortada: '', anioEstreno: '', genero: '',
  director: '', productora: '', tipo: ''
};

export default function MediaList() {
  const [items, setItems] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const [m, g, d, p, t] = await Promise.all([
        getMedias(), getGeneros(), getDirectores(), getProductoras(), getTipos()
      ]);
      setItems(m); setGeneros(g); setDirectores(d); setProductoras(p); setTipos(t);
    } catch { setError('Error al cargar datos'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditing(null); setShowModal(true); };

  const openEdit = (item) => {
    setEditing(item._id);
    setForm({
      serial: item.serial,
      titulo: item.titulo,
      sinopsis: item.sinopsis,
      url: item.url,
      imagenPortada: item.imagenPortada || '',
      anioEstreno: item.anioEstreno,
      genero: item.genero?._id || item.genero,
      director: item.director?._id || item.director,
      productora: item.productora?._id || item.productora,
      tipo: item.tipo?._id || item.tipo,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await updateMedia(editing, form);
      else await createMedia(form);
      setShowModal(false);
      load();
    } catch { setError('Error al guardar'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar media?')) return;
    try { await deleteMedia(id); load(); }
    catch { setError('Error al eliminar'); }
  };

  const f = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Media</h2>
        <button className="btn btn-primary" onClick={openCreate}>+ Agregar</button>
      </div>

      {error && <p className="error">{error}</p>}
      {loading ? <p className="loading">Cargando...</p> : (
        <div className="card-grid">
          {items.map(m => (
            <div className="card" key={m._id}>
              {m.imagenPortada
                ? <img src={m.imagenPortada} alt={m.titulo} onError={e => e.target.style.display = 'none'} />
                : <div style={{ height: 200, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>Sin imagen</div>
              }
              <div className="card-body">
                <h3>{m.titulo}</h3>
                <p>{m.anioEstreno} · {m.tipo?.nombre}</p>
                <p>{m.genero?.nombre} · {m.director?.nombres}</p>
                <p style={{ marginTop: '0.3rem', fontSize: '0.75rem', color: '#888' }}>{m.sinopsis?.slice(0, 80)}...</p>
                <div className="card-actions">
                  <button className="btn btn-edit" onClick={() => openEdit(m)}>Editar</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(m._id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>{editing ? 'Editar Media' : 'Nueva Media'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input placeholder="Serial" value={form.serial} onChange={f('serial')} required />
                <input placeholder="Título" value={form.titulo} onChange={f('titulo')} required />
              </div>
              <div className="form-row">
                <textarea placeholder="Sinopsis" value={form.sinopsis} onChange={f('sinopsis')} required />
              </div>
              <div className="form-row">
                <input placeholder="URL" value={form.url} onChange={f('url')} required />
                <input placeholder="Imagen portada (URL)" value={form.imagenPortada} onChange={f('imagenPortada')} />
              </div>
              <div className="form-row">
                <input placeholder="Año estreno" type="number" value={form.anioEstreno} onChange={f('anioEstreno')} required />
                <select value={form.genero} onChange={f('genero')} required>
                  <option value="">Género</option>
                  {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
                </select>
              </div>
              <div className="form-row">
                <select value={form.director} onChange={f('director')} required>
                  <option value="">Director</option>
                  {directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}
                </select>
                <select value={form.productora} onChange={f('productora')} required>
                  <option value="">Productora</option>
                  {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                </select>
                <select value={form.tipo} onChange={f('tipo')} required>
                  <option value="">Tipo</option>
                  {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
                </select>
              </div>
              <div className="modal-actions">
                <button className="btn" type="button" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="btn btn-primary" type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
