<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">A&E Messenger</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      bordered
      content-class="bg-primary"
      :breakpoint="767"
    >
      <q-list dark>
        <q-item-label header>Menu</q-item-label>
        <!-- Link 1 -->
        <q-item clickable to="/home" exact class="text-grey-4">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Link 2 -->
        <q-item clickable to="/settings" exact>
          <q-item-section avatar>
            <q-icon name="settings_applications" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Settings</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Link 3 -->
        <q-item clickable exact>
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title>
          <q-tabs>
            <q-route-tab
              name="dashboard"
              icon="home"
              label="Dashboard"
              to="/home"
            />
            <q-route-tab
              name="settings"
              icon="settings_applications"
              label="Setings"
              to="/settings"
            />

            <q-route-tab
              name="logout"
              icon="exit_to_app"
              label="Logout"
              to="/"
            />
          </q-tabs>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",

  data() {
    return {};
  }
};
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}

.q-drawer {
  .q-router-link--exact-active {
    color: white !important;
  }
}
</style>
