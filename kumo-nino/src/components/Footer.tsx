import React from 'react';
import { Heart, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#EADDC8' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-8 h-8" style={{ color: '#D9B778' }} />
              <h3 className="text-2xl font-bold" style={{ color: '#302F2C' }}>
                Canine Care
              </h3>
            </div>
            <p className="text-sm mb-4" style={{ color: '#302F2C' }}>
              Cuidamos de tus perritos con amor y dedicación. Un espacio seguro donde 
              tu mascota puede socializar, ejercitarse y ser feliz mientras tú trabajas.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" style={{ color: '#7FA087' }} />
                <span className="text-sm" style={{ color: '#302F2C' }}>
                  Lun - Vie: 7:00 - 19:00
                </span>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#302F2C' }}>
              Contacto
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" style={{ color: '#D9B778' }} />
                <span className="text-sm" style={{ color: '#302F2C' }}>
                  +56 9 1234 5678
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" style={{ color: '#D9B778' }} />
                <span className="text-sm" style={{ color: '#302F2C' }}>
                  info@caninecare.cl
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" style={{ color: '#D9B778' }} />
                <span className="text-sm" style={{ color: '#302F2C' }}>
                  Av. Providencia 1234, Santiago
                </span>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#302F2C' }}>
              Enlaces
            </h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm hover:underline transition-colors" style={{ color: '#302F2C' }}>
                Mis Mascotas
              </a>
              <a href="#" className="block text-sm hover:underline transition-colors" style={{ color: '#302F2C' }}>
                Matrículas
              </a>
              <a href="#" className="block text-sm hover:underline transition-colors" style={{ color: '#302F2C' }}>
                Servicios
              </a>
              <a href="#" className="block text-sm hover:underline transition-colors" style={{ color: '#302F2C' }}>
                Ayuda
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6" style={{ borderColor: '#CBB89D' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm" style={{ color: '#302F2C' }}>
              © 2024 Canine Care. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Heart className="w-4 h-4" style={{ color: '#7FA087' }} />
              <span className="text-sm" style={{ color: '#302F2C' }}>
                Hecho con amor para tu mascota
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;