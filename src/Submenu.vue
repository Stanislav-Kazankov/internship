<template>
  <div class="submenu" ref="submenu" :style="{'width': submenuWidth}" @click.stop>
    <app-scrollbar classes="submenu__scrollbar" ref="Scrollbar" :style="{'width': scrollbarAreaWidth}">
      <div>
        <div class="submenu__search-field" v-if="submenuHaveSearchField === true">
          <svg class="submenu__search-svg" width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.4142 11L15.6569 15.2426M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z" stroke="#8E9CBB" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <input class="submenu__input" type="text" v-model="searchString" placeholder="Поиск">
        </div>
        <ul class="submenu__list">
          <li
            class="submenu__item"
            @click="onSubmenuItemClick"
            v-for="submenuItemName of filteredSubmenuItemNames"
          >
            {{submenuItemName}}
          </li>
        </ul>
        <slot name="additionalSubmenuItems"/>
      </div>
    </app-scrollbar>
  </div>
</template>

<script>
  export default {
    created () {
      window.addEventListener('resize', this.updateDisplayWidth);

      const config = { attributes: false, childList: true, subtree: true };

      const observer = new MutationObserver((mutationsList, observer) => {
        const submenu = document.querySelector('.submenu');
        if (submenu !== null) {
          if (768 <= window.innerWidth && window.innerWidth < 1280) {
            if (submenu.clientHeight <= window.innerHeight - 50 && submenu.style.height !== 'calc(100vh - 100%)') {
              submenu.style.height = 'auto';
            } else {
              submenu.style.height = 'calc(100vh - 100%)';
            }
          }
        }
      });

      observer.observe(document.querySelector('.sidebar'), config);
    },
    props: {
      submenuItemNames: {},
      submenuIsNarrow: {},
      submenuHaveSearchField: {
        default: true
      }
    },
    data () {
      return {
        displayWidth: window.innerWidth,
        searchString: '',
        activeMenuItem: null
      }
    },
    computed: {
      submenuWidth () {
        if (this.displayWidth >= '1280') {
          return this.submenuIsNarrow ? '270px' : '320px';
        } else {
          return '100%';
        }
      },
      scrollbarAreaWidth () {
        if (this.displayWidth >= '1280') {
          return this.submenuIsNarrow ? '233px' : '283px';
        } else {
          return '100%';
        }
      },
      filteredSubmenuItemNames () {
        return this.submenuItemNames.filter(name => {
          return name.toLowerCase().indexOf(this.searchString.toLowerCase()) !== -1
        })
      }
    },
    methods: {
      updateDisplayWidth() {
        const submenu = document.querySelector('.submenu');
        if (submenu !== null) {
          if (768 <= window.innerWidth && window.innerWidth < 1280 && submenu.style.height !== 'calc(100vh - 100%)') {
            if (submenu.clientHeight <= window.innerHeight - 50) {
              submenu.style.height = 'auto';
            } else {
              submenu.style.height = 'calc(100vh - 100%)';
            }
          }
          if (1280 < window.innerWidth) {
            submenu.style.height = '100%';
          }
        }
        this.displayWidth = window.innerWidth;
      },
      onSubmenuItemClick ($event) {
        if (this.activeMenuItem) {
          this.activeMenuItem.classList.remove('submenu__item--active');
        }
        if (this.activeMenuItem !== $event.target) {
          if ($event.target) {
            $event.target.classList.add('submenu__item--active');
          }
          this.activeMenuItem = $event.target;
        } else {
          this.activeMenuItem = null;
        }
      }
    }
  }
</script>

<style lang="scss">
  $max-mobl-width: 767px;
  $tablt-width: 768px;
  $max-tablt-width: 1279px;
  $deskt-width: 1280px;

  .submenu {
    padding-bottom: 10px;
    padding-left: 25px;
    padding-right: 12px;

    background-color: #FFFFFF;
    box-shadow: 0px 0px 20px rgba(8, 20, 45, 0.3);

    overflow: hidden;
    cursor: default;

    @media (min-width: $tablt-width) {
      position: absolute;
    }

    @media (max-width: $max-tablt-width) {
      top: 100%;
      left: 0;

      width: 100%;
    }

    height: calc(100vh - 100%);

    @media (max-width: $max-mobl-width) {
      height: 440px;
      padding-top: 20px;
    }

    @media (min-width: $tablt-width) and (max-width: $max-tablt-width) {
      min-height: auto;
      padding-top: 23px;
    }

    @media (min-width: $deskt-width) {
      top: 0;
      left: 100%;

      height: 100%;
      padding-top: 17px;
    }

    &__scrollbar {
      height: 100%;
      padding-right: 13px;
    }

    &__search-svg {
      margin-right: 9px;
    }

    &__search-field {
      align-items: center;
      padding-bottom: 6px;
      margin-top: -3px;
      margin-bottom: 17px;

      border-bottom: 1px solid #BFC9E0;

      @media (max-width: $max-mobl-width) {
        display: none;
      }

      @media (min-width: $tablt-width) {
        display: flex;
      }
    }

    &__input {
      width: 100%;
      height: 30px;

      font-style: italic;
      font-size: 15px;
      line-height: 108%;
      color: #8E9CBB;

      border: none;

      outline: none;

      /* webkit: Safary, Chrome, Opera */
      &::-webkit-input-placeholder {
        font-size: 15px;
        line-height: 108%;
        color: #8E9CBB;
      }

      /* Firefox 19+ */
      &::-moz-placeholder {
        font-size: 15px;

        opacity: 1;
      }

      /* Firefox 19+ */
      &::-moz-placeholder {
        font-size: 15px;

        opacity: 0;
      }

      /* IE */
      &:-ms-input-placeholder {
        font-size: 15px;
        line-height: 108%;
        color: #8E9CBB;
      }

      /* Edge */
      &::-ms-input-placeholder {
        font-size: 15px;
        line-height: 108%;
        color: #8E9CBB;
      }

      /* IE */
      &::-ms-clear {  display: none; width : 0; height: 0; }
      &::-ms-reveal {  display: none; width : 0; height: 0; }

      /* Chrome, Edge, Safary */
      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration { display: none; }
    }

    &__list {
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;

      font-weight: 400;
      letter-spacing: normal;
      text-transform: capitalize;

      color: #0066FF;

      @media (max-width: $max-tablt-width) {
        font-size: 14px;
        line-height: 260%;
        letter-spacing: 0.2pt;
      }

      @media (max-width: $max-mobl-width) {
        margin-top: -9px;
      }

      @media (min-width: $deskt-width) {
        font-size: 13px;
        line-height: 200%;
      }
    }

    &__item {
      display: flex;
      justify-items: flex-start;

      align-items: center;

      transition: color 1s;
      cursor: pointer;

      &-svg {
        margin-right: 13px;
      }

      &--active {
        color: #000000;
      }
    }

    &__section-separator {
      width: 100%;
      height: 1px;
      margin-top: 0;
      margin-bottom: 9px;
      background-color: #DFE4EF;
      border: none;
    }
  }

  .sidebar__menu:not(.sidebar__menu--main) {
    .submenu {
      @media (max-width: $max-mobl-width) {
        position: absolute;

        width: 100%;
        height: calc(100vh - 50px);
      }
    }
  }

</style>
