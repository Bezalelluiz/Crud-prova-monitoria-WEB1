<script>
  import { currentUser, instruments, addInstruments, removeInstruments } from "../stores";

  const form = {
    name: "",
    price: "",
    model: "",
  };

  function handleForm() {
    addInstruments(form.name,form.price,form.model, $currentUser.id)

    form.name = '';
    form.model = '';
    form.price = '';
  }

  function remove(id) {
    removeInstruments(id, $currentUser.id)
  }
</script>

{#if $currentUser}
  <div>
    <h2>Lista de Instrumentos </h2>
    <div>Nome - Preço - Modelo </div>
    {#each $instruments as instrument}
        <div class="objects">{instrument.name} - R${instrument.price} - {instrument.model} <a href="#" on:click|preventDefault={() => remove(instrument.id)}>remover</a></div>
    {/each}
    <form on:submit|preventDefault={handleForm}>
      <fieldset>
        <legend>Adicionar</legend>
        <input
          type="text"
          name="name"
          bind:value={form.name}
          placeholder="Nome"
          required
        />
        <input
          type="number"
          min="0.00"
          max="10000.00" 
          step="0.01"
          name="name"
          bind:value={form.price}
          placeholder="Valor"
          required
        />
        <input
          type="text"
          name="name"
          bind:value={form.model}
          placeholder="Modelo"
          required
        />
        <button>Adicionar</button>
      </fieldset>
    </form>
  </div>
{/if}

