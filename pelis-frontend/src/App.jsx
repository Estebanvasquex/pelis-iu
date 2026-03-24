import React, { useState } from 'react';
import MediaList from './components/MediaList';
import GeneroList from './components/GeneroList';
import DirectorList from './components/DirectorList';
import ProductoraList from './components/ProductoraList';
import TipoList from './components/TipoList';

const tabs = [
  { id: 'media', label: '🎬 Media', component: MediaList },
  { id: 'generos', label: '🎭 Géneros', component: GeneroList },
  { id: 'directores', label: '🎥 Directores', component: DirectorList },
  { id: 'productoras', label: '🏢 Productoras', component: ProductoraList },
  { id: 'tipos', label: '📂 Tipos', component: TipoList },
];

export default function App() {
  const [active, setActive] = useState('media');
  const Tab = tabs.find(t => t.id === active).component;

  return (
    <>
      <header>
        <h1>Pelis-IU</h1>
      </header>
      <nav>
        {tabs.map(t => (
          <button
            key={t.id}
            className={active === t.id ? 'active' : ''}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <main>
        <Tab />
      </main>
    </>
  );
}
