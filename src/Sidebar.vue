<template>
  <div class="sidebar" id="sidebar-home" ref="sidebar" :class="{'sidebar--extended': sidebarIsExtended, 'sidebar--open': sidebarIsOpen}">
    <a class="sidebar__toggle" href="#sidebar-home" @click="onToggleClick">
      <transition name="appear-stretch-animation">
        <svg class="sidebar__burger-svg" v-if="!sidebarIsOpen" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1H17M1 8H17M1 15H17" stroke="#8E9CBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </transition>
      <transition name="appear-stretch-animation">
        <svg class="sidebar__cross-svg" v-if="sidebarIsOpen" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.0254 15.0007L2.02468 1M1.9541 15.0007L15.9548 1" stroke="#FF238D" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </transition>
    </a>
    <ul class="sidebar__menu sidebar__menu--user">
      <app-menu-item
        @activeMenuItemChanged="onActiveMenuItemChange"
        @closingMenuItemSelected="onClosingMenuItemSelect"
        menuItemName = "userInfo"
        menuItemCaptionIsSmall = "true"
        :activeMenuItem="activeMenuItem"
        :submenuItemNames="submenus.userInfo"
        submenuIsNarrow="true"
        submenuHaveSearchField="false"
        :sidebarIsExtended="sidebarIsExtended"
        :userIsAuthorized = "userIsAuthorized"
      >
        <div class="sidebar__avatar-box" slot="menuItemSvg">
          <img :src="currentUserData.pathToAvatar" alt="Аватар пользователя" v-if="userIsAuthorized === true">
          <svg class="sidebar__menu-item-svg" v-else width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="17" cy="17" r="17" fill="#8E9CBB"/>
            <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="34">
            <circle cx="17" cy="17" r="17" fill="#8E9CBB"/>
            </mask>
            <g mask="url(#mask0)">
            <path d="M28 30L26 31.5V26.5926C26 25.905 25.7103 25.2456 25.1945 24.7594C24.6788 24.2731 23.9793 24 23.25 24H17H10.75C10.0207 24 9.32118 24.2731 8.80546 24.7594C8.28973 25.2456 8 25.905 8 26.5926V31.5L6 30V26.6667C6 25.429 6.50044 24.242 7.39124 23.3668C8.28204 22.4917 9.49022 22 10.75 22C10.75 22 15 22 17 22C19 22 23.25 22 23.25 22C24.5098 22 25.718 22.4917 26.6088 23.3668C27.4996 24.242 28 25.429 28 26.6667V30Z" fill="#333333"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M23 14C23 17.3137 20.3137 20 17 20C13.6863 20 11 17.3137 11 14C11 10.6863 13.6863 8 17 8C20.3137 8 23 10.6863 23 14ZM21 14C21 16.2091 19.2091 18 17 18C14.7909 18 13 16.2091 13 14C13 11.7909 14.7909 10 17 10C19.2091 10 21 11.7909 21 14Z" fill="#333333"/>
            </g>
          </svg>
        </div>
        <span slot="menuItemCaption">
          <span class="sidebar__user-first-name">{{userIsAuthorized ? currentUserData.firstName : 'Пользователь'}}</span>
          <span class="sidebar__user-last-name">{{userIsAuthorized ? currentUserData.lastName : 'не авторизован'}}</span>
        </span>
        <hr class="submenu__section-separator" slot="additionalSubmenuItems">
        <ul class="submenu__list" slot="additionalSubmenuItems" submenus.calculations>
          <li class="submenu__item">
            <svg class="submenu__item-svg" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 8.99121L13 5.99121L10 2.99121M12 5.99121H6M6 11H2.66667C2.22464 11 1.80072 10.8829 1.48816 10.6746C1.17559 10.4662 1 10.1836 1 9.88889V2.11111C1 1.81643 1.17559 1.53381 1.48816 1.32544C1.80072 1.11706 2.22464 1 2.66667 1H6" stroke="#8E9CBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Выход
          </li>
        </ul>
      </app-menu-item>
      <app-menu-item @activeMenuItemChanged="onActiveMenuItemChange" @closingMenuItemSelected="onClosingMenuItemSelect" :activeMenuItem="activeMenuItem" menuItemName = "notifications" :submenuItemNames="submenus.notifications" :sidebarIsExtended="sidebarIsExtended">
        <div class="sidebar__notification-svg-box" slot="menuItemSvg">
          <svg class="sidebar__menu-item-svg" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.3333 7.88475C14.3333 6.2975 13.7714 4.77525 12.7712 3.6529C11.771 2.53054 10.4145 1.90001 9 1.90001C7.58551 1.90001 6.22896 2.53054 5.22876 3.6529C4.22857 4.77525 3.66667 6.2975 3.66667 7.88475C3.66667 14.8669 1 15.8999 1 15.8999H17C17 15.8999 14.3333 14.8669 14.3333 7.88475Z" stroke="#8E9CBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 19C10.7968 19.3031 10.505 19.5547 10.154 19.7295C9.80302 19.9044 9.40506 19.9965 9 19.9965C8.59494 19.9965 8.19698 19.9044 7.84598 19.7295C7.49498 19.5547 7.20325 19.3031 7 19" stroke="#8E9CBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div class="sidebar__notification-count-box">
            {{notificationCount}}
          </div>
        </div>
      </app-menu-item>
    </ul>
    <hr class="sidebar__menu-separator">
    <transition name="appear-animation">
      <ul class="sidebar__menu sidebar__menu--main" ref="mainMenu" v-if="sidebarIsOpen && displayWidth < 768 || displayWidth >= 768">
        <app-menu-item @activeMenuItemChanged="onActiveMenuItemChange" :activeMenuItem="activeMenuItem" :submenuItemNames="submenus.calculations" :sidebarIsExtended="sidebarIsExtended">
          <svg class="sidebar__menu-item-svg sidebar__menu-item-svg--calculations" slot="menuItemSvg" width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7H17M4 11H6M4 15H6M8 11H10M8 15H10M13 16V10M3 19H15C16.1046 19 17 18.1046 17 17V3C17 1.89543 16.1046 1 15 1H3C1.89543 1 1 1.89543 1 3V17C1 18.1046 1.89543 19 3 19Z" stroke-width="2"/>
          </svg>
          <span slot="menuItemCaption">Расчеты</span>
        </app-menu-item>
        <app-menu-item @activeMenuItemChanged="onActiveMenuItemChange" :activeMenuItem="activeMenuItem" :submenuItemNames="submenus.reports" :sidebarIsExtended="sidebarIsExtended">
          <svg class="sidebar__menu-item-svg sidebar__menu-item-svg--reports" slot="menuItemSvg" width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 1C2 0.447715 1.55228 0 1 0C0.447715 0 0 0.447715 0 1H2ZM1 15H0C0 15.5523 0.447715 16 1 16L1 15ZM19 16C19.5523 16 20 15.5523 20 15C20 14.4477 19.5523 14 19 14V16ZM4 11C4 11.5523 4.44772 12 5 12C5.55228 12 6 11.5523 6 11H4ZM6 9C6 8.44772 5.55228 8 5 8C4.44772 8 4 8.44772 4 9H6ZM8 11C8 11.5523 8.44772 12 9 12C9.55229 12 10 11.5523 10 11H8ZM10 5C10 4.44772 9.55229 4 9 4C8.44772 4 8 4.44772 8 5H10ZM16 11C16 11.5523 16.4477 12 17 12C17.5523 12 18 11.5523 18 11H16ZM18 3C18 2.44772 17.5523 2 17 2C16.4477 2 16 2.44772 16 3H18ZM12 11C12 11.5523 12.4477 12 13 12C13.5523 12 14 11.5523 14 11H12ZM14 7C14 6.44772 13.5523 6 13 6C12.4477 6 12 6.44772 12 7H14ZM0 1V15H2V1H0ZM1 16H19V14H1V16ZM6 11V9H4V11H6ZM10 11V5H8V11H10ZM18 11V3H16V11H18ZM14 11V7H12V11H14Z"/>
          </svg>
          <span slot="menuItemCaption">Отчеты</span>
        </app-menu-item>
        <app-menu-item @activeMenuItemChanged="onActiveMenuItemChange" :activeMenuItem="activeMenuItem" :submenuItemNames="submenus.personnel" :sidebarIsExtended="sidebarIsExtended">
          <svg class="sidebar__menu-item-svg" slot="menuItemSvg" width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 20C13 20.5523 13.4477 21 14 21C14.5523 21 15 20.5523 15 20H13ZM11.5 16V15V16ZM6.5 16V15V16ZM4 18.6667H3H4ZM3 20C3 20.5523 3.44772 21 4 21C4.55228 21 5 20.5523 5 20H3ZM8 5C8 5.55228 8.44772 6 9 6C9.55229 6 10 5.55228 10 5H8ZM10 1C10 0.447715 9.55229 0 9 0C8.44772 0 8 0.447715 8 1H10ZM15 20V18.6667H13V20H15ZM15 18.6667C15 17.7143 14.6459 16.789 13.9973 16.0971L12.5382 17.465C12.8273 17.7733 13 18.2046 13 18.6667H15ZM13.9973 16.0971C13.3466 15.4031 12.4498 15 11.5 15V17C11.8762 17 12.2512 17.1588 12.5382 17.465L13.9973 16.0971ZM11.5 15H6.5V17H11.5V15ZM6.5 15C5.55015 15 4.65335 15.4031 4.0027 16.0971L5.46177 17.465C5.74879 17.1588 6.12376 17 6.5 17V15ZM4.0027 16.0971C3.35409 16.789 3 17.7143 3 18.6667H5C5 18.2046 5.1727 17.7733 5.46177 17.465L4.0027 16.0971ZM3 18.6667V20H5V18.6667H3ZM10 11C10 11.5523 9.55228 12 9 12V14C10.6569 14 12 12.6569 12 11H10ZM9 12C8.44772 12 8 11.5523 8 11H6C6 12.6569 7.34315 14 9 14V12ZM8 11C8 10.4477 8.44772 10 9 10V8C7.34315 8 6 9.34315 6 11H8ZM9 10C9.55229 10 10 10.4477 10 11H12C12 9.34315 10.6569 8 9 8V10ZM2 18V6H0V18H2ZM4 4H14V2H4V4ZM16 6V18H18V6H16ZM14 20H4V22H14V20ZM16 18C16 19.1046 15.1046 20 14 20V22C16.2091 22 18 20.2091 18 18H16ZM14 4C15.1046 4 16 4.89543 16 6H18C18 3.79086 16.2091 2 14 2V4ZM2 6C2 4.89543 2.89543 4 4 4V2C1.79086 2 0 3.79086 0 6H2ZM0 18C0 20.2091 1.79086 22 4 22V20C2.89543 20 2 19.1046 2 18H0ZM10 5V1H8V5H10Z"/>
          </svg>
          <span slot="menuItemCaption">Кадры</span>
        </app-menu-item>
        <app-menu-item @activeMenuItemChanged="onActiveMenuItemChange" :activeMenuItem="activeMenuItem" :submenuItemNames="submenus.marketing" :sidebarIsExtended="sidebarIsExtended">
          <svg class="sidebar__menu-item-svg" slot="menuItemSvg" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5V6.00002L10.0062 5.99998L10 5ZM19.0315 1.03125L20.0315 1.03613C20.0335 0.632225 19.7923 0.266789 19.4201 0.109836C19.0479 -0.047117 18.6179 0.0352329 18.33 0.318574L19.0315 1.03125ZM19 17.0625L18.2984 17.7751C18.5857 18.0579 19.0145 18.1406 19.3863 17.9849C19.7581 17.8292 20 17.4655 20 17.0625L19 17.0625ZM9.00009 13V12C8.67169 12 8.36423 12.1612 8.1775 12.4314L9.00009 13ZM9 20L9.00391 21C9.36983 20.9986 9.70575 20.7974 9.87974 20.4755C10.0537 20.1535 10.038 19.7623 9.83869 19.4554L9 20ZM5 20.0156L4.15478 20.55C4.33879 20.8411 4.65959 21.017 5.00391 21.0156L5 20.0156ZM5 13L5.84842 13.5293C6.04152 13.2198 6.05075 12.8297 5.87252 12.5114C5.69428 12.1931 5.35685 11.9971 4.99206 12L5 13ZM3.03151 13.0156L3.02358 12.0157C2.996 12.0159 2.96844 12.0172 2.94098 12.0197L3.03151 13.0156ZM2.00026 12.0156H3.00026V12.0156L2.00026 12.0156ZM2.00018 6L3.00018 5.99999C3.00017 5.9483 2.99617 5.89669 2.98819 5.84562L2.00018 6ZM12 5C12 4.44772 11.5523 4 11 4C10.4477 4 10 4.44772 10 5H12ZM10 13.0625C10 13.6148 10.4477 14.0625 11 14.0625C11.5523 14.0625 12 13.6148 12 13.0625H10ZM19.4142 10.4142C19.0237 10.8047 19.0237 11.4379 19.4142 11.8284C19.8047 12.219 20.4379 12.219 20.8284 11.8284L19.4142 10.4142ZM20.8284 6.17157C20.4379 5.78105 19.8047 5.78105 19.4142 6.17157C19.0237 6.5621 19.0237 7.19526 19.4142 7.58579L20.8284 6.17157ZM3.00018 6H10V4H3.00018V6ZM10 5C10.0062 5.99998 10.0066 5.99998 10.007 5.99998C10.0072 5.99997 10.0076 5.99997 10.008 5.99997C10.0086 5.99996 10.0094 5.99996 10.0102 5.99995C10.0118 5.99993 10.0138 5.99991 10.016 5.99989C10.0205 5.99983 10.0262 5.99975 10.0331 5.99962C10.047 5.99936 10.0656 5.99893 10.0889 5.99819C10.1355 5.99673 10.2006 5.99407 10.2827 5.98924C10.4468 5.9796 10.6794 5.96126 10.9684 5.92639C11.5457 5.85674 12.352 5.72062 13.2892 5.45403C15.161 4.92162 17.5826 3.86055 19.733 1.74393L18.33 0.318574C16.4801 2.13945 14.386 3.06275 12.7421 3.53034C11.9214 3.76376 11.2199 3.88154 10.7288 3.94079C10.4837 3.97038 10.2919 3.98525 10.1653 3.99269C10.1021 3.99641 10.0551 3.99827 10.026 3.99918C10.0115 3.99964 10.0014 3.99986 9.99596 3.99996C9.99325 4.00001 9.99169 4.00003 9.99132 4.00004C9.99113 4.00004 9.99125 4.00004 9.99166 4.00004C9.99186 4.00003 9.99214 4.00003 9.9925 4.00003C9.99267 4.00003 9.993 4.00002 9.99309 4.00002C9.99343 4.00002 9.99379 4.00002 10 5ZM18.0315 1.02637C18.0001 7.4664 17.9998 10.9684 18 17.0625L20 17.0625C19.9998 10.9691 20.0001 7.4711 20.0315 1.03613L18.0315 1.02637ZM19.7016 16.3499C17.6607 14.3407 16.163 13.2087 14.6596 12.6132C13.1464 12.0139 11.7196 12 10 12V14C11.7554 14 12.813 14.033 13.9232 14.4727C15.0433 14.9163 16.3081 15.8156 18.2984 17.7751L19.7016 16.3499ZM10 12H9.00009V14H10V12ZM9.00009 13C8.1775 12.4314 8.17722 12.4318 8.17693 12.4322C8.17682 12.4323 8.17653 12.4328 8.17631 12.4331C8.17588 12.4337 8.17542 12.4344 8.17492 12.4351C8.17391 12.4366 8.17277 12.4383 8.17149 12.4401C8.16892 12.4439 8.16579 12.4485 8.16214 12.454C8.15484 12.4649 8.14542 12.4792 8.1341 12.4967C8.11148 12.5318 8.08123 12.5799 8.04515 12.6404C7.97307 12.7613 7.87721 12.9321 7.77223 13.1467C7.56308 13.5742 7.31292 14.1849 7.14565 14.9264C6.80834 16.4217 6.8093 18.4625 8.16131 20.5446L9.83869 19.4554C8.84695 17.9281 8.84795 16.4689 9.09663 15.3665C9.22235 14.8092 9.41166 14.3467 9.56874 14.0257C9.64687 13.866 9.71581 13.7437 9.76275 13.665C9.78619 13.6258 9.804 13.5976 9.81457 13.5812C9.81985 13.573 9.8233 13.5678 9.82473 13.5657C9.82544 13.5646 9.82564 13.5643 9.82531 13.5648C9.82514 13.565 9.82484 13.5655 9.82441 13.5661C9.82419 13.5664 9.82393 13.5668 9.82365 13.5672C9.8235 13.5674 9.82326 13.5678 9.82319 13.5679C9.82294 13.5683 9.82268 13.5686 9.00009 13ZM8.99609 19L4.99609 19.0156L5.00391 21.0156L9.00391 21L8.99609 19ZM5.84522 19.4812C4.92111 18.0197 4.91355 16.5505 5.1527 15.4056C5.27266 14.8313 5.45331 14.3498 5.6033 14.0139C5.67793 13.8467 5.74391 13.718 5.78911 13.6345C5.81167 13.5928 5.82893 13.5626 5.83936 13.5447C5.84457 13.5358 5.84807 13.53 5.84964 13.5274C5.85043 13.5261 5.85074 13.5256 5.85054 13.5259C5.85045 13.5261 5.85022 13.5264 5.84987 13.527C5.84969 13.5273 5.84948 13.5276 5.84924 13.528C5.84912 13.5282 5.84892 13.5285 5.84886 13.5286C5.84864 13.529 5.84842 13.5293 5 13C4.15158 12.4707 4.15134 12.4711 4.15109 12.4715C4.151 12.4716 4.15074 12.472 4.15055 12.4723C4.15018 12.4729 4.14977 12.4736 4.14933 12.4743C4.14844 12.4757 4.14742 12.4774 4.14628 12.4792C4.14398 12.483 4.14116 12.4876 4.13785 12.4931C4.13122 12.5041 4.12261 12.5185 4.11223 12.5363C4.09146 12.5718 4.06355 12.6209 4.03017 12.6826C3.96348 12.8058 3.87455 12.9802 3.77707 13.1985C3.58282 13.6336 3.35038 14.2526 3.19496 14.9967C2.88332 16.4886 2.87577 18.5272 4.15478 20.55L5.84522 19.4812ZM4.99206 12L3.02358 12.0157L3.03945 14.0156L5.00794 14L4.99206 12ZM2.94098 12.0197C2.94922 12.019 2.95048 12.0194 2.94626 12.0192C2.9424 12.019 2.93752 12.0184 2.93286 12.0174C2.92826 12.0164 2.92668 12.0156 2.92811 12.0162C2.92968 12.0169 2.9359 12.0195 2.94516 12.0257C2.95476 12.0322 2.96655 12.0418 2.97829 12.0548C2.9903 12.0681 2.99891 12.0813 3.00429 12.0919C3.00958 12.1023 3.009 12.1047 3.00684 12.095C3.00457 12.0847 3.00026 12.0595 3.00026 12.0156H1.00026C1.00026 12.7575 1.31491 13.3395 1.8288 13.6852C2.28048 13.989 2.78352 14.0423 3.12205 14.0115L2.94098 12.0197ZM3.00026 12.0156L3.00018 5.99999L1.00018 6.00002L1.00026 12.0156L3.00026 12.0156ZM2.98819 5.84562C2.99147 5.86663 2.98991 5.87263 2.98955 5.87465C2.98881 5.87892 2.98416 5.90262 2.96214 5.93518C2.95075 5.95202 2.93632 5.9687 2.91946 5.98335C2.90244 5.99814 2.88758 6.00683 2.8788 6.01104C2.86035 6.01989 2.88862 6 3.00018 6V4C2.26977 4 1.66552 4.28229 1.3054 4.81482C0.987124 5.28547 0.958208 5.80907 1.01216 6.15438L2.98819 5.84562ZM10 5V13.0625H12V5H10ZM20.8284 11.8284C21.1999 11.457 21.4945 11.016 21.6955 10.5307L19.8478 9.76537C19.7472 10.008 19.5999 10.2285 19.4142 10.4142L20.8284 11.8284ZM21.6955 10.5307C21.8965 10.0454 22 9.52529 22 9H20C20 9.26264 19.9483 9.52272 19.8478 9.76537L21.6955 10.5307ZM22 9C22 8.47471 21.8965 7.95457 21.6955 7.46927L19.8478 8.23463C19.9483 8.47728 20 8.73736 20 9H22ZM21.6955 7.46927C21.4945 6.98396 21.1999 6.54301 20.8284 6.17157L19.4142 7.58579C19.5999 7.7715 19.7472 7.99198 19.8478 8.23463L21.6955 7.46927Z"/>
          </svg>
          <span slot="menuItemCaption">Маркетинг</span>
        </app-menu-item>
        <app-menu-item @activeMenuItemChanged="onActiveMenuItemChange" :activeMenuItem="activeMenuItem" :submenuItemNames="submenus.bookmarks" :sidebarIsExtended="sidebarIsExtended">
          <svg class="sidebar__menu-item-svg sidebar__menu-item-svg--bookmarks" slot="menuItemSvg" width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 20L9 15.4444L1 20V3.22222C1 2.63285 1.24082 2.06762 1.66947 1.65087C2.09812 1.23413 2.67951 1 3.28571 1H14.7143C15.3205 1 15.9019 1.23413 16.3305 1.65087C16.7592 2.06762 17 2.63285 17 3.22222V20Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 4.4375L10.236 6.9415L13 7.3455L11 9.2935L11.472 12.0455L9 10.7455L6.528 12.0455L7 9.2935L5 7.3455L7.764 6.9415L9 4.4375Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span slot="menuItemCaption">Закладки</span>
        </app-menu-item>
      </ul>
    </transition>
    <ul class="sidebar__menu sidebar__menu--additional">
      <app-menu-item @activeMenuItemChanged="onActiveMenuItemChange" :activeMenuItem="activeMenuItem" @closingMenuItemSelected="onClosingMenuItemSelect" menuItemName = "settings" :submenuItemNames="submenus.settings" :sidebarIsExtended="sidebarIsExtended">
        <svg class="sidebar__menu-item-svg" slot="menuItemSvg" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 13.7273C12.5062 13.7273 13.7273 12.5062 13.7273 11C13.7273 9.49377 12.5062 8.27273 11 8.27273C9.49377 8.27273 8.27273 9.49377 8.27273 11C8.27273 12.5062 9.49377 13.7273 11 13.7273Z" stroke="#8E9CBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17.7273 13.7273C17.6063 14.0015 17.5702 14.3056 17.6236 14.6005C17.6771 14.8954 17.8177 15.1676 18.0273 15.3818L18.0818 15.4364C18.2509 15.6052 18.385 15.8057 18.4765 16.0265C18.568 16.2472 18.6151 16.4838 18.6151 16.7227C18.6151 16.9617 18.568 17.1983 18.4765 17.419C18.385 17.6397 18.2509 17.8402 18.0818 18.0091C17.913 18.1781 17.7124 18.3122 17.4917 18.4037C17.271 18.4952 17.0344 18.5423 16.7955 18.5423C16.5565 18.5423 16.3199 18.4952 16.0992 18.4037C15.8785 18.3122 15.678 18.1781 15.5091 18.0091L15.4545 17.9545C15.2403 17.745 14.9682 17.6044 14.6733 17.5509C14.3784 17.4974 14.0742 17.5335 13.8 17.6545C13.5311 17.7698 13.3018 17.9611 13.1403 18.205C12.9788 18.4489 12.8921 18.7347 12.8909 19.0273V19.1818C12.8909 19.664 12.6994 20.1265 12.3584 20.4675C12.0174 20.8084 11.5549 21 11.0727 21C10.5905 21 10.1281 20.8084 9.78708 20.4675C9.4461 20.1265 9.25455 19.664 9.25455 19.1818V19.1C9.24751 18.7991 9.15011 18.5073 8.97501 18.2625C8.79991 18.0176 8.55521 17.8312 8.27273 17.7273C7.99853 17.6063 7.69437 17.5702 7.39947 17.6236C7.10456 17.6771 6.83244 17.8177 6.61818 18.0273L6.56364 18.0818C6.39478 18.2509 6.19425 18.385 5.97353 18.4765C5.7528 18.568 5.51621 18.6151 5.27727 18.6151C5.03834 18.6151 4.80174 18.568 4.58102 18.4765C4.36029 18.385 4.15977 18.2509 3.99091 18.0818C3.82186 17.913 3.68775 17.7124 3.59626 17.4917C3.50476 17.271 3.45766 17.0344 3.45766 16.7955C3.45766 16.5565 3.50476 16.3199 3.59626 16.0992C3.68775 15.8785 3.82186 15.678 3.99091 15.5091L4.04545 15.4545C4.25503 15.2403 4.39562 14.9682 4.4491 14.6733C4.50257 14.3784 4.46647 14.0742 4.34545 13.8C4.23022 13.5311 4.03887 13.3018 3.79497 13.1403C3.55107 12.9788 3.26526 12.8921 2.97273 12.8909H2.81818C2.33597 12.8909 1.87351 12.6994 1.53253 12.3584C1.19156 12.0174 1 11.5549 1 11.0727C1 10.5905 1.19156 10.1281 1.53253 9.78708C1.87351 9.4461 2.33597 9.25455 2.81818 9.25455H2.9C3.2009 9.24751 3.49273 9.15011 3.73754 8.97501C3.98236 8.79991 4.16883 8.55521 4.27273 8.27273C4.39374 7.99853 4.42984 7.69437 4.37637 7.39947C4.3229 7.10456 4.18231 6.83244 3.97273 6.61818L3.91818 6.56364C3.74913 6.39478 3.61503 6.19425 3.52353 5.97353C3.43203 5.7528 3.38493 5.51621 3.38493 5.27727C3.38493 5.03834 3.43203 4.80174 3.52353 4.58102C3.61503 4.36029 3.74913 4.15977 3.91818 3.99091C4.08704 3.82186 4.28757 3.68775 4.50829 3.59626C4.72901 3.50476 4.96561 3.45766 5.20455 3.45766C5.44348 3.45766 5.68008 3.50476 5.9008 3.59626C6.12152 3.68775 6.32205 3.82186 6.49091 3.99091L6.54545 4.04545C6.75971 4.25503 7.03183 4.39562 7.32674 4.4491C7.62164 4.50257 7.9258 4.46647 8.2 4.34545H8.27273C8.54161 4.23022 8.77093 4.03887 8.93245 3.79497C9.09397 3.55107 9.18065 3.26526 9.18182 2.97273V2.81818C9.18182 2.33597 9.37338 1.87351 9.71435 1.53253C10.0553 1.19156 10.5178 1 11 1C11.4822 1 11.9447 1.19156 12.2856 1.53253C12.6266 1.87351 12.8182 2.33597 12.8182 2.81818V2.9C12.8193 3.19253 12.906 3.47834 13.0676 3.72224C13.2291 3.96614 13.4584 4.15749 13.7273 4.27273C14.0015 4.39374 14.3056 4.42984 14.6005 4.37637C14.8954 4.3229 15.1676 4.18231 15.3818 3.97273L15.4364 3.91818C15.6052 3.74913 15.8057 3.61503 16.0265 3.52353C16.2472 3.43203 16.4838 3.38493 16.7227 3.38493C16.9617 3.38493 17.1983 3.43203 17.419 3.52353C17.6397 3.61503 17.8402 3.74913 18.0091 3.91818C18.1781 4.08704 18.3122 4.28757 18.4037 4.50829C18.4952 4.72901 18.5423 4.96561 18.5423 5.20455C18.5423 5.44348 18.4952 5.68008 18.4037 5.9008C18.3122 6.12152 18.1781 6.32205 18.0091 6.49091L17.9545 6.54545C17.745 6.75971 17.6044 7.03183 17.5509 7.32674C17.4974 7.62164 17.5335 7.9258 17.6545 8.2V8.27273C17.7698 8.54161 17.9611 8.77093 18.205 8.93245C18.4489 9.09397 18.7347 9.18065 19.0273 9.18182H19.1818C19.664 9.18182 20.1265 9.37338 20.4675 9.71435C20.8084 10.0553 21 10.5178 21 11C21 11.4822 20.8084 11.9447 20.4675 12.2856C20.1265 12.6266 19.664 12.8182 19.1818 12.8182H19.1C18.8075 12.8193 18.5217 12.906 18.2778 13.0676C18.0339 13.2291 17.8425 13.4584 17.7273 13.7273Z" stroke="#8E9CBB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </app-menu-item>
      <app-menu-item @activeMenuItemChanged="onActiveMenuItemChange" :activeMenuItem="activeMenuItem" @closingMenuItemSelected="onClosingMenuItemSelect" menuItemName = "support" :submenuItemNames="submenus.support" :sidebarIsExtended="sidebarIsExtended">
        <svg class="sidebar__menu-item-svg" slot="menuItemSvg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM13.446 7.968C13.1017 7.38474 12.6153 6.89826 12.032 6.554L15.657 2.929L17.071 4.343L13.446 7.968ZM7.968 13.446L4.343 17.071L2.929 15.657L6.554 12.032C6.89826 12.6153 7.38474 13.1017 7.968 13.446ZM7.968 6.554C7.38474 6.89826 6.89826 7.38474 6.554 7.968L2.929 4.343L4.343 2.93L7.968 6.555V6.554ZM12.704 12.948C11.9332 13.655 10.9162 14.032 9.87079 13.9981C8.82541 13.9643 7.83488 13.5223 7.11142 12.767C6.38797 12.0116 5.98916 11.0029 6.00044 9.95706C6.01172 8.9112 6.4322 7.91136 7.17178 7.17178C7.91136 6.4322 8.9112 6.01172 9.95706 6.00044C11.0029 5.98916 12.0116 6.38797 12.767 7.11142C13.5223 7.83488 13.9643 8.82541 13.9981 9.87079C14.032 10.9162 13.655 11.9332 12.948 12.704C13.141 12.494 13.307 12.269 13.446 12.032L16.32 14.906C15.9093 15.4343 15.4343 15.9093 14.906 16.32L12.032 13.446C12.269 13.306 12.494 13.141 12.704 12.948ZM10 12C10.5304 12 11.0391 11.7893 11.4142 11.4142C11.7893 11.0391 12 10.5304 12 10C12 9.46957 11.7893 8.96086 11.4142 8.58579C11.0391 8.21071 10.5304 8 10 8C9.46957 8 8.96086 8.21071 8.58579 8.58579C8.21071 8.96086 8 9.46957 8 10C8 10.5304 8.21071 11.0391 8.58579 11.4142C8.96086 11.7893 9.46957 12 10 12Z" fill="#8E9CBB"/>
        </svg>
      </app-menu-item>
    </ul>

    <button type="button" class="sidebar__extender" @click="sidebarIsExtended = !sidebarIsExtended">
      <svg class="sidebar__extender-svg" :style="{'transform': sidebarIsExtended ? 'scale(-1, 1)' : 'none'}" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="17" cy="17" r="16.5" stroke="#8E9CBB"/>
        <path d="M20.709 17.6904C20.3211 18.0781 19.6921 18.0781 19.3042 17.6904L14.3065 12.695C13.9185 12.3072 13.9185 11.6786 14.3065 11.2908C14.6944 10.9031 15.3234 10.9031 15.7113 11.2908L20.709 16.2862C21.097 16.6739 21.097 17.3026 20.709 17.6904Z" fill="#8E9CBB"/>
        <path d="M20.709 16.2941C20.3211 15.9064 19.6921 15.9064 19.3042 16.2941L14.291 21.305C13.903 21.6928 13.903 22.3214 14.291 22.7092C14.6789 23.0969 15.3079 23.0969 15.6958 22.7092L20.709 17.6983C21.097 17.3105 21.097 16.6819 20.709 16.2941Z" fill="#8E9CBB"/>
      </svg>
    </button>
  </div>
