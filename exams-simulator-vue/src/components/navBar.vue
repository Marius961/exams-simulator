<template>
  <header class="w-100 nab-bg-container">
    <div class="container">
      <nav class="row nav-bg align-items-center pt-2 pb-2" id="navPanel">
        <div class="col col-md-auto order-2 order-md-first text-center p-1"><img src="../../static/logo.png" width="32" height="32" alt="ES"></div>
        <div class="col-12 col-md-auto d-lg-block" id="menuContent">
          <div class="row pr-3 pl-3">
            <router-link to="/" exact tag="div" class="col-12 col-md-auto p-1 pl-2 pr-2" active-class="active">
              <a class="nav-link-1">Головна</a>
            </router-link>
            <router-link to="/constructor" tag="div" class="col-12 col-md-auto p-1 pl-2 pr-2" active-class="active">
              <a class="nav-link-1">Конструктор тестів</a>
            </router-link>
          </div>
        </div>
        <div class="col-2 col-md-auto order-1" id="menuBtn"><img src="../../static/menu.png" width="24" height="24" alt="Меню"></div>
        <div class="col-2 col-md order-3 order-md-2">
          <div class="row justify-content-end align-items-center">
            <div class="col-auto text-center nav-item-1" id="letItSnowBtn">
              <div class="row align-items-center no-gutters">
                <div class="col-auto p-1">
                  <img src="../../static/ice-crystal.png" width="18" height="18">
                </div>
                <div class="col-auto snow-label pt-1 d-none d-sm-block"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>
