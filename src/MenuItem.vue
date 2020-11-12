<template>
  <li class="sidebar__menu-item" ref="menuItem" @click="onMenuItemClick"
    :class="{'sidebar__menu-item--active': activeMenuItem === $refs.menuItem}"
  >
    <slot name="menuItemSvg"/>
    <span class="sidebar__menu-item-caption"
      :class="{'sidebar__menu-item-caption--small': menuItemCaptionIsSmall}"
      :style="{width: sidebarIsExtended ? '100%' : '0'}"
    >
      <slot name="menuItemCaption"/>
    </span>
    <transition name="appear-roll-down-animation">
      <app-submenu
        :submenuItemNames="this.submenuItemNames"
        :submenuIsNarrow="this.submenuIsNarrow"
        :submenuHaveSearchField="this.submenuHaveSearchField"
        v-if="menuItemName !== 'userInfo' && activeMenuItem === $refs.menuItem
          || menuItemName === 'userInfo' && activeMenuItem === $refs.menuItem && userIsAuthorized"
      >
        <template slot="additionalSubmenuItems">
          <slot name="additionalSubmenuItems"/>
        </template>
      </app-submenu>
    </transition>
  </li>
</template>

<script>
  export default {
    props: [
      'menuItemName',
      'activeMenuItem',
      'menuItemCaptionIsSmall',
      'submenuItemNames',
      'submenuIsNarrow',
      'submenuHaveSearchField',
      'sidebarIsExtended',
      'userIsAuthorized'
    ],
    methods: {
      onMenuItemClick () {
        this.$emit('activeMenuItemChanged', this.$refs.menuItem);
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
        .sidebar__avatar-box {
          width: 34px;
          height: 34px;
          border-radius: 50%;
        }
      }

      &--main {
        .sidebar__menu-item {
          transition: width 1s;

          @media (max-width: $max-mobl-width) {
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
          }
        }
      }
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
        grid-column-gap: 22px;
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
    animation: 1s appear-animation;

    @media (max-width: $max-tablt-width) {
      transition: height 1s;
    }

    @media (min-width: $deskt-width) {
      transition: width 1s;
    }
  }

  .appear-roll-down-animation-leave-active {
    @media (max-width: $max-tablt-width) {
      transition: height 1s;
    }

    @media (min-width: $deskt-width) {
      transition: width 1s;
    }

    animation: 1s disappear-animation;
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
