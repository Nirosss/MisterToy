<template>
  <article class="custom-card flex flex-col align-center">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <!-- <slot name="default"></slot> -->
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </article>
</template>

<style scoped>
  .custom-card {
    justify-content: space-between;
    background: white;
    color: black;
    padding: 2em;
    border: 1px solid black;
    border-radius: 5px;
  }

  .custom-card header {
    font-size: 2rem;
  }

  .custom-card main {
    text-align: center;
  }

  .custom-card footer {
    font-size: 1rem;
    color: gray;
  }
</style>
