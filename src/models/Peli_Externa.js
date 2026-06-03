

/**
 * Busca una película en la API externa OMDB por su título.
 * Se utiliza como respaldo cuando la película no se encuentra en la base de datos local.
 *
 * @async
 * @function getFilms
 * @param {string} titulo - Título exacto de la película a buscar en OMDB
 * @returns {Promise<{Title: string, Year: string, Runtime: string, Poster: string, Director: string, imdbID: string}>}
 *   Objeto con los datos de la película devueltos por la API externa
 * @throws {Error} Si la API externa responde con un código HTTP de error
 * @throws {Error} Si ocurre un error de conexión o red
 * @see https://www.omdbapi.com/
 */
const getFilms = async (titulo) => {
  try {

    /**Definimos la url de la API que vamos a utilizar para recoger las peliculas por su titulo*/

    const url = `https://www.omdbapi.com/?apikey=2ffc8b50&t=${titulo}`;

    const resp = await fetch(url);
    // console.log(resp)

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