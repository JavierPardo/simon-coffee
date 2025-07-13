"use client";

import React, { useState } from 'react';

// Definiciones de tipos para el menú
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string; // URL de imagen opcional
}

interface MenuCategory {
  id: string;
  name: string;
  slug: string; // Para la navegación (ej. 'reposteria')
  items: MenuItem[];
}

// Datos del menú
const menuCategories: MenuCategory[] = [
  {
    id: '1',
    name: 'Repostería',
    slug: 'reposteria',
    items: [
      { id: '101', name: 'Croissant de Almendras', description: 'Crujiente croissant con relleno de almendras.', price: 25.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Croissant' },
      { id: '102', name: 'Brownie de Chocolate', description: 'Intenso brownie con nueces y chocolate.', price: 30.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Brownie' },
      { id: '103', name: 'Tarta de Manzana', description: 'Deliciosa tarta de manzana con canela.', price: 35.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Tarta+Manzana' },
      { id: '104', name: 'Muffin de Arándanos', description: 'Suave muffin con arándanos frescos.', price: 20.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Muffin' },
    ],
  },
  {
    id: '2',
    name: 'Bebidas Calientes',
    slug: 'bebidas-calientes',
    items: [
      { id: '201', name: 'Espresso', description: 'Café intenso y aromático.', price: 15.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Espresso' },
      { id: '202', name: 'Latte', description: 'Café con leche espumosa.', price: 28.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Latte' },
      { id: '203', name: 'Capuchino', description: 'Espresso con leche al vapor y espuma.', price: 27.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Capuchino' },
      { id: '204', name: 'Chocolate Caliente', description: 'Cremoso chocolate caliente.', price: 25.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Chocolate' },
      { id: '205', name: 'Té Chai Latte', description: 'Bebida especiada con té negro y leche.', price: 28.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Chai+Latte' },
    ],
  },
  {
    id: '3',
    name: 'Bebidas con Alcohol',
    slug: 'bebidas-con-alcohol',
    items: [
      { id: '301', name: 'Irish Coffee', description: 'Café con whisky irlandés y nata.', price: 50.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Irish+Coffee' },
      { id: '302', name: 'Cerveza Artesanal', description: 'Selección de cervezas locales.', price: 40.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Cerveza' },
      { id: '303', name: 'Vino Tinto (Copa)', description: 'Copa de vino tinto de la casa.', price: 35.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Vino' },
    ],
  },
  {
    id: '4',
    name: 'Otros',
    slug: 'otros',
    items: [
      { id: '401', name: 'Jugo de Naranja Natural', description: 'Jugo recién exprimido.', price: 22.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Jugo+Naranja' },
      { id: '402', name: 'Agua Mineral', description: 'Botella de agua mineral.', price: 10.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Agua' },
      { id: '403', name: 'Limonada', description: 'Refrescante limonada casera.', price: 20.00, image: 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Limonada' },
    ],
  },
];

// Componente para un elemento del menú
const MenuItem: React.FC<{ item: MenuItem }> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-4 transform transition-transform duration-300 hover:scale-105">
      {item.image && (
        <div className="relative w-full h-48 mb-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300/F5E6CC/7A2A02?text=Imagen+No+Disp.'; }} // Fallback de imagen
          />
        </div>
      )}
      <div className="p-4 flex-grow text-center">
        <h3 className="text-xl font-semibold text-amber-900 mb-2">{item.name}</h3>
        <p className="text-gray-600 mb-3 text-sm">{item.description}</p>
        <p className="text-lg font-bold text-green-700">Bs {item.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

// Componente para una sección de categoría del menú
const MenuCategorySection: React.FC<{ category: MenuCategory }> = ({ category }) => {
  return (
    <section className="mb-12">
      <h2 className="text-4xl font-bold text-center text-amber-800 mb-8 mt-10 pb-2 border-b-2 border-amber-600 font-serif">
        {category.name}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {category.items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

// Componente de la barra de navegación
const Navbar: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  return (
    <nav className="bg-amber-900 p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <button onClick={() => setCurrentPage('home')} className="text-white text-3xl font-bold font-serif mb-2 sm:mb-0">
          Simon Coffee
        </button>
        <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
          <button onClick={() => setCurrentPage('home')} className="text-white hover:text-amber-200 transition-colors py-1">
            Inicio
          </button>
          <button onClick={() => setCurrentPage('menu')} className="text-white hover:text-amber-200 transition-colors py-1">
            Menú
          </button>
          <button onClick={() => setCurrentPage('about')} className="text-white hover:text-amber-200 transition-colors py-1">
            Sobre Nosotros
          </button>
          <button onClick={() => setCurrentPage('contact')} className="text-white hover:text-amber-200 transition-colors py-1">
            Contacto
          </button>
        </div>
      </div>
    </nav>
  );
};

// Componente del pie de página
const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-900 text-white p-6 text-center mt-12">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Simon Coffee. Todos los derechos reservados.</p>
        <p className="text-sm mt-2">Hecho con ❤️ para los amantes del café.</p>
      </div>
    </footer>
  );
};

// Componente de la página de inicio
const HomePage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: "url('https://placehold.co/1920x1080/4A2C2A/F5E6CC?text=Simon+Coffee+Background')",
        backgroundAttachment: 'fixed', // Para un efecto parallax ligero
      }}
    >
      <div className="bg-black bg-opacity-70 p-8 rounded-xl text-center text-white max-w-3xl mx-auto shadow-2xl transform transition-transform duration-500 hover:scale-105">
        <h1 className="text-6xl font-extrabold mb-6 font-serif leading-tight">¡Bienvenido a Simon Coffee! ☕</h1>
        <p className="text-2xl mb-8 leading-relaxed">
          Donde cada taza cuenta una historia. Disfruta de la mejor selección de cafés,
          deliciosos postres y un ambiente acogedor que te hará sentir como en casa.
        </p>
        <button
          onClick={() => setCurrentPage('menu')}
          className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 ease-in-out transform hover:scale-110 shadow-lg"
        >
          Explora Nuestro Menú
        </button>
      </div>
    </main>
  );
};

// Componente de la página del menú
const MenuPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-cream min-h-screen rounded-lg shadow-xl mt-8 mb-8">
      <h1 className="text-5xl font-bold text-center text-amber-900 mb-12 font-serif">Nuestro Menú</h1>
      {menuCategories.map((category) => (
        <MenuCategorySection key={category.id} category={category} />
      ))}
    </div>
  );
};

// Componente de la página "Sobre Nosotros"
const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-cream min-h-screen rounded-lg shadow-xl mt-8 mb-8">
      <h1 className="text-5xl font-bold text-center text-amber-900 mb-12 font-serif">Sobre Nosotros</h1>
      <div className="text-lg text-gray-800 leading-relaxed max-w-3xl mx-auto">
        <p className="mb-6">
          Simon Coffee nació de la pasión por el buen café y el deseo de crear un espacio donde la gente pudiera relajarse, trabajar y disfrutar de momentos especiales. Desde nuestros inicios, nos hemos dedicado a seleccionar los granos de café más finos y a preparar cada bebida con el máximo cuidado y atención al detalle.
        </p>
        <p className="mb-6">
          Nuestra repostería es elaborada diariamente con ingredientes frescos y de alta calidad, ofreciendo una variedad de delicias que complementan perfectamente tu café. Creemos que la experiencia de tomar café va más allá de la bebida; es un momento para saborear, compartir y conectar.
        </p>
        <p className="mb-6">
          En Simon Coffee, nos esforzamos por ofrecer un ambiente cálido y acogedor, donde cada cliente se sienta bienvenido. Nuestro equipo está comprometido a brindarte un servicio excepcional y a asegurar que cada visita sea memorable. ¡Esperamos verte pronto!
        </p>
        <div className="text-center mt-8">
          <img
            src="https://placehold.co/600x400/F5E6CC/7A2A02?text=Interior+Simon+Coffee"
            alt="Interior de Simon Coffee"
            className="rounded-lg shadow-md mx-auto w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

// Componente de la página de contacto
const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-cream min-h-screen rounded-lg shadow-xl mt-8 mb-8">
      <h1 className="text-5xl font-bold text-center text-amber-900 mb-12 font-serif">Contáctanos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-lg text-gray-800">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-amber-800 mb-4">Información de Contacto</h2>
          <p className="mb-2"><strong className="text-amber-900">Dirección:</strong> Calle Ficticia #123, Ciudad del Café, País</p>
          <p className="mb-2"><strong className="text-amber-900">Teléfono:</strong> +591 123 456789</p>
          <p className="mb-2"><strong className="text-amber-900">Email:</strong> info@simoncoffee.com</p>
          <h3 className="text-2xl font-semibold text-amber-800 mt-6 mb-3">Horario de Atención</h3>
          <p>Lunes - Viernes: 7:00 AM - 8:00 PM</p>
          <p>Sábados: 8:00 AM - 9:00 PM</p>
          <p>Domingos: 9:00 AM - 6:00 PM</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-amber-800 mb-4">Envíanos un Mensaje</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-bold mb-1">Nombre</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Tu Nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="tu.email@ejemplo.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-bold mb-1">Mensaje</label>
              <textarea
                id="message"
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-amber-800 mb-4 text-center">Encuéntranos en el Mapa</h2>
        <div className="relative w-full h-80 rounded-lg overflow-hidden">
          {/* Un iframe de Google Maps incrustado (ejemplo, reemplazar con uno real si se desea) */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.309355106562!2d-66.15688628460662!3d-17.39343798808169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e373f1d8c1e8d7%3A0x7d0e5f2a1b9e7d0!2sCochabamba%2C%20Bolivia!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Simon Coffee"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// Componente principal de la aplicación
const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home'); // Estado para controlar la página actual

  // Tailwind CSS personalizado para la aplicación
  const tailwindConfig = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@700&display=swap');
      body {
        font-family: 'Inter', sans-serif;
        background-color: #F5E6CC; /* Color crema de fondo */
      }
      .font-serif {
        font-family: 'Playfair Display', serif;
      }
      .bg-amber-900 { background-color: #7A2A02; } /* Marrón oscuro del café */
      .bg-amber-800 { background-color: #92400E; }
      .bg-amber-700 { background-color: #B45309; }
      .text-amber-900 { color: #7A2A02; }
      .text-amber-800 { color: #92400E; }
      .text-amber-200 { color: #FDE68A; }
      .bg-cream { background-color: #F5E6CC; } /* Color crema */
      .text-green-700 { color: #15803d; } /* Para precios */
      .hover\\:scale-105:hover { transform: scale(1.05); }
      .hover\\:scale-110:hover { transform: scale(1.10); }
      .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
      .transition-colors { transition-property: background-color, border-color, color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
      .ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
      .rounded-xl { border-radius: 0.75rem; }
      .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
    </style>
  `;

  // Renderiza el contenido de la página actual
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'menu':
        return <MenuPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Inserta los estilos de Tailwind CSS */}
      <div dangerouslySetInnerHTML={{ __html: tailwindConfig }} />
      <Navbar setCurrentPage={setCurrentPage} />
      <div className="flex-grow">
        {renderPage()}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
