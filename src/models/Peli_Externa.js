


const getFilms = async (titulo) => {
  try {

    // Si el usuario quiere buscar por TÍTULO debe aplicar el endpoint 'search')


    // const url = `https://api.themoviedb.org/3/search/movie?api_key=2ffc8b50&query=${titulo}&language=es-ES`;

    const url = `https://www.omdbapi.com/?apikey=2ffc8b50&t=${titulo}`;




    const resp = await fetch(url);
    console.log(resp)

    if (!resp.ok) {
      throw new Error(`Error: ${resp.status}`);
    }

    const data = await resp.json();
    // data.results devolverá el array de películas listo para guardar o mostrar
  const {Title, Year, Runtime, Poster, Director, imdbID} = data
  return {Title, Year, Runtime, Poster, Director, imdbID}



  } catch (error) {
    console.error(`Error al obtener películas: ${error.message}`);
    throw error;
  }
};



module.exports = getFilms