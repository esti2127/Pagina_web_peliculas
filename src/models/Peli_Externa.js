


const getFilms = async (titulo) => {
  try {

    // Si el usuario quiere buscar por TÍTULO debe aplicar el endpoint 'search')

    const url = `https://api.themoviedb.org/3/search/movie?api_key=b97fd47bb23aba00cfe9cc063934de44&query=${titulo}&language=es-ES`;
    
  
    const resp = await fetch(url);

    if (!resp.ok) {
      throw new Error(`Error: ${resp.status}`);
    }

    const data = await resp.json();
    // data.results devolverá el array de películas listo para guardar o mostrar
    return data.results[0];

  } catch (error) {
    console.error(`Error al obtener películas: ${error.message}`);
    throw error;
  }
};



module.exports = getFilms