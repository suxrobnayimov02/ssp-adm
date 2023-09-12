<template>
   <div class="navbar-container d-flex content align-items-center">
      <b-row class="justify-content-center" align-h="between">
         <!-- Nav Menu Toggler -->
         <ul class="nav navbar-nav d-xl-none">
            <li class="nav-item">
               <b-link class="nav-link" @click="toggleVerticalMenuActive">
                  <feather-icon icon="MenuIcon" size="21" />
               </b-link>
            </li>
         </ul>
         <b-col lg="9">
            <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
               <!-- Bookmarks Container -->
               <!-- <bookmarks /> -->
               <div>
                  <p
                     class="m-0 p-0"
                     style="font-size:16px;font-weight : 600"
                  >{{ $t('Organization') }} : {{ orginfo }} {{ orginn? `(${orginn})` : "" }}</p>
                  <!-- <br /> -->
                  <p
                     class="m-0 p-0"
                     style="font-size:12px;"
                  >{{ $t('username') }} : {{ username }} - {{roles }}</p>
               </div>
            </div>
         </b-col>
         <b-col lg="3" class="d-flex">
            <b-navbar-nav class="nav align-items-center ml-auto">
               <locale />
               <dark-Toggler class="d-none d-lg-block" />
               <search-bar />
               <!-- <cart-dropdown /> -->
               <!-- <notification-dropdown /> -->
               <user-dropdown />
            </b-navbar-nav>
         </b-col>
      </b-row>

      <!-- Left Col -->
   </div>
</template>

<script>
import { BLink, BNavbarNav, BRow, BCol } from 'bootstrap-vue';
import Bookmarks from './components/Bookmarks.vue';
import Locale from './components/Locale.vue';
import SearchBar from './components/SearchBar.vue';
import DarkToggler from './components/DarkToggler.vue';
import CartDropdown from './components/CartDropdown.vue';
import NotificationDropdown from './components/NotificationDropdown.vue';
import UserDropdown from './components/UserDropdown.vue';

export default {
   components: {
      BLink,

      // Navbar Components
      BNavbarNav,
      Bookmarks,
      Locale,
      SearchBar,
      DarkToggler,
      CartDropdown,
      NotificationDropdown,
      UserDropdown,
      BRow,
      BCol
   },
   computed: {
      orginfo() {
         return localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).organization : '';
      },
      orginn() {
         return localStorage.getItem('user_') ? JSON.parse(localStorage.getItem('user_info')).inn : '';
      },
      username() {
         return localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).userName : '';
      },
      roles() {
         return localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')).roles : '';
      }
   },
   props: {
      toggleVerticalMenuActive: {
         type: Function,
         default: () => {}
      }
   }
};
</script>