</template>

<script>
  export default {
    created () {
      window.addEventListener('resize', this.updateDisplayWidth);
    },
    data () {
      return {
        displayWidth: window.innerWidth,
        userIsAuthorized: true,
        currentUserData: {
          firstName: 'Анастасия',
          lastName: 'Константинопольская',
          pathToAvatar: './icon-avatar.png'
        },
        activeMenuItem: null,
        sidebarIsOpen: false,
        sidebarIsExtended: false,
        submenus: {
          userInfo: [
            'Профиль',
            'Жалобы и предложения',
            'Инструкции',
            'Календарь событий'
          ],
          notifications: [
            'Уведомление №1',
            'Уведомление №2',
            'Уведомление №3',
            'Уведомление №4',
            'Уведомление №5',
            'Уведомление №6',
            'Уведомление №7',
            'Уведомление №8',
            'Уведомление №9',
            'Уведомление №10',
            'Уведомление №11',
            'Уведомление №12',
            'Уведомление №13',
            'Уведомление №14',
            'Уведомление №15',
            'Уведомление №16'
          ],
          calculations: [
            'Пункт №1 подменю "Расчеты"',
            'Пункт №2 подменю "Расчеты"',
            'Пункт №3 подменю "Расчеты"',
            'Пункт №4 подменю "Расчеты"',
            'Пункт №5 подменю "Расчеты"',
            'Пункт №6 подменю "Расчеты"',
            'Пункт №7 подменю "Расчеты"',
            'Пункт №8 подменю "Расчеты"',
            'Пункт №9 подменю "Расчеты"',
            'Пункт №10 подменю "Расчеты"',
            'Пункт №11 подменю "Расчеты"',
            'Пункт №12 подменю "Расчеты"',
            'Пункт №13 подменю "Расчеты"',
            'Пункт №14 подменю "Расчеты"',
            'Пункт №15 подменю "Расчеты"',
            'Пункт №16 подменю "Расчеты"',
            'Пункт №17 подменю "Расчеты"',
            'Пункт №18 подменю "Расчеты"',
            'Пункт №19 подменю "Расчеты"',
            'Пункт №20 подменю "Расчеты"',
            'Пункт №21 подменю "Расчеты"',
            'Пункт №22 подменю "Расчеты"',
            'Пункт №23 подменю "Расчеты"',
            'Пункт №24 подменю "Расчеты"',
            'Пункт №25 подменю "Расчеты"',
            'Пункт №26 подменю "Расчеты"',
            'Пункт №27 подменю "Расчеты"',
            'Пункт №28 подменю "Расчеты"',
            'Пункт №29 подменю "Расчеты"',
            'Пункт №30 подменю "Расчеты"',
            'Пункт №31 подменю "Расчеты"'
          ],
          reports: [
            'Пункт №1 подменю "Отчеты"',
            'Пункт №2 подменю "Отчеты"',
            'Пункт №3 подменю "Отчеты"',
            'Пункт №4 подменю "Отчеты"',
            'Пункт №5 подменю "Отчеты"',
            'Пункт №6 подменю "Отчеты"',
            'Пункт №7 подменю "Отчеты"',
            'Пункт №8 подменю "Отчеты"',
            'Пункт №9 подменю "Отчеты"',
            'Пункт №10 подменю "Отчеты"',
            'Пункт №11 подменю "Отчеты"',
            'Пункт №12 подменю "Отчеты"',
            'Пункт №13 подменю "Отчеты"',
            'Пункт №14 подменю "Отчеты"',
            'Пункт №15 подменю "Отчеты"'
          ],
          personnel: [
            'Сотрудники',
            'Штатная численность',
            'Потребность в персонале',
            'Кандидаты',
            'Жалобы и предложения',
            'Приказы/Инструкции',
            'Анкеты водителей',
            'Печать договоров',
            'Управление уведомлениями',
            'Время работы офисных сотрудников',
            'Депозиты',
            'Рекомендации по смене разрядов',
            'KPI и отзывы водителей',
            'Водители, не добравшиеся до минималки',
            'Мероприятия',
            'Должности и разряды',
            'Рабочие графики',
            'Причины отказа кандидату',
            'Причины для увольнения',
            'Анкеты',
            'Форма сотрудников',
            'Документы',
            'Правовые статусы',
            'Типы инструкций',
            'Статусы кандидатов и сотрудников',
            'Типы мероприятий',
            'Расходы по кандидатам',
            'Договоры',
            'Нарушения',
            'Сводный по нарушениям'
          ],
          marketing: [
            'Пункт №1 подменю "Отчеты"',
            'Пункт №2 подменю "Отчеты"',
            'Пункт №3 подменю "Отчеты"',
            'Пункт №4 подменю "Отчеты"',
            'Пункт №5 подменю "Отчеты"',
            'Пункт №6 подменю "Отчеты"',
            'Пункт №7 подменю "Отчеты"',
            'Пункт №8 подменю "Отчеты"',
            'Пункт №9 подменю "Отчеты"',
            'Пункт №10 подменю "Отчеты"',
            'Пункт №11 подменю "Отчеты"',
            'Пункт №12 подменю "Отчеты"',
            'Пункт №13 подменю "Отчеты"',
            'Пункт №14 подменю "Отчеты"',
            'Пункт №15 подменю "Отчеты"'
          ],
          marketing: [
            'Пункт №1 подменю "Маркетинг"',
            'Пункт №2 подменю "Маркетинг"',
            'Пункт №3 подменю "Маркетинг"',
            'Пункт №4 подменю "Маркетинг"',
            'Пункт №5 подменю "Маркетинг"',
            'Пункт №6 подменю "Маркетинг"',
            'Пункт №7 подменю "Маркетинг"',
            'Пункт №8 подменю "Маркетинг"',
            'Пункт №9 подменю "Маркетинг"',
            'Пункт №10 подменю "Маркетинг"',
            'Пункт №11 подменю "Маркетинг"',
            'Пункт №12 подменю "Маркетинг"',
            'Пункт №13 подменю "Маркетинг"',
            'Пункт №14 подменю "Маркетинг"',
            'Пункт №15 подменю "Маркетинг"',
            'Пункт №16 подменю "Маркетинг"',
            'Пункт №17 подменю "Маркетинг"',
            'Пункт №18 подменю "Маркетинг"',
            'Пункт №19 подменю "Маркетинг"',
            'Пункт №20 подменю "Маркетинг"',
            'Пункт №21 подменю "Маркетинг"',
            'Пункт №22 подменю "Маркетинг"',
            'Пункт №23 подменю "Маркетинг"',
            'Пункт №24 подменю "Маркетинг"',
            'Пункт №25 подменю "Маркетинг"',
            'Пункт №26 подменю "Маркетинг"',
            'Пункт №27 подменю "Маркетинг"'
          ],
          bookmarks: [
            'Пункт №1 подменю "Закладки"',
            'Пункт №2 подменю "Закладки"',
            'Пункт №3 подменю "Закладки"',
            'Пункт №4 подменю "Закладки"',
            'Пункт №5 подменю "Закладки"',
            'Пункт №6 подменю "Закладки"',
            'Пункт №7 подменю "Закладки"',
            'Пункт №8 подменю "Закладки"',
            'Пункт №9 подменю "Закладки"',
            'Пункт №10 подменю "Закладки"',
            'Пункт №11 подменю "Закладки"',
            'Пункт №12 подменю "Закладки"',
            'Пункт №13 подменю "Закладки"',
            'Пункт №14 подменю "Закладки"'
          ],
          settings: [
            'Пункт №1 подменю "Настройки"',
            'Пункт №2 подменю "Настройки"',
            'Пункт №3 подменю "Настройки"',
            'Пункт №4 подменю "Настройки"',
            'Пункт №5 подменю "Настройки"',
            'Пункт №6 подменю "Настройки"',
            'Пункт №7 подменю "Настройки"',
            'Пункт №8 подменю "Настройки"',
            'Пункт №9 подменю "Настройки"',
            'Пункт №10 подменю "Настройки"'
          ],
          support: [
            'Пункт №1 подменю "Техподдежжка"',
            'Пункт №2 подменю "Техподдежжка"',
            'Пункт №3 подменю "Техподдежжка"',
            'Пункт №4 подменю "Техподдежжка"',
            'Пункт №5 подменю "Техподдежжка"',
            'Пункт №6 подменю "Техподдежжка"',
            'Пункт №7 подменю "Техподдежжка"'
          ],
        }
      }
    },
    computed: {
      notificationCount () {
        return this.submenus.notifications.length;
      }
    },
    methods: {
      onActiveMenuItemChange ($event) {
        if ($event !== null) {
          if ($event.parentNode !== null) {
            if ($event.parentNode.parentNode.classList.contains('sidebar__menu--main')) {
              if (this.activeMenuItem === $event && this.displayWidth >= 768) {
                this.sidebarIsOpen = !this.sidebarIsOpen;
              }
              if (this.activeMenuItem !== $event) {
                this.sidebarIsOpen = true;
              }
            }
          }
        }
        this.activeMenuItem = this.activeMenuItem !== $event ? $event : null;
      },
      onClosingMenuItemSelect () {
        this.sidebarIsOpen = false;
      },
      onToggleClick ($event) {
        if (!this.sidebarIsOpen) {
          const submenus = Array.from(document.querySelectorAll('.submenu'));
          for (let submenu of submenus) {
            submenu.style.display = 'none';
          }
        }
        this.sidebarIsOpen = !this.sidebarIsOpen;
        this.activeMenuItem = null;
      },
      updateDisplayWidth(evt) {
        if (window.innerWidth < 768 && this.displayWidth >= 768 && !this.sidebarIsOpen) {
          const mainMenu = document.querySelector('.sidebar__menu--main');
          if (mainMenu !== null) {
            mainMenu.style.display = 'none';
          }
        }
        if (window.innerWidth < 768 && this.displayWidth >= 768) {
          const submenu = document.querySelector('.submenu');
          if (submenu !== null) {
            submenu.style.transition = 'none';
          }
        }
        if (this.displayWidth < 768 && window.innerWidth >= 768 && this.activeMenuItem === null) {
          this.sidebarIsOpen = false;
        }
        this.displayWidth = window.innerWidth;
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
    position: fixed;

    display: flex;
    justify-content: stretch;
    align-items: flex-start;

    @media (max-width: $max-tablt-width) {
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      height: 50px;
    }

    @media (max-width: $max-mobl-width) {
      padding-left: 20px;
      padding-right: 20px;
    }

    @media (min-width: $tablt-width) and (max-width: $max-tablt-width) {
      padding-left: 30px;
      padding-right: 30px;
    }

    @media (min-width: $deskt-width) {
      flex-direction: column;
      width: 60px;
      height: 100%;
    }

    text-align: left;
    color: #8E9CBB;

    background-color: #333333;
    transition: width 1s;

    @media (max-width: $max-mobl-width) {
      &__menu--user {
        .sidebar__menu-item-caption {
          display: none;
        }
      }
    }

    @media (min-width: $tablt-width) and (max-width: $max-tablt-width) {
      .sidebar__menu-item-caption {
        display: none;
      }
    }

    @media (min-width: $deskt-width) {
      .sidebar__menu-item-caption {
        width: 0;
      }
    }

    @media (max-width: $max-mobl-width) {
      &--open {
        position: relative;

        .sidebar__burger-svg {
          display: none;
        }

        .sidebar__cross-svg {
          display: block;
        }

        .sidebar__menu--main {
          @media (max-width: $max-mobl-width) {
            display: flex;
            transition: height 1s;
            height: auto;
          }
        }
      }
    }

    &--extended {
      @media (max-width: $max-mobl-width) {
        .sidebar__menu--user,
        .sidebar__menu--additional {
          .sidebar__menu-item-caption {
            display: none;
          }
        }
      }

      @media (min-width: $tablt-width) and (max-width: $max-tablt-width) {
        .sidebar__menu-item-caption {
          display: none;
        }
      }

      @media (min-width: $deskt-width) {
        width: 200px;

        .sidebar__menu-item-caption {
          width: 100%;
        }
      }
    }

    &__toggle {
      outline: none;

      @media (max-width: $max-mobl-width) {
        display: flex;
        padding-left: 0;
        padding-right: 0;
        margin-right: 27px;

        background-color: rgba(#FFFFFF, 0);
        border: none;
      }

      @media (min-width: $tablt-width) {
        display: none;
      }
    }

    &__cross-svg {
      display: none;
    }

    &__menu {
      display: flex;

      @media (max-width: $max-mobl-width) {
        justify-content: stretch;
      }

      @media (max-width: $max-tablt-width) {
        flex-direction: row;
        flex-wrap: wrap;
      }

      @media (min-width: $deskt-width) {
        flex-direction: column;
        padding-left: 20px;
        padding-right: 20px;
      }

      &--user {
        @media (max-width: $max-mobl-width) {
          flex-grow: 1;
          justify-content: flex-end;
        }

        @media (max-width: $max-tablt-width) {
          padding-top: 0;
          padding-bottom: 0;
          margin-bottom: 0;
          margin-right: -23px;
        }

        @media (min-width: $deskt-width) {
          padding-top: 12px;
          padding-bottom: 15px;
          margin-bottom: -18px;
        }

        .sidebar__menu-item {
          @media (max-width: $max-tablt-width) {
            margin-bottom: 0;
            margin-right: 23px;
          }

          @media (min-width: $deskt-width) {
            margin-bottom: 18px;
          }
        }

        .sidebar__menu-item:first-child {
          @media (max-width: $max-tablt-width) {
            order: 1;
          }
        }

        @media (max-width: $max-tablt-width) {
          order: 2;
        }
      }

      &--main {
        flex-grow: 1;

        @media (max-width: $max-mobl-width) {
          position: absolute;
          top: 100%;
          left: 0;

          flex-direction: column;
          width: 100%;
        }

        @media (max-width: $max-tablt-width) {
          padding-top: 0;
        }

        @media (min-width: $deskt-width) {
          padding-top: 24px;
        }

        font-weight: 700;
        text-transform: uppercase;

        @media (max-width: $max-mobl-width) {
          font-size: 14px;
          letter-spacing: normal;
        }

        @media (min-width: $deskt-width) {
          font-size: 11px;
          letter-spacing: 1px;
        }

        .sidebar__menu-item {
          @media (max-width: $max-mobl-width) {
            padding-left: 20px;
            padding-right: 20px;
          }

          @media (min-width: $tablt-width) and (max-width: $max-tablt-width) {
            margin-bottom: 0;
            margin-right: 29px;
          }

          @media (min-width: $deskt-width) {
            margin-bottom: 26px;
          }
        }
      }

      &--additional {
        @media (max-width: $max-mobl-width) {
          flex-grow: 1;
        }

        @media (max-width: $max-tablt-width) {
          margin-bottom: 0;
        }

        @media (min-width: $deskt-width) {
          margin-bottom: 8px;
        }

       .sidebar__menu-item {
          @media (max-width: $max-tablt-width) {
            margin-bottom: 0;
            margin-right: 25px;
          }

          @media (min-width: $deskt-width) {
            margin-bottom: 27px;
          }
        }

        .sidebar__menu-item:first-child {
          margin-left: -2px;
        }
      }
    }

    &__notification {
      &-svg-box {
        position: relative;

        display: flex;
      }

      &-count-box {
        position: absolute;
        top: -5px;
        left: 9px;

        min-width: 16px;
        height: 16px;
        padding-top: 3px;
        padding-bottom: 6px;
        padding-left: 4px;
        padding-right: 5px;

        background: #FF238D;
        border-radius: 10px;

        font-weight: 700;
        font-size: 12px;
        line-height: 100%;

        color: #000000;
      }
    }


    &__menu-separator {
      @media (max-width: $max-tablt-width) {
        display: none;
      }

      @media (min-width: $deskt-width) {
        width: 100%;
        height: 1px;
        margin: 0;
        background-color: #45484E;
        border: none;
      }
    }

    &__extender {
      padding: 0;
      margin-bottom: 14px;
      margin-left: 13px;

      background-color: rgba(#FFFFFF, 0);
      border: none;
      outline: none;

      @media (max-width: $max-tablt-width) {
        display: none;
      }

      @media (min-width: $deskt-width) {
        display: flex;
      }

      &-svg {
        transition: transform 1s;
      }
    }
  }

  .appear-animation-enter-active {
    animation: 1s appear-animation;
  }

  .appear-animation-leave-active {
    animation: 1.5s disappear-animation;
  }

  .appear-stretch-animation-enter {
    height: 0 !important;
  }

  .appear-stretch-animation-enter-active {
    animation: 1s appear-animation;
    transition: height 1s;
  }

  .appear-stretch-animation-leave-active {
    animation: 1s disappear-animation;
    transition: height 1s;
  }

  .appear-stretch-animation-leave-to {
    height: 0 !important;
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
