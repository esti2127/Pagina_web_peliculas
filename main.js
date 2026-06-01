const getFilms = async (criterio, valor) => {
  try {
    // Usamos una API de ejemplo (como OMDb o TMDB)
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=b97fd47bb23aba00cfe9cc063934de44`;

    // Si el usuario quiere filtrar por GÉNERO se usa el endpoint &with_genres
    if (criterio === 'genero' && valor) {
      url += `&with_genres=${valor}`;
    }

    // Si el usuario quiere buscar por TÍTULO debe aplicar el endpoint 'search')
    if (criterio === 'titulo' && valor) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=b97fd47bb23aba00cfe9cc063934de44&query=${valor}`;
    }

    const resp = await fetch(url);

    if (!resp.ok) {
      throw new Error(`Error: ${resp.status}`);
    }

    const data = await resp.json();
    // data.results devolverá el array de películas listo para guardar o mostrar
    return data.results;

  } catch (error) {
    console.error(`Error al obtener películas: ${error.message}`);
    return [];
  }
};









const getFilmsFromLocalBD = async (criterio, valor) => {
  try {
    // Simulamos exactamente lo que te devolvería tu comando SELECT * FROM peliculas
    const misPelisManuales = [
      {
        id_pelicula: 1,
        titulo: 'The Shawshank Redemption',
        imagen: 'https://www.imdb.com/title/tt0111161/',
        anio: 1994,
        director: 'Frank Darabont',
        duracion: 142
      },
      {
        id_pelicula: 2,
        titulo: 'The Godfather',
        imagen: 'https://www.imdb.com/title/tt0068646/',
        anio: 1972,
        director: 'Francis Ford Coppola',
        duracion: 175
      },
      {
        id_pelicula: 3,
        titulo: 'Inception',
        imagen: 'https://www.imdb.com/title/tt1375666/',
        anio: 2010,
        director: 'Christopher Nolan',
        duracion: 148
      },
      {
        id_pelicula: 4,
        titulo: 'Parasite',
        imagen: 'https://www.imdb.com/es-es/title/tt6751668',
        anio: 2019,
        director: 'Bong Joon Ho',
        duracion: 132
      },
      {
        id_pelicula: 5,
        titulo: 'Interstellar',
        imagen: 'https://www.imdb.com/es-es/title/tt0816692',
        anio: 2014,
        director: 'Christopher Nolan',
        duracion: 209
      }

    ];

    // Si el usuario busca algo, filtramos en nuestro array simulado
    if (criterio === 'titulo' && valor) {
      return misPelisManuales.filter(p => p.titulo.toLowerCase().includes(valor.toLowerCase()));
    }


    // Si el usuario busca por género, como es una simulación local, devolvemos todas
    if (criterio === 'genero') {
      return misPelisManuales;
    }

    // Si no hay filtro, devolvemos todas las de "nuestra base de datos"
    return misPelisManuales;

  } catch (error) {
    console.error(`Fallo en la simulación: ${error.message}`);
    //hay que devolver un array vacio para evitar que el código explote al hacer el spread para unir las dos listas.
    return [];
  }
};






const buscarCatalogoCompleto = async (criterio, valor) => {
  try {
    // Buscamos la pelicula en nuestra bbdd creada a mano. 
    const misPeliculasLocales = await getFilmsFromLocalBD(criterio, valor);

    // Buscamos las peliculas en la API externa
    const peliculasAPI = await getFilms(criterio, valor);

    // 3. MAPEAR LAS PELÍCULAS DE LA API: cambia el nombre de las etiquetas de la lista que has cogido de la API externa para que coincidan exactamente con las columnas de tu base de datos
    const peliculasAPIMapeadas = [];

    peliculasAPI.forEach(p => {


      //Asignamos una foto por defecto por si la pelicula viene sin imagen. Asi evitamos que en la bbdd de datos haya datos nulos
      let urlImagen = 'url-por-defecto.jpg';

      //Comprobamos que la API nos haya enviado una imagen
      if (p.poster_path !== null && p.poster_path !== undefined) {
        urlImagen = `https://image.tmdb.org/t/p/w500${p.poster_path}`;
      }

      //Marcador a 0 por si la peli es nueva (así al menos sale algo y no es un dato vacío).
      let anioPeli = 0;

      //comprobamos si la pelicula tiene el campo de fecha de estreno
      if (p.release_date) {
        //como las fechas se guardan con guiones, separamos año, mes y dia en elementos de un array, para quedarnos solo con el año, que eso lo que nos interesa.
        let partesDeLaFecha = p.release_date.split('-');
        //Como el año esta en string y al crear la tabla hemos especificado que el año es un numero (INT) lo pasamos a numero. partesDeLaFecha[0] se refiere al año, que es el primer elemento del array.
        anioPeli = Number.parseInt(partesDeLaFecha[0]);
      }

      //Creamos en objeto
      let nuevaPeliculaArreglada = {
        //Nuestra base de datos le asigna un id a la pelicula y las peliculas de la API externa ya vienen con un ID. Eso puede generar conflicto. Así que añadimos api- antes del número del id para evitar ese conflicto. 
        id_pelicula: `api-${p.id}`,
        titulo: p.title,
        imagen: urlImagen,
        anio: anioPeli,
        //Estos hay que añadirlos porque al crear las tablas hemos especificado que son datos NOT NULL
        director: "Ver créditos en TMDB",
        duracion: 0
      };

      // 3. Añadimos la película fabricada al array que hemos creado arriba. 
      peliculasAPIMapeadas.push(nuevaPeliculaArreglada);

    });

    // 4. Evitamos que se muestre la pelicula dos veces si está tanto en nuestra bbdd como en la API externa. 
    // Con el filter() recorremos la lista de la API externa. 
    //Con el some() comprobamos si el titulo ya existe en nuestra lista local
    //Si ya existe, se descarta
    const apiFiltradaSinDuplicados = peliculasAPIMapeadas.filter(p_api =>
      !misPeliculasLocales.some(p_local => p_local.titulo.toLowerCase() === p_api.titulo.toLowerCase())
    );

    // Unimos ambas listas: las peliculas encontradas en nuestra lista local y las peliculas que hemos encontrado en la API externa.
    const catalogoFinal = [...misPeliculasLocales, ...apiFiltradaSinDuplicados];

    return catalogoFinal;

  } catch (error) {
    console.error("Error al fusionar los catálogos:", error);
    return [];
  }
};


