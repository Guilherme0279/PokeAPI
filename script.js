document.addEventListener('DOMContentLoaded', () => {
    const app = Vue.createApp({
        data() {
            return {
                pokemons: []
            };
        },
        mounted() {
            this.fetchPokemons();
        },
        methods: {
            async fetchPokemons() {
                const url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
                try {
                    const response = await fetch(url);
                    const { results } = await response.json();
                    results.forEach(async (pokemon) => {
                        const pokemonData = await fetch(pokemon.url);
                        const details = await pokemonData.json();
                        this.pokemons.push({
                            id: details.id,
                            name: details.name,
                            image: details.sprites.front_default,
                            types: details.types.map(type => type.type.name)
                        });
                    });
                } catch (error) {
                    console.error("Error fetching Pokémon data: ", error);
                }
            },
            typeClass(pokemon) {
                if (pokemon.types.length > 0) {
                    return `type-${pokemon.types[0]}`;
                }
                return '';
            }
        }
    });

    app.mount('#app');
});
