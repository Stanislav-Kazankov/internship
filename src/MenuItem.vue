<template>
  <div class="sidebar__menu-item-wrapper">
    <li class="sidebar__menu-item" ref="menuItem" @click="onMenuItemClick"
      :class="{'sidebar__menu-item--active': activeMenuItem === $refs.menuItem}"
    >
      <slot name="menuItemSvg"/>
      <span class="sidebar__menu-item-caption"
        :class="{'sidebar__menu-item-caption--small': menuItemCaptionIsSmall}"
      >
        <slot name="menuItemCaption"/>
      </span>
      <svg v-if="displayWidth <= 767" class="sidebar__menu-item-toggle-svg" width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.70905 6.69036C6.32111 7.07811 5.69215 7.07811 5.30421 6.69036L0.306472 1.69499C-0.0814626 1.30723 -0.081462 0.678565 0.306473 0.290813C0.694408 -0.0969372 1.32337 -0.0969372 1.71131 0.290813L6.70905 5.28619C7.09698 5.67394 7.09698 6.30261 6.70905 6.69036Z"/>
        <path d="M6.70905 5.29413C6.32111 4.90637 5.69215 4.90637 5.30421 5.29413L0.290951 10.305C-0.096984 10.6928 -0.0969834 11.3214 0.290951 11.7092C0.678886 12.0969 1.30785 12.0969 1.69579 11.7092L6.70905 6.6983C7.09698 6.31054 7.09698 5.68188 6.70905 5.29413Z"/>
      </svg>
      <transition name="appear-roll-down-animation">
        <app-submenu
          :submenuItemNames="this.submenuItemNames"
          :submenuIsNarrow="this.submenuIsNarrow"
          :submenuHaveSearchField="this.submenuHaveSearchField"
          v-if="displayWidth >= 768 && (
              menuItemName !== 'userInfo' && activeMenuItem === $refs.menuItem
              || menuItemName === 'userInfo' && activeMenuItem === $refs.menuItem && userIsAuthorized
          )"
        >
          <template slot="additionalSubmenuItems">
            <slot name="additionalSubmenuItems"/>
          </template>
        </app-submenu>
      </transition>
    </li>
    <transition name="appear-roll-down-animation">
      <app-submenu
        :submenuItemNames="this.submenuItemNames"
        :submenuIsNarrow="this.submenuIsNarrow"
        :submenuHaveSearchField="this.submenuHaveSearchField"
        v-if="displayWidth < 768 && (
            menuItemName !== 'userInfo' && activeMenuItem === $refs.menuItem
            || menuItemName === 'userInfo' && activeMenuItem === $refs.menuItem && userIsAuthorized
        )"
      >
        <template slot="additionalSubmenuItems">
          <slot name="additionalSubmenuItems"/>
        </template>
      </app-submenu>
    </transition>
  </div>
</template>

