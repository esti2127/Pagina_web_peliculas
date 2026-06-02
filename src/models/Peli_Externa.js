


const getFilms = async (titulo) => {
  try {

    const url = `https://www.omdbapi.com/?apikey=2ffc8b50&t=${titulo}`;

    const resp = await fetch(url);

    if (!resp.ok) {
      throw new Error(`Error: ${resp.status}`);
    }

    const data = await resp.json();
    const { Title, Year, Runtime, Poster, Director, imdbID } = data
    return { Title, Year, Runtime, Poster, Director, imdbID }

  } catch (error) {
    console.error(`Error al obtener películas: ${error.message}`);
    throw error
  }
}



module.exports = getFilms