/**
 * Genera una notificación visual (Toast) elegante con Tailwind CSS
 * @param {string} title Título de la notificación
 * @param {string} message Cuerpo del mensaje
 * @param {'success' | 'error' | 'info'} type Tipo de alerta
 */
export const showToast = (title, message, type = 'success') => {
  //     const container = document.createElement('div');

  //     // Configuración de colores según el tipo
  //     const colors = {
  //         success: 'border-green-500 text-green-700 bg-green-50',
  //         error: 'border-red-500 text-red-700 bg-red-50',
  //         info: 'border-blue-500 text-blue-700 bg-blue-50'
  //     };

  //     // Estructura del Toast
  //     container.className = `fixed top-6 left-1/2 -translate-x-1/2 min-w-[320px] max-w-md p-4 rounded-xl border-l-4 shadow-lg z-[100] transition-all duration-500 ease-out transform translate-y-[-20px] opacity-0 ${colors[type]}`;

  //     container.innerHTML = `
  //     <div class="flex items-start gap-3">
  //       <div class="flex-shrink-0 mt-0.5">
  //         ${type === 'success' ? `
  //           <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
  //             <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
  //           </svg>` : ''}
  //       </div>
  //       <div class="flex-1">
  //         <h3 class="font-bold text-sm leading-none mb-1">${title}</h3>
  //         <p class="text-xs opacity-90">${message}</p>
  //       </div>
  //       <button class="ml-auto text-current opacity-50 hover:opacity-100 transition-opacity" onclick="this.parentElement.parentElement.remove()">
  //         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
  //       </button>
  //     </div>
  //   `;

  const container = document.createElement('div');

  // Configuración de colores según el tipo
  // const colors = {
  //   success: 'border-green-500 text-green-700 bg-green-50',
  //   error: 'border-red-500 text-red-700 bg-red-50',
  //   info: 'border-blue-500 text-blue-700 bg-blue-50'
  // };
  const colors = {
    success: 'bg-green-100 text-green-800',
    error: 'border-red-500 text-red-700 bg-red-50',
    info: 'border-blue-500 text-blue-700 bg-blue-50'
  };

  // 

  // Estructura del Toast
  // container.className = `fixed top-6 left-1/2 -translate-x-1/2 min-w-[320px] max-w-md p-4 rounded-xl border-l-4 shadow-lg z-[100] transition-all duration-500 ease-out transform translate-y-[-20px] opacity-0`;
  container.className = `bg-white fixed top-6 left-1/2 -translate-x-1/2 min-w-[320px] max-w-md rounded-xl border-l-4 shadow-lg z-[100] transition-all duration-500 ease-out transform translate-y-[-20px] opacity-0`;

  container.innerHTML = `
    <div class="relative border border-gray-200 rounded-lg shadow-lg">
      <button onClick='return this.parentNode.remove()'
        class="absolute p-1 bg-gray-100 border border-gray-300 rounded-full -top-1 -right-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-3 h-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    
      <div class="flex items-center p-4">
        <img
          class="object-cover w-12 h-12 rounded-lg"
          src="https://randomuser.me/api/portraits/women/71.jpg"
          alt=""
        />
    
        <div class="ml-3 overflow-hidden">
          <span class="bg-green-100 text-green-800 text-xs font-medium px-1.5 py-0.5 rounded">Success</span>
          
          <p class="max-w-xs text-sm text-gray-500 truncate px-1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,
            laborum?
          </p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  // Animación de entrada
  requestAnimationFrame(() => {
    container.classList.remove('translate-y-[-20px]', 'opacity-0');
    container.classList.add('translate-y-0', 'opacity-100');
  });

  // Auto-eliminación con animación de salida
  setTimeout(() => {
    container.classList.add('opacity-0', 'translate-y-[-10px]');
    setTimeout(() => container.remove(), 500);
  }, 8000);
};