<script>
  export default {
    created () {
      window.addEventListener('resize', this.updateDisplayWidth);
    },
    data () {
      return {
        displayWidth: window.screen.width
      }
    },
    props: [
      'menuItemName',
      'activeMenuItem',
      'menuItemCaptionIsSmall',
      'submenuItemNames',
      'submenuIsNarrow',
      'submenuHaveSearchField',
      'userIsAuthorized'
    ],
    methods: {
      onMenuItemClick () {
        this.$emit('activeMenuItemChanged', this.$refs.menuItem);
        if (this.menuItemName === 'settings' ||
          this.menuItemName === 'support' ||
          this.menuItemName === 'userInfo' ||
          this.menuItemName === 'notifications' &&
          this.displayWidth <= 767
        ) {
          this.$emit('closingMenuItemSelected');
        }
      },
      updateDisplayWidth() {
        this.displayWidth = window.screen.width;

        const submenu = document.querySelector('.submenu');
        if (submenu) {
          const scrollbarArea = submenu.querySelector('.submenu__scrollbar');
          if (this.displayWidth < 1280) {
            submenu.style.width = '100%';
            scrollbarArea.style.width = '100%';
          } else {
            if (this.menuItemName === "userInfo") {
              submenu.style.width = '270px';
              scrollbarArea.style.width = '233px';
            } else {
              submenu.style.width = '320px';
              scrollbarArea.style.width = '283px';
            }
          }
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

  .sidebar {
    &__menu {
      &--user {
        .sidebar__menu-item-wrapper:first-child {
          @media (max-width: $max-tablt-width) {
            order: 2;
          }

          @media (min-width: $deskt-width) {
            margin-left: -7px;
          }
        }

        .sidebar__avatar-box {
          width: 34px;
          height: 34px;
          border-radius: 50%;
        }
      }

      &--main {
        .sidebar__menu-item-wrapper {
          @media (max-width: $max-mobl-width) {
            flex-direction: column;
          }
        }

        .sidebar__menu-item {
          transition: width 1s;

          @media (max-width: $max-mobl-width) {
            justify-content: space-between;
            width: 100%;
            height: 50px;

            background-color: #333333;
            border-top: 1px solid #45484E;
          }

          &-svg {
            @media (max-width: $max-mobl-width) {
              display: none;
            }
          }

          &-svg:not(.sidebar__menu-item-svg--calculations):not(.sidebar__menu-item-svg--bookmarks) {
            fill: #8E9CBB;
            transition: fill 1s;
          }

          &-svg--reports {
            @media (min-width: $deskt-width) {
              margin-top: 5px;
            }
          }

          &-svg--calculations,
          &-svg--bookmarks {
            stroke: #8E9CBB;
            transition: stroke 1s;
          }

          .sidebar__menu-item-toggle-svg {
            fill: #8E9CBB;
            transition: fill 1s;
            transition: transform 1s;

            @media (max-width: $max-mobl-width) {
              display: flex;
            }
          }

          &--active {
            .sidebar__menu-item-svg:not(.sidebar__menu-item-svg--calculations):not(.sidebar__menu-item-svg--bookmarks) {
              fill: #FF238D;
              transition: fill 1s;
            }

            .sidebar__menu-item-svg--calculations,
            .sidebar__menu-item-svg--bookmarks {
              stroke: #FF238D;
              transition: stroke 1s;
            }

            .sidebar__menu-item-caption {
              color: #FF238D;
            }

            .sidebar__menu-item-toggle-svg {
              fill: #FF238D;
              transform: rotate(90deg);
            }
          }
        }
      }
    }

    &__menu-item-wrapper {
      display: flex;
      justify-items: center;
    }

    &__menu-item {
      justify-items: start;
      align-items: center;

      cursor: pointer;

      @media (max-width: $max-tablt-width) {
        display: flex;
      }

      @media (min-width: $deskt-width) {
        display: grid;
        grid-template-columns: 19px auto;
      }

      &-caption {
        display: flex;
        align-items: center;
        height: 20px;

        overflow-x: hidden;

        transition: color 1s;

        &--small {
          height: 26px;
          padding-top: 3px;
          padding-left: 2px;

          font-size: 12px;
          line-height: 110%;

          overflow-y: hidden;
          white-space: nowrap;

          .sidebar__user-first-name,
          .sidebar__user-last-name {
            display: block;
            margin-bottom: 1px;
          }
        }
      }

      .sidebar__menu-item-toggle-svg {
        display: none;
      }
    }

    &--extended {
      .sidebar__menu-item {
        @media (min-width: $deskt-width) {
          grid-column-gap: 22px;
        }
      }
    }
  }

  .appear-roll-down-animation-enter {
    @media (max-width: $max-tablt-width) {
      height: 0 !important;
    }

    @media (min-width: $deskt-width) {
      width: 0 !important;
    }
  }

  .appear-roll-down-animation-enter-active {
    @media (max-width: $max-tablt-width) {
      transition: height 1s;
    }

    @media (min-width: $tablt-width) {
      animation: 1s appear-animation;
    }

    @media (min-width: $deskt-width) {
      transition: width 1s;
    }
  }

  .appear-roll-down-animation-leave-active {
    @media (max-width: $max-tablt-width) {
      transition: height 1s;
    }

    @media (min-width: $tablt-width) {
      animation: 1s disappear-animation;
    }

    @media (min-width: $deskt-width) {
      transition: width 1s;
    }
  }

  .appear-roll-down-animation-leave-to {
    @media (max-width: $max-tablt-width) {
      height: 0 !important;
    }

    @media (min-width: $deskt-width) {
      width: 0 !important;
    }
  }

  @keyframes appear-animation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes disappear-animation {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
</style>
