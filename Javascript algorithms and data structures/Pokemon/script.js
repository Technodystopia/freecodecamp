document.getElementById('search-button').addEventListener('click', () => {
    const inputValue = document.getElementById('search-input').value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue.toLowerCase()}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokémon not found');
        }
        return response.json();
      })
      .then(data => {
        document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
        document.getElementById('pokemon-id').textContent = `#${data.id}`;
        document.getElementById('weight').textContent = `Weight: ${data.weight}`;
        document.getElementById('height').textContent = `Height: ${data.height}`;
        document.getElementById('types').innerHTML = '';
        data.types.forEach(type => {
          const typeElement = document.createElement('div');
          typeElement.textContent = type.type.name.toUpperCase();
          document.getElementById('types').appendChild(typeElement);
        });
        data.stats.forEach(stat => {
          switch (stat.stat.name) {
            case 'hp':
              document.getElementById('hp').textContent = `${stat.base_stat}`;
              break;
            case 'attack':
              document.getElementById('attack').textContent = `${stat.base_stat}`;
              break;
            case 'defense':
              document.getElementById('defense').textContent = `${stat.base_stat}`;
              break;
            case 'special-attack':
              document.getElementById('special-attack').textContent = `${stat.base_stat}`;
              break;
            case 'special-defense':
              document.getElementById('special-defense').textContent = `${stat.base_stat}`;
              break;
            case 'speed':
              document.getElementById('speed').textContent = `${stat.base_stat}`;
              break;
            default:
              break;
          }
        });
        document.getElementById('sprite').src = data.sprites.front_default;
      })
      .catch(error => {
        alert(error.message);
      });
  });
  